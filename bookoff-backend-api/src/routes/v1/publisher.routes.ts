import express from "express";
import publisherController from "../../controllers/publisher.controller";

const router = express.Router();

router.get("", publisherController.getAllPublishers);
router.get("/:id", publisherController.getPublisherById);
router.get("/slug/:slug", publisherController.getPublisherById);
router.post("", publisherController.createPublisher);
router.put("/:id", publisherController.updatePublisher);
router.delete("/:id", publisherController.deletePublisher);

export default router;
