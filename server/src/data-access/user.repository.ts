import User from "@models/user.model";
import { UserQueryOpts } from "@useCases/users/list";
import { MAX_TAKE_ITEMS } from "@utils/constants/paginationOptions";
import { FindManyOptions, Like, getRepository } from "typeorm";

export default class UserRepository {
  async findOne(value: string, key: string = "id") {
    const userRepository = getRepository(User);

    const queryOptions = {
      where: key === "email" ? { email: value } : { id: value },
      relations: ["colleges", "departamentAdmin", "courseAdmin"],
    };

    return userRepository.findOne(queryOptions);
  }

  async getUserPassword(id: string) {
    const repository = getRepository(User);

    return repository
      .createQueryBuilder("user")
      .select("user.id")
      .addSelect("user.password")
      .where("user.id = :userId", { userId: id })
      .getOne();
  }

  async save(user: User) {
    const userRepository = getRepository(User);

    return userRepository.save(user);
  }

  async findAll(query: UserQueryOpts) {
    const repository = getRepository(User);

    const queryOptions: FindManyOptions<User> = {
      take: MAX_TAKE_ITEMS,
    };

    if (query.name) {
      queryOptions.where = {
        name: Like(`${query.name}%`),
      };
    }

    return repository.findAndCount(queryOptions);
  }
}
