import { myDataSource } from "../databases/data_source";
import createError from "http-errors";
import { Product } from "../databases/entities/product.entity";

// Get all products
const getAllProducts = async () => {
  return await myDataSource.query(`
    SELECT * FROM products
  `);
};

// Get product by ID
const getProductById = async (id: number) => {
  const result = await myDataSource.query(
    `SELECT 
    p.product_id, 
    p.title, 
    p.description, 
    p.price,  
    p.release_date,
    p.slug,
    c.category_name, 
    a.author_name, 
    pub.publisher_name, 
    d.discount_code, 
    d.discount_percentage, 
    s.available_stock,
    -- Use SELECT TOP 1 to return only the primary image URL
    (SELECT TOP 1 
        pi.image_url
     FROM 
        products_images pi
     WHERE 
        pi.product_id = p.product_id AND pi.is_primary = 1  -- Use 1 for true
    ) AS image_url,
    -- Calculate the average rating
    AVG(r.rating) AS average_rating
FROM 
    products p
LEFT JOIN 
    categories c ON p.category_id = c.category_id
LEFT JOIN 
    authors a ON p.author_id = a.author_id
LEFT JOIN 
    publishers pub ON p.publisher_id = pub.publisher_id
LEFT JOIN 
    discounts d ON p.discount_id = d.discount_id
LEFT JOIN 
    stocks s ON p.product_id = s.product_id
LEFT JOIN 
    reviews r ON p.product_id = r.product_id
WHERE 
    p.product_id = @0
GROUP BY 
    p.product_id, p.title, p.slug, p.description, p.price, p.release_date, 
    c.category_name, a.author_name, pub.publisher_name, d.discount_code, 
    d.discount_percentage, s.available_stock;
  `,
    [id]
  );

  if (result.length === 0) {
    throw createError(404, "Product not found");
  }
  return result[0];
};

const getProductBySlug = async (slug: string) => {
  console.log("slug", slug);
  const result = await myDataSource.query(
    `SELECT 
    p.product_id, 
    p.title, 
    p.description, 
    p.price, 
    p.slug,
    p.release_date,
    c.category_name, 
    a.author_name, 
    pub.publisher_name,
    d.discount_code, 
    d.discount_percentage, 
    s.available_stock,
    -- Use SELECT to return JSON array of all images
    (
        SELECT 
            pi.image_id,
            pi.image_url,
            pi.alt_text,
            pi.is_primary
        FROM products_images pi 
        WHERE pi.product_id = p.product_id
        FOR JSON PATH
    ) AS images,
     ( 
        SELECT TOP 1 pi.image_url
        FROM products_images pi
        WHERE pi.product_id = p.product_id AND pi.is_primary = 1
    ) AS primary_image_url,
    -- Calculate the average rating from reviews
    AVG(r.rating) AS average_rating
FROM 
    products p
LEFT JOIN 
    categories c ON p.category_id = c.category_id
LEFT JOIN 
    authors a ON p.author_id = a.author_id
LEFT JOIN 
    publishers pub ON p.publisher_id = pub.publisher_id
LEFT JOIN 
    discounts d ON p.discount_id = d.discount_id
LEFT JOIN 
    stocks s ON p.product_id = s.product_id
LEFT JOIN 
    reviews r ON p.product_id = r.product_id
WHERE 
    p.slug = @0
GROUP BY 
    p.product_id, p.title, p.description,p.slug, p.price, p.release_date, 
    c.category_name, a.author_name, pub.publisher_name, d.discount_code, 
    d.discount_percentage, s.available_stock;
  `,
    [slug]
  );

  if (result.length === 0) {
    throw createError(404, "Product not found");
  }
  return result[0];
};

