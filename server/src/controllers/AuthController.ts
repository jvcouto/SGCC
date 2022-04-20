import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Teacher from "@models/TeacherEntity";
import Student from "@models/StudentEntity";
import { getRepository } from "typeorm";

class AuthController {
  authenticate = async (req: Request, res: Response) => {
    const teacherRepository = getRepository(Teacher);
    const studentRepository = getRepository(Student);

    const { email, password } = req.body;

    const teacher = await teacherRepository.findOne({
      where: { email },
    });

    if (teacher) {
      if (!(await bcrypt.compare(password, teacher.password))) {
        return res.status(401).json({
          message: "Wrong Email or Password!",
        });
      }

      const token = jwt.sign(
        { id: teacher.id },
        process.env.JWT_TOKEN as string,
        {
          expiresIn: "1d",
        }
      );
    }
  };
}

export default AuthController;
