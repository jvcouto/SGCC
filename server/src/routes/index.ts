import express from "express";
import publicRoutes from "./public";
import routes from "./api";

const router = express.Router();

router.use(publicRoutes);
router.use("/api", routes);

export default router;
