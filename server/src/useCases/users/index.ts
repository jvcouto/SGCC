import findOneByKey from "@dataAccess/users/findOneByKey";
import saveUser from "@dataAccess/users/save";
import AuthenticateUseCase from "./authenticate";
import ResgisterUseCase from "./register";
import UpdateUserCase from "./update";

const authenticateUseCase = new AuthenticateUseCase(findOneByKey);

const registerUseCase = new ResgisterUseCase(findOneByKey, saveUser);

const updateUserCase = new UpdateUserCase(findOneByKey, saveUser);

export { authenticateUseCase, registerUseCase, updateUserCase };
