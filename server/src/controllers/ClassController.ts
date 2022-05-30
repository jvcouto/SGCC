import SchoolClass from "@models/SchoolClassEntity";
import Logger from "@utils/Logger";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";
import AbstractController from "./AbstractController";

class ClassController extends AbstractController<SchoolClass> {
  protected Entity = SchoolClass;

  protected relations = ["schoolClassStudens"];

  create = async (req: Request, res: Response): Promise<any> => {
    const newEntity = new this.Entity(req.body);

    const errors = await validate({ newEntity });

    if (errors.length > 0) {
      Logger.error("validation failed.");
      const formatError = errors.map((e) => e.constraints);
      return res.status(400).json({
        data: { ...formatError },
      });
    }

    const entityRepository = getRepository(this.Entity);

    newEntity.schoolClassStudens.forEach((e) => {
      e.password = bcrypt.hashSync(e.password, 10);
    });

    const data = await entityRepository.save(newEntity);

    return res.status(200).send({
      data: {
        data,
      },
    });
  };
}

export default ClassController;
