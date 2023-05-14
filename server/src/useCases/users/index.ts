import findOneByKey from "src/data-access/users/findOneByKey";
import makeAuthenticate from "./authenticate";

const authenticate = makeAuthenticate({ findOneByKey });

const userService = { authenticate };

export default userService;

export { authenticate };
