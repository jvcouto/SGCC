import { Router } from "express";
import TeacherConctroller from "@controllers/TeacherController";
import AuthController from "@controllers/AuthController";

import authMiddlware from "./Middewares/authMiddleware";

const routes = Router();

routes.get("/", async (req, res) => {
  res.json({ message: "Public Route" });
});
routes.post("/auth", new AuthController().authenticate);
routes.post("/teacher/register", new TeacherConctroller().register);

routes.use(authMiddlware);

routes.get("/teste", async (req, res) => {
  res.json({ message: "With auth route" });
});

export default routes;
