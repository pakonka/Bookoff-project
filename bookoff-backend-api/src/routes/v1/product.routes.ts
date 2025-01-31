import express from "express";
import productController from "../../controllers/product.controller";
import {
  authenticateToken,
  staffAuthorize,
} from "../../middlewares/auth.middleware"; // Import middleware

const router = express.Router();

// Route yêu cầu quyền xem tất cả sản phẩm (view_products)
// router.get(
//   "",
//   authenticateToken(),
//   staffAuthorize(["view_products"]),
//   productController.getAllProducts
// );
router.get("", productController.getAllProducts);

// Route yêu cầu quyền xem chi tiết sản phẩm (view_products)
// router.get(
//   "/details",
//   authenticateToken(),
//   staffAuthorize(["view_products"]),
//   productController.getProductsWithDetails
// );
router.get("/details", productController.getProductsWithDetails);

router.get("/recommend", productController.getRecommentProducts);

// Route yêu cầu quyền xem chi tiết sản phẩm theo id (view_products)
router.get("/details/id/:id", productController.getProductDetailsById);

router.get(
  "/details/category/slug/:categorySlug",
  productController.getProductDetailsByCategorySlug
);

router.get(
  "/top-selling/:categorySlug",
  productController.getTopSellingProductsByCategorySlug
);

// Route yêu cầu quyền xem sản phẩm theo id (view_products)
// router.get("/:id", productController.getProductById);

// Route yêu cầu quyền xem sản phẩm theo slug (view_products)
router.get("/details/slug/slug/:slug", productController.getProductBySlug);

// Route yêu cầu quyền tạo sản phẩm (create_product)
router.post(
  "",
  authenticateToken(),
  staffAuthorize(["create_product"]),
  productController.createProduct
);

// Route yêu cầu quyền tạo sản phẩm theo tên (create_product)
router.post(
  "/create",
  authenticateToken(),
  staffAuthorize(["create_product"]),
  productController.createProductByName
);

// Route yêu cầu quyền cập nhật sản phẩm (update_product)
router.put(
  "/:id",
  authenticateToken(),
  staffAuthorize(["update_product"]),
  productController.updateProduct
);

// Route yêu cầu quyền cập nhật sản phẩm theo tên (update_product)
router.put(
  "/update/:id",
  authenticateToken(),
  staffAuthorize(["update_product"]),
  productController.updateProductByName
);

// Route yêu cầu quyền xóa sản phẩm (delete_product)
router.delete(
  "/:id",
  authenticateToken(),
  staffAuthorize(["delete_product"]),
  productController.deleteProduct
);

export default router;
