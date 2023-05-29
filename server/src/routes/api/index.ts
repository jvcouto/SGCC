import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import userRoutes from "./users.route";
import courseRoutes from "./course.route";
import subjectRoutes from "./subject.route";
import semesterRoutes from "./semester.route";
import subjectRequestRoutes from "./subjectRequest.route";

const routes = Router();

routes.use(authMiddleware);
routes.use("/user", userRoutes);
routes.use("/course", courseRoutes);
routes.use("/subject", subjectRoutes);
routes.use("/semester", semesterRoutes);
routes.use("/subjectRequest", subjectRequestRoutes);

export default routes;
