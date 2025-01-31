import { myDataSource } from "../databases/data_source";
import createError from "http-errors";
import { Author } from "../databases/entities/author.entity";

// Get all authors
const getAllAuthors = async () => {
  return await myDataSource.query(`SELECT * FROM authors`);
};

// Get author by ID
const getAuthorById = async (id: number) => {
  const result = await myDataSource.query(
    `
   SELECT 
    a.author_id,
    a.author_name,
    a.bio,
    a.date_of_birth,
    a.nationality,
    a.created_at,
    (
        SELECT 
            p.product_id,
            p.title,
            p.release_date,
            p.price,
            (
                SELECT TOP 1 
                    pi.image_url
                FROM 
                    products_images pi
                WHERE 
                    pi.product_id = p.product_id AND pi.is_primary = 1
            ) AS image_url
        FROM 
            products p
        WHERE 
            p.author_id = a.author_id
        FOR JSON PATH
    ) AS products
FROM 
    authors a
WHERE 
    a.author_id = @0;


  `,
    [id]
  );

  if (result.length === 0) {
    throw createError(404, "Author not found");
  }
  return result[0];
};

const getAuthorBySlug = async (slug: string) => {
  const result = await myDataSource.query(
    `
    SELECT * FROM authors WHERE slug = @0
  `,
    [slug]
  );

  if (result.length === 0) {
    throw createError(404, "Author not found");
  }
  return result[0];
};
// Create a new author
const createAuthor = async (payload: Partial<Author>) => {
  const { author_name, bio, date_of_birth, nationality } = payload;

  // Check if the author already exists
  const existingAuthor = await myDataSource.query(
    `
    SELECT * FROM authors WHERE author_name = @0
    `,
    [author_name]
  );

  if (existingAuthor.length > 0) {
    // Author already exists, return a message or handle appropriately
    return {
      message: "Author already exists",
      existingAuthor: existingAuthor[0],
    };
  }

  // Insert new author if not found
  await myDataSource.query(
    `
    INSERT INTO authors (author_name, bio, date_of_birth, nationality, created_at)
    VALUES (@0, @1, @2, @3, GETDATE())
    `,
    [author_name, bio, date_of_birth, nationality]
  );

  return { ...payload, message: "Author created successfully" };
};

// Update author by ID
const updateAuthor = async (id: number, payload: Partial<Author>) => {
  const existingAuthor = await getAuthorById(id);
  if (!existingAuthor) {
    throw createError(404, "Author not found");
  }

  const { author_name, bio, date_of_birth, nationality } = payload; // Chỉnh sửa tên thuộc tính
  await myDataSource.query(
    `
    UPDATE authors
    SET 
      author_name = @0,
      bio = @1,
      date_of_birth = @2,
      nationality = @3,
      created_at = GETDATE()
    WHERE author_id = @4
  `,
    [author_name, bio, date_of_birth, nationality, id] // Chỉnh sửa tên thuộc tính
  );

  return { ...existingAuthor, ...payload };
};

// Delete author by ID
const deleteAuthor = async (id: number) => {
  const existingAuthor = await getAuthorById(id);
  if (!existingAuthor) {
    throw createError(404, "Author not found");
  }

  await myDataSource.query(
    `
    DELETE FROM authors WHERE author_id = @0
  `,
    [id]
  );

  return existingAuthor;
};

export default {
  getAllAuthors,
  getAuthorById,
  getAuthorBySlug,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
