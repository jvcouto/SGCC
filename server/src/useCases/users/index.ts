import findOneByKey from "src/data-access/users/findOneByKey";
import MakeAuthenticate from "./authenticate";

const { authenticate } = new MakeAuthenticate(findOneByKey);

const userService = { authenticate };

export default userService;

export { authenticate };
