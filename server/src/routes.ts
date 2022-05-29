import { Router } from "express";
import TeacherConctroller from "@controllers/TeacherController";
import AuthController from "@controllers/AuthController";
import CourseController from "@controllers/CourseController";
import UserController from "@controllers/UserController";

import authMiddleware from "./Middewares/authMiddleware";

const routes = Router();

routes.post("/auth", new AuthController().authenticate);
routes.post("/teacher/register", new TeacherConctroller().register);

routes.get("/user", new UserController().findOne);

routes.get("/courses", new CourseController().findAll);

routes.use(authMiddleware);

routes.patch("/teacher/:id", new TeacherConctroller().update);

routes.get("/teste", async (req, res) => {
  res.json({ message: "With auth route" });
});

export default routes;
