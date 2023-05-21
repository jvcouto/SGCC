import { Router } from "express";
import userController from "@controllers/user.controller";
import authMiddleware from "../middlewares/authMiddleware";
import expressCallback from "../utils/expressCallback";

const routes = Router();

routes.use(authMiddleware);

export default routes;