// Create a new product
const createProduct = async (payload: Partial<Product>) => {
  const {
    category_id,
    publisher_id,
    author_id,
    title,
    release_date,
    description,
    price,
    discount_id,
    SKU,
    created_by,
    slug,
  } = payload;

  await myDataSource.query(
    `
    INSERT INTO products (category_id, publisher_id, author_id, title, release_date, description, price, discount_id, SKU, created_by, slug)
    VALUES (@0, @1, @2, @3, @4, @5, @6, @7, @8, @9, @10)
  `,
    [
      category_id,
      publisher_id,
      author_id,
      title,
      release_date,
      description,
      price,
      discount_id,
      SKU,
      created_by,
      slug,
    ]
  );

  return { ...payload };
};

///
const createProductByName = async (payload: any) => {
  const {
    category_name,
    publisher_name,
    author_name,
    title,
    release_date,
    description,
    price,
    discount_code,
    SKU,
    created_by,
    slug,
  } = payload;

  await myDataSource.query(
    ` 
    INSERT INTO products (
      category_id, 
      publisher_id, 
      author_id, 
      title, 
      release_date, 
      description, 
      price, 
      discount_id, 
      SKU, 
      created_by, 
      slug
    )
    VALUES (
      (SELECT category_id FROM categories WHERE category_name = @0 ),
      (SELECT publisher_id FROM publishers WHERE publisher_name = @1 ),
      (SELECT author_id FROM authors WHERE author_name = @2 ),
      @3, @4, @5, @6,
      (SELECT discount_id FROM discounts WHERE discount_code = @7 ),
      @8, @9, @10
    )
  `,
    [
      category_name,
      publisher_name,
      author_name,
      title,
      release_date,
      description,
      price,
      discount_code,
      SKU,
      created_by,
      slug,
    ]
  );

  return { ...payload };
};

// Update product by ID
const updateProduct = async (id: number, payload: Partial<Product>) => {
  const existingProduct = await getProductById(id);
  if (!existingProduct) {
    throw createError(404, "Product not found");
  }

  const {
    category_id,
    publisher_id,
    author_id,
    title,
    release_date,
    description,
    price,
    discount_id,
    SKU,
    created_by,
    slug,
  } = payload;

  await myDataSource.query(
    `
    UPDATE products
    SET 
      category_id = @0,
      publisher_id = @1,
      author_id = @2,
      title = @3,
      release_date = @4,
      description = @5,
      price = @6,
      discount_id = @7,
      SKU = @8,
      updated_by = @9,
      updated_at = GETDATE(),
      slug= @10 
    WHERE product_id = @11
  `,
    [
      category_id,
      publisher_id,
      author_id,
      title,
      release_date,
      description,
      price,
      discount_id,
      SKU,
      created_by,
      slug,
      id,
    ]
  );

  return { ...existingProduct, ...payload };
};

const updateProductByName = async (id: number, payload: any) => {
  console.log("payload:", payload);
  const {
    category_name,
    publisher_name,
    author_name,
    release_date,
    description,
    price,
    discount_code,
    SKU,
    created_by,
    slug,
    title,
    available_stock,
  } = payload;

  await myDataSource.query(
    `
    -- Cập nhật bảng products
    UPDATE products
    SET
      category_id = (SELECT category_id FROM categories WHERE category_name = @0), 
      publisher_id = (SELECT publisher_id FROM publishers WHERE publisher_name = @1),
      author_id = (SELECT author_id FROM authors WHERE author_name = @2),
      release_date = @3,
      description = @4, 
      price = @5,
      discount_id = (SELECT discount_id FROM discounts WHERE discount_code = @6),
      SKU = @7,
      created_by = @8,
      slug = @9,
      title = @10
    WHERE product_id = @11;
 
    -- Cập nhật bảng stocks
    UPDATE stocks
    SET
      available_stock = @12 
    WHERE product_id = @11;
  `,
    [
      category_name,
      publisher_name,
      author_name,
      release_date,
      description,
      price,
      discount_code,
      SKU,
      created_by,
      slug,
      title,
      id,
      available_stock, // Truyền giá trị available_stock dưới dạng số
    ]
  );

  return { ...payload };
};

// Delete product by ID
const deleteProduct = async (id: number) => {
  const existingProduct = await getProductById(id);
  if (!existingProduct) {
    throw createError(404, "Product not found");
  }

  await myDataSource.query(
    `
    DELETE FROM products WHERE product_id = @0
  `,
    [id]
  );

  return existingProduct;
};

