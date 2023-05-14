import express from "express";
import publicRoutes from "./public";

const router = express.Router();

router.use(publicRoutes);

export default router;
