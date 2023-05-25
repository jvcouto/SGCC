import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import userRoutes from "./users.route";

const routes = Router();

routes.use(authMiddleware);
routes.use("/user", userRoutes);

export default routes;
