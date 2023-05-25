import findOneByKey from "src/data-access/users/findOneByKey";
import saveUser from "src/data-access/users/save";
import AuthenticateUseCase from "./authenticate";
import ResgisterUseCase from "./register";
import UpdateUserCase from "./update";

const authenticateUseCase = new AuthenticateUseCase(findOneByKey);

const registerUseCase = new ResgisterUseCase(findOneByKey, saveUser);

const updateUserCase = new UpdateUserCase(findOneByKey, saveUser);

export { authenticateUseCase, registerUseCase, updateUserCase };
