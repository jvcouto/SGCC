import { Router } from "express";
import TeacherController from "@controllers/TeacherController";
import AuthController from "@controllers/AuthController";
import CourseController from "@controllers/CourseController";
import UserController from "@controllers/UserController";

import ClassController from "@controllers/ClassController";
import StudentController from "@controllers/StudentController";
import authMiddleware from "./Middewares/authMiddleware";

const routes = Router();

routes.post("/auth", new AuthController().authenticate);
routes.post("/teacher/register", new TeacherController().register);

routes.get("/user", new UserController().findOne);

routes.get("/courses", new CourseController().findAll);

routes.use(authMiddleware);

routes.patch("/teacher/:id", new TeacherController().update);

routes.get("/classes", new ClassController().findAll);

routes.get("/students", new StudentController().findAll);

export default routes;
