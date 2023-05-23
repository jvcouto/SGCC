import User from "@models/user.model";
import { getRepository } from "typeorm";

export default async function save(user: User) {
  const userRepository = getRepository(User);

  return userRepository.save(user);
}
