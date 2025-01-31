import express from "express";
import countController from "../../controllers/count.controller";

const router = express.Router();

// Customer routes
router.get("/", countController.getCounts);

export default router;
