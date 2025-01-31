import express from "express";
import bannerController from "../../controllers/banner.controller";

const router = express.Router();

router.get("", bannerController.getAllBanners);
router.get("/:id", bannerController.getBannerById);
router.post("", bannerController.createBanner);
router.put("/:id", bannerController.updateBanner);
router.delete("/:id", bannerController.deleteBanner);

export default router;
