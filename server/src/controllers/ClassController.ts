import SchoolClass from "@models/SchoolClassEntity";
import Logger from "@utils/Logger";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";
import AbstractController from "./AbstractController";

class ClassController extends AbstractController<SchoolClass> {
  protected Entity = SchoolClass;

  protected relations = ["schoolClassStudens", "teacher"];

  create = async (req: Request, res: Response): Promise<any> => {
    console.log(req.body);
    //   const newClass = new this.Entity(req.body);

    //   const errors = await validate({ newClass });

    //   if (errors.length > 0) {
    //     Logger.error("validation failed.");
    //     const formatError = errors.map((e) => e.constraints);
    //     return res.status(400).json({
    //       data: { ...formatError },
    //     });
    //   }

    //   const classRepository = getRepository(this.Entity);

    //   newClass.schoolClassStudens.forEach((e) => {
    //     e.password = bcrypt.hashSync(e.password, 10);
    //   });

    //   const data = await classRepository.save(newClass);

    //   return res.status(200).send({
    //     data: {
    //       data,
    //     },
    //   });
  };
}

export default ClassController;
