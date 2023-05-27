import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import userRoutes from "./users.route";
import courseRoutes from "./course.route";
import subjectRoutes from "./subject.route";

const routes = Router();

routes.use(authMiddleware);
routes.use("/user", userRoutes);
routes.use("/course", courseRoutes);
routes.use("/subject", subjectRoutes);

export default routes;
