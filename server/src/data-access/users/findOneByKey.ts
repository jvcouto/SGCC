import User from "@models/user.model";
import { getRepository } from "typeorm";

export default async function findOneUserByKey(
  value: string,
  key: string = "id"
) {
  const userRepository = getRepository(User);

  const queryOptions = {
    where: key === "email" ? { email: value } : { id: value },
    relations: ["colleges", "teaching", "administrating"],
  };

  return userRepository.findOne(queryOptions);
}
