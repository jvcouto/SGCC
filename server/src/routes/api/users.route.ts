import MakeUserController from "@controllers/user.controller";
import { Router } from "express";
import expressCallback from "../utils/expressCallback";

const routes = Router();

routes.route("/:id").patch(expressCallback(MakeUserController().update));

export default routes;
