/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import SchoolClass from "@models/SchoolClassEntity";
import Logger from "@utils/Logger";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";
import User from "@models/UserEntity";
import AbstractController from "./AbstractController";

class ClassController extends AbstractController<SchoolClass> {
  protected Entity = SchoolClass;

  protected relations = ["schoolClassStudens", "teacher"];

  create = async (req: Request, res: Response): Promise<any> => {
    const UserRepository = getRepository(User);
    const { students, name }: { students: any[]; name: string } = req.body;

    const teacher = (await UserRepository.findOne({
      where: { uuid: req.userUUID },
      relations: ["courseId"],
    })) as any;

    if (!teacher) {
      Logger.error("Could not found User info");
      res.send({
        data: {
          message: "Something went wrong! Please try again!",
        },
      });
    }

    const users: User[] = [];

    for (const student of students) {
      const user = await UserRepository.findOne({
        where: { email: student.email },
      });

      if (user) {
        users.push(user);
      } else {
        const data = new User({
          ...student,
          roleId: 1,
          first_login: true,
          courseId: teacher?.courseId,
        });
        data.password = bcrypt.hashSync(student.email.split("@")[0], 10);

        try {
          const newUser = await UserRepository.save(data);
          users.push(newUser);
        } catch (error: any) {
          Logger.error(error.message as string);
        }
      }
    }

    const newClass = new this.Entity({
      name,
      teacher: teacher?.id,
      schoolClassStudens: users,
    } as SchoolClass);

    const errors = await validate({ newClass });

    if (errors.length > 0) {
      Logger.error("validation failed.");
      const formatError = errors.map((e) => e.constraints);
      return res.status(400).json({
        data: { ...formatError },
      });
    }

    const classRepository = getRepository(this.Entity);

    const data = await classRepository.save(newClass);

    return res.status(200).send({
      data: {
        data,
      },
    });
  };
}

export default ClassController;