// New function to get products with details
const getProductsWithDetails = async () => {
  try {
    const products = await myDataSource.query(`
          SELECT 
          p.product_id,
          p.title,
          p.description,
          p.price, 
          p.slug,
          p.release_date,
          c.category_name,
          a.author_name,
          pub.publisher_name,
          d.discount_code,
          d.discount_percentage,
          s.available_stock,
          -- Aggregate images into a JSON array
          (
              SELECT 
                  pi.image_url,
                  pi.alt_text,
                  pi.is_primary
              FROM products_images pi
              WHERE pi.product_id = p.product_id
              FOR JSON PATH
          ) AS images,
          -- Select the primary image separately for convenience
          ( 
              SELECT TOP 1 pi.image_url
              FROM products_images pi
              WHERE pi.product_id = p.product_id AND pi.is_primary = 1
          ) AS primary_image_url,
          -- Calculate the average rating from reviews
          AVG(r.rating) AS average_rating
      FROM 
          products p
      LEFT JOIN 
          categories c ON p.category_id = c.category_id
      LEFT JOIN 
          authors a ON p.author_id = a.author_id
      LEFT JOIN 
          publishers pub ON p.publisher_id = pub.publisher_id
      LEFT JOIN 
          discounts d ON p.discount_id = d.discount_id
      LEFT JOIN 
          stocks s ON p.product_id = s.product_id
      LEFT JOIN 
          products_images pi ON p.product_id = pi.product_id
      LEFT JOIN 
          reviews r ON p.product_id = r.product_id
      GROUP BY 
          p.product_id,
          p.title,
          p.description,
          p.price,
          p.slug,
          p.release_date,
          c.category_name,
          a.author_name,
          pub.publisher_name,
          d.discount_code,
          d.discount_percentage,
          s.available_stock;
      `);

    return products;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};
const getProductDetailsById = async (productId: number) => {
  try {
    const product = await myDataSource.query(
      `SELECT 
    p.product_id, 
    p.title, 
    p.description, 
    p.price, 
    p.slug,
    p.release_date,
    c.category_name, 
    a.author_name, 
    pub.publisher_name,
    d.discount_code, 
    d.discount_percentage, 
    s.available_stock,
    -- Use SELECT to return JSON array of all images
    (
        SELECT 
            pi.image_id,
            pi.image_url,
            pi.alt_text,
            pi.is_primary
        FROM products_images pi
        WHERE pi.product_id = p.product_id
        FOR JSON PATH
    ) AS images,
     ( 
        SELECT TOP 1 pi.image_url
        FROM products_images pi
        WHERE pi.product_id = p.product_id AND pi.is_primary = 1
    ) AS primary_image_url,
    -- Calculate the average rating from reviews
    AVG(r.rating) AS average_rating
FROM 
    products p
LEFT JOIN 
    categories c ON p.category_id = c.category_id
LEFT JOIN 
    authors a ON p.author_id = a.author_id
LEFT JOIN 
    publishers pub ON p.publisher_id = pub.publisher_id
LEFT JOIN 
    discounts d ON p.discount_id = d.discount_id
LEFT JOIN 
    stocks s ON p.product_id = s.product_id
LEFT JOIN 
    reviews r ON p.product_id = r.product_id
WHERE 
    p.product_id = @0
GROUP BY 
    p.product_id, p.title, p.description,p.slug, p.price, p.release_date, 
    c.category_name, a.author_name, pub.publisher_name, d.discount_code, 
    d.discount_percentage, s.available_stock;

      `,
      [productId] // Truyền productId làm tham số
    );
    return product;
  } catch (error) {
    console.error("Error fetching product details by ID:", error);
    throw error;
  }
};

const getProductDetailsByCategorySlug = async (categorySlug: string) => {
  try {
    const products = await myDataSource.query(
      `
      WITH RecursiveCategories AS (
          -- Get the parent category based on the provided slug
          SELECT 
              category_id, 
              category_name, 
              parent_category_id, 
              slug
          FROM 
              categories
          WHERE 
              slug = @0
          
          UNION ALL
          
          -- Recursively find all child categories
          SELECT 
              c.category_id, 
              c.category_name, 
              c.parent_category_id, 
              c.slug
          FROM 
              categories c
          INNER JOIN 
              RecursiveCategories rc ON c.parent_category_id = rc.category_id
      )
      SELECT 
          p.product_id,
          p.title,
          p.description,
          p.price,
          p.release_date,
          c.category_name,
          c.slug AS category_slug,
          a.author_name,
          p.slug,
          pub.publisher_name,
          d.discount_code,
          d.discount_percentage,
          s.available_stock,
          -- Aggregate images into a JSON array
            (
        SELECT 
            pi.image_url,
            pi.alt_text,
            pi.is_primary
        FROM products_images pi
        WHERE pi.product_id = p.product_id
        FOR JSON PATH
    ) AS images,
    -- Select the primary image separately for convenience
    ( 
        SELECT TOP 1 pi.image_url
        FROM products_images pi
        WHERE pi.product_id = p.product_id AND pi.is_primary = 1
    ) AS primary_image_url,
          -- Calculate the average rating from reviews
          AVG(r.rating) AS average_rating
      FROM 
          products p
      LEFT JOIN 
          categories c ON p.category_id = c.category_id
      LEFT JOIN 
          authors a ON p.author_id = a.author_id
      LEFT JOIN 
          publishers pub ON p.publisher_id = pub.publisher_id
      LEFT JOIN 
          discounts d ON p.discount_id = d.discount_id
      LEFT JOIN 
          stocks s ON p.product_id = s.product_id
      LEFT JOIN 
          reviews r ON p.product_id = r.product_id
      WHERE 
          c.category_id IN (
              SELECT category_id FROM RecursiveCategories
          )
      GROUP BY 
          p.product_id,
          p.title,
          p.description,
          p.price,
          p.release_date,
          c.category_name,
          c.slug,
          p.slug, 
          a.author_name,
          pub.publisher_name,
          d.discount_code,
          d.discount_percentage,
          s.available_stock;
      `,
      [categorySlug] // Passing the categorySlug as a parameter to prevent SQL injection
    );

    return products;
  } catch (error) {
    console.error("Error fetching product details by category slug:", error);
    throw error;
  }
};

const getRecommentProducts = async () => {
  return await myDataSource.query(`
    WITH ProductRecommendations AS (
    -- Lấy sản phẩm từ lịch sử xem
    SELECT
        pv.product_id,
        MAX(pv.viewed_at) AS last_viewed,   -- Thời điểm xem gần nhất
        COUNT(pv.product_id) AS view_count, -- Số lần xem
        1 AS source_priority                -- Ưu tiên từ lịch sử xem
    FROM 
        product_views pv
    GROUP BY 
        pv.product_id

    UNION ALL

    -- Lấy sản phẩm từ danh sách yêu thích
    SELECT
        wl.product_id,
        MAX(wl.create_at) AS last_viewed,  -- Thời điểm thêm gần nhất
        0 AS view_count,                   -- Không tính số lượt xem từ wishlist
        2 AS source_priority               -- Ưu tiên thấp hơn từ wishlist
    FROM 
        wishlist wl
    GROUP BY 
        wl.product_id
),
GroupedProducts AS (
    -- Gộp nhóm các sản phẩm theo product_id
    SELECT
        pr.product_id,
        MAX(pr.last_viewed) AS last_viewed,
        SUM(pr.view_count) AS total_views,
        MIN(pr.source_priority) AS priority
    FROM 
        ProductRecommendations pr
    GROUP BY 
        pr.product_id
)
-- Lấy thông tin sản phẩm
SELECT 
    gp.product_id,
    p.title,
    p.price,
    p.release_date,
    p.description,
    gp.last_viewed,
    gp.total_views,
		p.slug,
	(SELECT TOP 1 pi.image_url 
        FROM products_images pi 
        WHERE pi.product_id = p.product_id AND pi.is_primary = 1
    ) AS primary_image_url

FROM 
    GroupedProducts gp
INNER JOIN 
    products p ON gp.product_id = p.product_id
ORDER BY 
    gp.priority ASC,      -- Ưu tiên lịch sử xem hơn wishlist
	p.slug ASC,
    gp.total_views DESC,  -- Số lượt xem cao hơn
    gp.last_viewed DESC;  -- Thời điểm gần nhất

  `);
};

const getTopSellingProductsByCategorySlug = async (categorySlug: string) => {
  try {
    const products = await myDataSource.query(
      `
     WITH RecursiveCategories AS (
    -- Get the parent category based on the provided slug
    SELECT 
        category_id, 
        category_name, 
        parent_category_id, 
        slug
    FROM 
        categories
    WHERE 
        slug = @0
    
    UNION ALL
    
    -- Recursively find all child categories
    SELECT 
        c.category_id, 
        c.category_name, 
        c.parent_category_id, 
        c.slug
    FROM 
        categories c
    INNER JOIN 
        RecursiveCategories rc ON c.parent_category_id = rc.category_id
),
ProductSales AS (
    -- Calculate total quantity sold for each product
    SELECT 
        oi.product_id, 
        SUM(oi.quantity) AS total_quantity_sold
    FROM 
        order_items oi
    INNER JOIN 
        orders o ON oi.order_id = o.order_id
    WHERE 
        o.order_status = 'Completed' -- Only consider completed orders
    GROUP BY 
        oi.product_id
)
SELECT TOP 20
    p.product_id,
    p.title,
    p.description,
    p.price,
    p.release_date,
    c.category_name,
    c.slug AS category_slug,
    a.author_name,
    p.slug,
    pub.publisher_name,
    d.discount_code,
    d.discount_percentage,
    s.available_stock,
    ps.total_quantity_sold,
    -- Aggregate images into a JSON array
    (
        SELECT 
            pi.image_url,
            pi.alt_text,
            pi.is_primary
        FROM products_images pi
        WHERE pi.product_id = p.product_id
        FOR JSON PATH
    ) AS images,
    -- Select the primary image separately for convenience
    ( 
        SELECT TOP 1 pi.image_url
        FROM products_images pi
        WHERE pi.product_id = p.product_id AND pi.is_primary = 1
    ) AS primary_image_url,
    -- Calculate the average rating from reviews
    AVG(r.rating) AS average_rating
FROM 
    products p
LEFT JOIN 
    categories c ON p.category_id = c.category_id
LEFT JOIN 
    authors a ON p.author_id = a.author_id
LEFT JOIN 
    publishers pub ON p.publisher_id = pub.publisher_id
LEFT JOIN 
    discounts d ON p.discount_id = d.discount_id
LEFT JOIN 
    stocks s ON p.product_id = s.product_id
LEFT JOIN 
    reviews r ON p.product_id = r.product_id
LEFT JOIN 
    ProductSales ps ON p.product_id = ps.product_id
WHERE 
    c.category_id IN (
        SELECT category_id FROM RecursiveCategories
    )
GROUP BY 
    p.product_id,
    p.title,
    p.description,
    p.price,
    p.release_date,
    c.category_name,
    c.slug,
    p.slug, 
    a.author_name,
    pub.publisher_name,
    d.discount_code,
    d.discount_percentage,
    s.available_stock,
    ps.total_quantity_sold
ORDER BY 
    ps.total_quantity_sold DESC; -- Sort by quantity sold in descending order

      `,
      [categorySlug] // Passing the categorySlug as a parameter to prevent SQL injection
    );

    return products;
  } catch (error) {
    console.error(
      "Error fetching top selling products by category slug:",
      error
    );
    throw error;
  }
};
export default {
  getAllProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  updateProductByName,
  deleteProduct,
  getProductsWithDetails,
  getProductDetailsById,
  createProductByName,
  getProductDetailsByCategorySlug,
  getRecommentProducts,
  getTopSellingProductsByCategorySlug,
};
