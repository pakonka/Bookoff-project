import express from "express";
import customerController from "../../controllers/customer.controller";

const router = express.Router();

// Customer routes
router.get("/", customerController.getCustomers);
router.get("/count", customerController.getCustomersCount);
router.get("/:id", customerController.getCustomerById);

export default router;
