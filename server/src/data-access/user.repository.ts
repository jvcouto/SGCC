import User from "@models/user.model";
import { getRepository } from "typeorm";

export default class UserRepository {
  async findOne(value: string, key: string = "id") {
    const userRepository = getRepository(User);

    const queryOptions = {
      where: key === "email" ? { email: value } : { id: value },
      relations: ["colleges", "teaching", "administrating"],
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
}
