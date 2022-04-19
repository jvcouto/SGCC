import { Router } from "express";
import TeacherConctroller from "@controllers/TeacherController";

const routes = Router();

routes.get("/", async (req, res) => {
  res.json({ message: "Hello World!" });
});

routes.post("/teacher/register", new TeacherConctroller().register);

export default routes;
