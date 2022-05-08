import Teacher from "@models/TeacherEntity";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import jwt from "jsonwebtoken";
import Student from "@models/StudentEntity";

interface JWTPayload {
  uuid: string;
  iat: Date;
  exp: Date;
}

class UserController {
  findOne = async (req: Request, res: Response) => {
    const { token } = req.query;
    if (token) {
      const { uuid } = jwt.decode(token as string) as unknown as JWTPayload;

      const teacherRepository = getRepository(Teacher);
      const teacher = await teacherRepository.findOne({ where: { uuid } });

      // const studentRepository = getRepository(Student);
      // const student = await studentRepository.findOne({ where: {} });

      if (teacher) {
        res.status(200).send({
          data: {
            name: teacher.name,
            email: teacher.email,
            role: "Teacher",
          },
        });
      }
    } else {
      res.status(400).send({ data: { message: "Token not provided!" } });
    }
  };
}

export default UserController;
