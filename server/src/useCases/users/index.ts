import AuthenticateUser from "./authenticate";
import RegisterUser from "./register";
import UpdateUser from "./update";
import GetAuthenticatedUserInfo from "./getAuthenticatedUserInfo";
import ListUsers from "./list";

import UserRepository from "@dataAccess/user.repository";

const userRepository = new UserRepository();

const authenticateUser = new AuthenticateUser(userRepository);
const registerUser = new RegisterUser(userRepository);
const updateUser = new UpdateUser(userRepository);
const getAuthenticatedUserInfo = new GetAuthenticatedUserInfo(userRepository);
const listUsers = new ListUsers(userRepository);

export {
  authenticateUser,
  registerUser,
  updateUser,
  getAuthenticatedUserInfo,
  listUsers,
};
