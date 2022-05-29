import Teacher from "@models/TeacherEntity";
import Logger from "@utils/Logger";
import bcrypt from "bcryptjs";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";

class TeacherController {
  register = async (req: Request, res: Response) => {
    const teacherRepository = getRepository(Teacher);

    const teacherData = new Teacher(req.body);

    const errors = await validate(teacherData);

    if (errors.length > 0) {
      Logger.error("validation failed.");
      const formatError = errors.map((e) => e.constraints);
      return res.status(400).json({
        data: { ...formatError },
      });
    }

    const existingTeacher = await teacherRepository.findOne({
      where: { email: teacherData.email },
    });

    if (existingTeacher) {
      return res.status(409).json({
        data: { message: "Error: Duplicated Entry! - Email" },
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

  update = async (req: Request, res: Response) => {
    const teacherRepository = getRepository(Teacher);

    const teacher = await teacherRepository.findOne(req.params.id, {
      relations: ["courseId"],
    });

    const newTeacherData = req.body;

    if (
      await teacherRepository.findOne({
        where: { email: newTeacherData.email },
      })
    ) {
      return res.status(409).json({
        data: { message: "Error: Duplicated Entry! - Email" },
      });
    }

    if (
      teacher &&
      !(await bcrypt.compare(newTeacherData.password, teacher.password))
    ) {
      return res.status(400).json({
        data: {
          message: "Senha atual não confere!",
        },
      });
    }

    if (newTeacherData.newPassword) {
      newTeacherData.password = bcrypt.hashSync(newTeacherData.newPassword, 10);
      delete newTeacherData.newPasswordRepeat;
      delete newTeacherData.newPassword;
    }

    if (newTeacherData.email) {
      delete newTeacherData.password;
    }

    const newTeacher = new Teacher({
      ...teacher,
      ...newTeacherData,
    });

    const errors = await validate(newTeacher);

    if (errors.length > 0) {
      Logger.error("validation failed.");
      const formatError = errors.map((e) => e.constraints);
      return res.status(400).json({
        data: { ...formatError },
      });
    }

    try {
      const newTeacherUpdated = await teacherRepository.save(newTeacher);
      return res.status(200).json({
        data: {
          ...newTeacherUpdated,
        },
      });
    } catch (error) {
      throw new Error(error as string);
    }
  };
}

export default TeacherController;
