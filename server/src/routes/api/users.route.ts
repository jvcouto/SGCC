import MakeUserController from "@controllers/user.controller";
import { Router } from "express";
import expressCallback from "../utils/expressCallback";

const routes = Router();

routes.route("/:id").patch(expressCallback(MakeUserController().update));
routes
  .route("/current")
  .get(expressCallback(MakeUserController().getCurrentUser));

export default routes;
