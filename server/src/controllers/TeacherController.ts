import Teacher from "@models/TeacherEntity";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { getRepository } from "typeorm";

class TeacherController {
  register = async (req: Request, res: Response) => {
    const teacherRepository = getRepository(Teacher);

    const teacherData = new Teacher(req.body);

    const existingTeacher = await teacherRepository.findOne({
      where: { email: teacherData.email },
    });

    if (existingTeacher) {
      return res.status(409).json({
        data: {
          message: "Error: Duplicated Entry!",
        },
      });
    }

    if (teacherData.password) {
      teacherData.password = bcrypt.hashSync(teacherData.password, 10);
    }

    try {
      const newTeacher = await teacherRepository.save(teacherData);
      return res.status(200).json({
        data: {
          ...newTeacher,
        },
      });
    } catch (error) {
      throw new Error(error as string);
    }
  };
}

export default TeacherController;
