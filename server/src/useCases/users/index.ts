import findOneUserByKey from "@dataAccess/users/findOneByKey";
import saveUser from "@dataAccess/users/save";
import AuthenticateUser from "./authenticate";
import RegisterUser from "./register";
import UpdateUser from "./update";
import GetAuthenticatedUserInfo from "./getAuthenticatedUserInfo";
import getUserPassword from "@dataAccess/users/getUserPassword";

const authenticateUser = new AuthenticateUser(
  findOneUserByKey,
  getUserPassword
);

const registerUser = new RegisterUser(findOneUserByKey, saveUser);

const updateUser = new UpdateUser(findOneUserByKey, saveUser);

const getAuthenticatedUserInfo = new GetAuthenticatedUserInfo(findOneUserByKey);

export { authenticateUser, registerUser, updateUser, getAuthenticatedUserInfo };
