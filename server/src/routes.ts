import { Router } from "express";
import AuthController from "@controllers/AuthController";
import CourseController from "@controllers/CourseController";
import UserController from "@controllers/UserController";

import ClassController from "@controllers/ClassController";
import QuestionTypeController from "@controllers/QuestionTypeController";
import EssayQuestionController from "@controllers/EssayQuestionController";
import authMiddleware from "./Middewares/authMiddleware";

const routes = Router();

routes.post("/auth", new AuthController().authenticate);
routes.post("/register", new UserController().register);

routes.get("/user", new UserController().findOne);

routes.get("/courses", new CourseController().findAll);

routes.use(authMiddleware);

routes.patch("/user/:id", new UserController().update);

routes.get("/classes", new ClassController().findAll);
routes.post("/classes", new ClassController().create);
routes.patch("/classes/:id", new ClassController().update);

routes.get("/questions/types", new QuestionTypeController().findAll);

routes.post("/questions/essay", new EssayQuestionController().create);
routes.get("/questions/types", new QuestionTypeController().findAll);

export default routes;
