import express from "express";
import wishlistController from "../../controllers/wishlist.controller";

const router = express.Router();

router.get("", wishlistController.getAllWishlists);
router.get("/:id", wishlistController.getWishlistItemById);
router.get("/customers/:id", wishlistController.getWishlistItemByCustomerId);
router.post("", wishlistController.createWishlistItem);
router.put("/:id", wishlistController.updateWishlistItem);
router.delete("/:id", wishlistController.deleteWishlistItem);

export default router;
