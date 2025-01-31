import { myDataSource } from "../databases/data_source";
import createError from "http-errors";
import { Category } from "../databases/entities/category.entity";

// Get all categories
const getAllCategories = async () => {
  return await myDataSource.query(`SELECT * FROM categories`);
};

// Get parent categories (no parent_category_id)
const getParentCategories = async () => {
  return await myDataSource.query(`
    SELECT * FROM categories WHERE parent_category_id IS NULL
  `);
};
// Get subcategories (no parent_category_id)
const getSubCategories = async () => {
  return await myDataSource.query(`
     SELECT 
    c.category_id,
    c.category_name,
    c.description,
    pc.category_name AS parent_category_name, -- Tên danh mục cha
    COUNT(p.product_id) AS total_products -- Tổng số sản phẩm trong danh mục
FROM 
    categories c
LEFT JOIN 
    categories pc -- Tham chiếu đến danh mục cha
ON 
    c.parent_category_id = pc.category_id
LEFT JOIN 
    products p -- Liên kết với bảng sản phẩm
ON 
    c.category_id = p.category_id
WHERE 
    c.parent_category_id IS NOT NULL
GROUP BY 
    c.category_id, 
    c.category_name, 
    c.description, 
    c.parent_category_id, 
    pc.category_name;

  `);
};

// Get categories by parent ID
const getCategoriesByParentId = async (parentId: number) => {
  return await myDataSource.query(
    `
    SELECT * FROM categories WHERE parent_category_id = @0
  `,
    [parentId]
  );
};

// Get categories by parent Slug
const getCategoriesByParentSlug = async (slug: string) => {
  return await myDataSource.query(
    `
    SELECT c.*
    FROM categories c
    INNER JOIN categories p ON c.parent_category_id = p.category_id
    WHERE p.slug = @0;
  `,

    [slug]
  );
};

// Get category by slug
const getCategoryBySlug = async (slug: string) => {
  const result = await myDataSource.query(
    `
    SELECT * FROM categories WHERE slug = @0
  `,
    [slug]
  );

  if (result.length === 0) {
    throw createError(404, "Category not found");
  }
  return result[0];
};

// Get category by ID
const getCategoryById = async (id: number) => {
  const result = await myDataSource.query(
    `
     SELECT c.*, p.category_name AS parent_category_name
    FROM categories c
    LEFT JOIN categories p ON c.parent_category_id = p.category_id
    WHERE c.category_id = @0 
  `,
    [id]
  );

  if (result.length === 0) {
    throw createError(404, "Category not found");
  }
  return result[0];
};

// Create a new category
const createCategory = async (payload: any) => {
  const { category_name, description, slug, parent_category_name, created_by } =
    payload;

  let parent_category_id = null;

  // Chỉ thực hiện truy vấn nếu có parent_category_name
  if (parent_category_name) {
    const parentCategoryResult = await myDataSource.query(
      `SELECT category_id FROM categories WHERE category_name = @0`,
      [parent_category_name]
    );

    // Kiểm tra nếu không tìm thấy danh mục cha
    if (parentCategoryResult.length === 0) {
      throw new Error("Parent category not found");
    }
    // Lấy parent_category_id từ kết quả truy vấn
    parent_category_id = parentCategoryResult[0].category_id;
  }

  // Tiến hành tạo danh mục mới
  await myDataSource.query(
    `
    INSERT INTO categories (category_name, description, slug, parent_category_id, created_by)
    VALUES (@0, @1, @2, @3, @4)
  `,
    [category_name, description, slug, parent_category_id, created_by]
  );

  return { ...payload };
};

// Update category by ID
const updateCategory = async (id: number, payload: any) => {
  const existingCategory = await getCategoryById(id);
  if (!existingCategory) {
    throw createError(404, "Category not found");
  }

  const { category_name, description, slug, parent_category_name, created_by } =
    payload;

  await myDataSource.query(
    `
    UPDATE categories
    SET 
      category_name = @0,
      description = @1,
      slug = @2,
      parent_category_id = (
        SELECT category_id
        FROM categories
        WHERE category_name = @3
        LIMIT 1
      ),
      updated_by = @4,
      updated_at = GETDATE()
    WHERE category_id = @5
  `,
    [category_name, description, slug, parent_category_name, created_by, id]
  );

  return { ...existingCategory, ...payload };
};

// Delete category by ID
const deleteCategory = async (id: number) => {
  const existingCategory = await getCategoryById(id);
  if (!existingCategory) {
    throw createError(404, "Category not found");
  }

  await myDataSource.query(
    `
    DELETE FROM categories WHERE category_id = @0
  `,
    [id]
  );

  return existingCategory;
};

export default {
  getAllCategories,
  getParentCategories,
  getCategoriesByParentId,
  getCategoriesByParentSlug,
  getCategoryBySlug,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getSubCategories,
};
