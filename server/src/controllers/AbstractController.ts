/* eslint-disable no-unused-vars */
import { Request } from 'express';
import { getRepository } from 'typeorm';

abstract class AbstractCrudController<T, RT> {
  protected abstract Entity: new (data?: T) => T

  protected abstract responseParser(Entity: T): RT

  async create(req: Request): Promise<RT> {
    const newEntity = new this.Entity(req.body);

    const entityRepository = getRepository(this.Entity);

    const data = await entityRepository.save(newEntity);

    return this.responseParser(data);
  }

  findAll(req): RT {
  }
}

export default AbstractCrudController;
