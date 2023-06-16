import { Router } from "express";
import expressCallback from "../utils/expressCallback";
import MakeDepartamentController from "@controllers/departament.controller";

const departamentRoutes = Router();

departamentRoutes
  .route("/")
  .post(expressCallback(MakeDepartamentController().create));
departamentRoutes
  .route("/")
  .get(expressCallback(MakeDepartamentController().list));
departamentRoutes
  .route("/:id")
  .get(expressCallback(MakeDepartamentController().findOne));

export default departamentRoutes;
