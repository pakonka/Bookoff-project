import { myDataSource } from "../databases/data_source";
import { Wishlist } from "../databases/entities/wishList.entity";

// Get all wishlists
const getAllWishlists = async () => {
  return await myDataSource.query(
    `
    SELECT TOP 4
    p.product_id,
    p.title AS product_title,
    (
      SELECT TOP 1 
        pi.image_url
      FROM 
        products_images pi
      WHERE 
        pi.product_id = p.product_id AND pi.is_primary = 1 -- Use 1 for true
      ) AS image_url,
    COUNT(w.wishlist_id) AS wishlist_count
FROM 
    wishlist w
JOIN 
    products p ON w.product_id = p.product_id
GROUP BY 
    p.product_id, p.title
ORDER BY 
    wishlist_count DESC;
  `
  );
};

// Create a new wishlist item
const createWishlistItem = async (payload: Partial<Wishlist>) => {
  const {
    user_id, // Lấy ID từ đối tượng user
    product_id,
  } = payload;

  await myDataSource.query(
    `
    INSERT INTO wishlist (user_id, product_id, create_at)
    VALUES (@0, @1, GETDATE())
  `,
    [
      user_id, // Lấy ID từ đối tượng user
      product_id, // Lấy ID từ đối tượng product
    ]
  );

  return { ...payload };
};

// Update wishlist item by ID
const updateWishlistItem = async (
  wishlist_id: number,
  payload: Partial<Wishlist>
) => {
  // Chỉnh sửa tên tham số
  const existingWishlistItem = await getWishlistItemById(wishlist_id); // Chỉnh sửa tên tham số
  if (!existingWishlistItem) {
    throw new Error("Wishlist item not found");
  }

  const {
    user_id, // Lấy ID từ đối tượng user
    product_id,
  } = payload;

  await myDataSource.query(
    `
    UPDATE wishlist
    SET user_id = @0, product_id = @1, create_at = GETDATE()
    WHERE wishlist_id = @2
  `,
    [
      user_id, // Lấy ID từ đối tượng user
      product_id,
      wishlist_id, // Chỉnh sửa tên tham số
    ]
  );

  return { ...existingWishlistItem, ...payload };
};

// Get wishlist item by ID
const getWishlistItemById = async (wishlist_id: number) => {
  // Chỉnh sửa tên tham số
  const result = await myDataSource.query(
    `
    SELECT * FROM wishlist WHERE wishlist_id = @0
  `,
    [wishlist_id] // Chỉnh sửa tên tham số
  );

  if (result.length === 0) {
    throw new Error("Wishlist item not found");
  }
  return result[0];
};

const getWishlistItemByCustomerId = async (userId: number) => {
  try {
    const wishlist = await myDataSource.query(
      `
      SELECT 
        w.wishlist_id,
        w.user_id,
        w.product_id,
        w.create_at,
        p.title AS product_title,
        p.description AS product_description,
        p.price AS product_price,
        -- Subquery to fetch the primary image URL
        (
          SELECT TOP 1 
            pi.image_url
          FROM 
            products_images pi
          WHERE 
            pi.product_id = p.product_id 
            AND pi.is_primary = 1
        ) AS product_image
      FROM wishlist w
      LEFT JOIN products p ON w.product_id = p.product_id
      WHERE w.user_id = @0
      ORDER BY w.create_at DESC;
    `,
      [userId]
    );

    return wishlist;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw new Error("Failed to fetch wishlist for the user.");
  }
};

// Delete wishlist item by ID
const deleteWishlistItem = async (wishlist_id: number) => {
  // Chỉnh sửa tên tham số
  const existingWishlistItem = await getWishlistItemById(wishlist_id); // Chỉnh sửa tên tham số
  if (!existingWishlistItem) {
    throw new Error("Wishlist item not found");
  }

  await myDataSource.query(
    `
    DELETE FROM wishlist WHERE wishlist_id = @0
  `,
    [wishlist_id] // Chỉnh sửa tên tham số
  );

  return existingWishlistItem;
};

export default {
  getAllWishlists,
  createWishlistItem,
  updateWishlistItem,
  getWishlistItemById,
  getWishlistItemByCustomerId,
  deleteWishlistItem,
};
