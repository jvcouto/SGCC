import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import userRoutes from "./users.route";
import courseRoutes from "./course.route";
import subjectRoutes from "./subject.route";
import semesterRoutes from "./period.route";
import subjectOfferRoutes from "./subjectOffer.route";
import departamentRoutes from "./departament.route";
import teachingPlanRouter from "./teachingPlan.route";

const routes = Router();

routes.use(authMiddleware);
routes.use("/user", userRoutes);
routes.use("/courses", courseRoutes);
routes.use("/subjects", subjectRoutes);
routes.use("/periods", semesterRoutes);
routes.use("/subjectOffer", subjectOfferRoutes);
routes.use("/departaments", departamentRoutes);
routes.use("/teachingPlan", teachingPlanRouter);

export default routes;
