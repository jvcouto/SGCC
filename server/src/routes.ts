import { Router } from "express";
import TeacherConctroller from "@controllers/TeacherController";
import AuthController from "@controllers/AuthController";
import CourseController from "@controllers/CourseController";

import authMiddleware from "./Middewares/authMiddleware";

const routes = Router();

routes.post("/auth", new AuthController().authenticate);
routes.post("/teacher/register", new TeacherConctroller().register);

routes.get("/courses", new CourseController().findAll);

routes.use(authMiddleware);

routes.get("/teste", async (req, res) => {
  res.json({ message: "With auth route" });
});

export default routes;
