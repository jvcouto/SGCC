import MakeUserController from "@controllers/user.controller";
import { Router } from "express";
import expressCallback from "../utils/expressCallback";

const routes = Router();

routes.route("/logout").post(expressCallback(MakeUserController().logout));

export default routes;
