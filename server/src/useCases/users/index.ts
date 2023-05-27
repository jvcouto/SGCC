import findOneByKey from "@dataAccess/users/findOneByKey";
import saveUser from "@dataAccess/users/save";
import AuthenticateUser from "./authenticate";
import RegisterUser from "./register";
import UpdateUser from "./update";

const authenticateUser = new AuthenticateUser(findOneByKey);

const registerUser = new RegisterUser(findOneByKey, saveUser);

const updateUser = new UpdateUser(findOneByKey, saveUser);

export { authenticateUser, registerUser, updateUser };
