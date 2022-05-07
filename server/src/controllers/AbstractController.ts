/* eslint-disable no-unused-vars */
import { Request, Response } from "express";
import { getRepository } from "typeorm";

abstract class AbstractCrudController<T> {
  protected abstract Entity: new (data?: T) => T;

  // protected abstract responseParser(Entity: T | T[]): RT;

  create = async (req: Request): Promise<T> => {
    const newEntity = new this.Entity(req.body);

    const entityRepository = getRepository(this.Entity);

    const data = await entityRepository.save(newEntity);

    return data;
  };

  findAll = async (req: Request, res: Response) => {
    const entityRepository = getRepository(this.Entity);

    const entities = await entityRepository.findAndCount();

    res.send({ data: entities[0] });
  };
}

export default AbstractCrudController;
