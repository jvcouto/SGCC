import User from "@models/user.model";
import { getRepository } from "typeorm";

export default async function findOneByKey(param: {
  key: string;
  value: string;
}) {
  const userRepository = getRepository(User);
  const { key, value } = param;

  let queryObject = {};

  if (key === "email") {
    queryObject = { email: value };
  } else {
    queryObject = { id: value };
  }
  return userRepository.findOne(queryObject);
}
