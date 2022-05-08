import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Teacher from "@models/TeacherEntity";
import Student from "@models/StudentEntity";
import { getRepository } from "typeorm";

class AuthController {
  authenticate = async (req: Request, res: Response) => {
    const teacherRepository = getRepository(Teacher);
    // const studentRepository = getRepository(Student);

    const { email, password } = req.body;

    const teacher = await teacherRepository.findOne({
      where: { email },
    });

    // const student = await studentRepository.findOne({
    //   where: { email },
    // });

    // if (teacher) {
    //   if (await bcrypt.compare(password, student.password)) {
    //     const token = jwt.sign(
    //       { id: teacher.id },
    //       process.env.JWT_TOKEN as string,
    //       {
    //         expiresIn: "1d",
    //       }
    //     );

    //     return res.status(200).json({
    //       name: teacher.name,
    //       email: teacher.email,
    //       role: "Teacher",
    //       token,
    //     });
    //   }

    if (teacher) {
      if (await bcrypt.compare(password, teacher.password)) {
        const token = jwt.sign(
          { uuid: teacher.uuid },
          process.env.JWT_TOKEN as string,
          {
            expiresIn: "1h",
          }
        );

        return res.status(200).json({
          data: {
            name: teacher.name,
            email: teacher.email,
            role: "Teacher",
            token,
          },
        });
      }

      return res.status(401).json({
        data: { message: "Wrong Email or Password!" },
      });
    }

    return res.status(401).json({
      message: "Wrong Email or Password!",
    });
  };
}

export default AuthController;
