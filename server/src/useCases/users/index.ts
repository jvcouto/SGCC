import findOneByKey from "src/data-access/users/findOneByKey";
import saveUser from "src/data-access/users/save";
import AuthenticateUserCase from "./authenticate";
import ResgisterUseCase from "./register";
import UpdateUserCase from "./update";

const authenticateUserCase = new AuthenticateUserCase(findOneByKey);

const registerUseCase = new ResgisterUseCase(findOneByKey, saveUser);

const updateUserCase = new UpdateUserCase(findOneByKey, saveUser);

export { authenticateUserCase, registerUseCase, updateUserCase };
