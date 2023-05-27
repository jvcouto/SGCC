import User from "@models/user.model";
import { getRepository } from "typeorm";

export default async function findOneUserByKey(
  value: string,
  key: string = "id"
) {
  const userRepository = getRepository(User);

  let queryObject = {};

  if (key === "email") {
    queryObject = { email: value };
  } else {
    queryObject = { id: value };
  }
  return userRepository.findOne(queryObject);
}
