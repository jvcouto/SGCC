import User from "@models/user.model";
import { getRepository } from "typeorm";

export default async function getUserPassword(id: string) {
  const repository = getRepository(User);

  return repository
    .createQueryBuilder("user")
    .select("user.id")
    .addSelect("user.password")
    .where("user.id = :userId", { userId: id })
    .getOne();
}
