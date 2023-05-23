import findOneByKey from "src/data-access/users/findOneByKey";
import saveUser from "src/data-access/users/save";
import MakeAuthenticate from "./authenticate";
import MakeRegister from "./register";

const authenticate = MakeAuthenticate(findOneByKey);

const register = MakeRegister(findOneByKey, saveUser);

export default { authenticate, register };
export { authenticate, register };
