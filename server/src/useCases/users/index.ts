import findOneUserByKey from "@dataAccess/users/findOneByKey";
import saveUser from "@dataAccess/users/save";
import AuthenticateUser from "./authenticate";
import RegisterUser from "./register";
import UpdateUser from "./update";

const authenticateUser = new AuthenticateUser(findOneUserByKey);

const registerUser = new RegisterUser(findOneUserByKey, saveUser);

const updateUser = new UpdateUser(findOneUserByKey, saveUser);

export { authenticateUser, registerUser, updateUser };
