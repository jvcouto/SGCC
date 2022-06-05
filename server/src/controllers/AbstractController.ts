/* eslint-disable no-unused-vars */
import Logger from "@utils/Logger";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";

abstract class AbstractController<T> {
  protected abstract Entity: new (data?: T) => T;

  protected abstract relations: string[];

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

    const data = await entityRepository.save(newEntity);

    return res.status(200).send({
      data: {
        data,
      },
    });
  };

  findAll = async (req: Request, res: Response) => {
    const entityRepository = getRepository(this.Entity);

    const entities = await entityRepository.find({
      relations: this.relations,
    });

    return res.send({ data: entities });
  };
}

export default AbstractController;
