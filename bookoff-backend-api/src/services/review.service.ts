import { myDataSource } from "../databases/data_source";
import { Review } from "../databases/entities/review.entity"; // Giả sử bạn đã tạo thực thể Review

// Get all reviews
const getAllReviews = async () => {
  return await myDataSource.query(`
   SELECT 
    r.review_id,
	r.comment, 
    r.rating,
    r.review_date,
    r.is_purchase,
    p.title AS product_name,
    u.user_name
FROM reviews r
JOIN products p ON r.product_id = p.product_id
JOIN users u ON r.user_id = u.user_id;

  `);
};

// Create a new review
const createReview = async (payload: Partial<Review>) => {
  const {
    product_id, // Chỉnh sửa tên thuộc tính
    user_id, // Chỉnh sửa tên thuộc tính
    rating,
    comment,
    is_purchase,
  } = payload;

  await myDataSource.query(
    `
    INSERT INTO reviews (product_id, user_id, rating, comment, is_purchase)
    VALUES (@0, @1, @2, @3, @4)
  `,
    [
      product_id, // Chỉnh sửa tên thuộc tính
      user_id, // Chỉnh sửa tên thuộc tính
      rating,
      comment,
      is_purchase,
    ]
  );

  return { ...payload };
};

// Update review by ID
const updateReview = async (review_id: number, payload: Partial<Review>) => {
  // Chỉnh sửa tên tham số
  const existingReview = await getReviewById(review_id); // Chỉnh sửa tên tham số
  if (!existingReview) {
    throw new Error("Review not found");
  }

  const { product_id, user_id, rating, comment, is_purchase } = payload;

  await myDataSource.query(
    `
    UPDATE reviews
    SET product_id = @0, user_id = @1, rating = @2, comment = @3, is_purchase = @4
    WHERE review_id = @5
  `,
    [
      product_id,
      user_id,
      rating,
      comment,
      is_purchase,
      review_id, // Chỉnh sửa tên tham số
    ]
  );

  return { ...existingReview, ...payload };
};

// Get review by ID
const getReviewById = async (review_id: number) => {
  // Chỉnh sửa tên tham số
  const result = await myDataSource.query(
    `
    SELECT * FROM reviews WHERE review_id = @0
  `,
    [review_id] // Chỉnh sửa tên tham số
  );

  if (result.length === 0) {
    throw new Error("Review not found");
  }
  return result[0];
};

const getReviewByProductId = async (product_id: number) => {
  // Chỉnh sửa tên tham số
  const result = await myDataSource.query(
    `SELECT 
    r.review_id,
    r.product_id, 
    r.user_id,
    u.user_name, 
    r.rating,
    r.comment,
    r.review_date,
    r.is_purchase
FROM 
    reviews r
JOIN 
    users u ON r.user_id = u.user_id -- Join reviews with users on user_id
WHERE 
    r.product_id = @0; -- Replace 1 with the desired product ID

  `,
    [product_id] // Chỉnh sửa tên tham số
  );
  return result;
};

const getReviewByProductSlug = async (slug: string) => {
  // Chỉnh sửa query để sử dụng product_slug thay vì product_id
  const result = await myDataSource.query(
    `SELECT 
      r.review_id,
      r.product_id, 
      r.user_id,
      u.user_name, 
      r.rating,
      r.comment,
      r.review_date,
      r.is_purchase
    FROM 
      reviews r
    JOIN 
      users u ON r.user_id = u.user_id 
    JOIN 
      products p ON r.product_id = p.product_id 
    WHERE 
      p.slug = @0; 
    `,
    [slug] // Sử dụng product_slug làm tham số
  );
  return result;
};

const getReviewByUserId = async (user_id: number) => {
  const result = await myDataSource.query(
    `SELECT 
      r.review_id,
      r.product_id, 
      r.user_id,
      p.title AS product_name, -- Lấy tên sản phẩm
      r.rating,
      r.comment,
      r.review_date,
      r.is_purchase
    FROM 
      reviews r
    JOIN 
      products p ON r.product_id = p.product_id -- Join reviews với products
    WHERE 
      r.user_id = @0; -- Lọc theo user_id
    `,
    [user_id] // Truyền tham số user_id
  );
  return result;
};

// Delete review by ID
const deleteReview = async (review_id: number) => {
  // Chỉnh sửa tên tham số
  const existingReview = await getReviewById(review_id); // Chỉnh sửa tên tham số
  if (!existingReview) {
    throw new Error("Review not found");
  }

  await myDataSource.query(
    `
    DELETE FROM reviews WHERE review_id = @0
  `,
    [review_id] // Chỉnh sửa tên tham số
  );

  return existingReview;
};

export default {
  getAllReviews,
  createReview,
  updateReview,
  getReviewById,
  deleteReview,
  getReviewByProductId,
  getReviewByProductSlug,
  getReviewByUserId,
};
