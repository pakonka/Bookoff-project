import { myDataSource } from "../databases/data_source";
import createError from "http-errors";
import { Publisher } from "../databases/entities/publisher.entity";

// Get all publishers
const getAllPublishers = async () => {
  return await myDataSource.query(`SELECT 
    pub.publisher_id,
    pub.publisher_name,
    pub.location,
    pub.description,
    COUNT(prod.product_id) AS total_products
FROM publishers pub
LEFT JOIN products prod ON pub.publisher_id = prod.publisher_id
GROUP BY 
    pub.publisher_id, 
    pub.publisher_name, 
    pub.location, 
    pub.description;`);
};

// Get publisher by ID
const getPublisherById = async (id: number) => {
  const result = await myDataSource.query(
    `
    SELECT * FROM publishers WHERE publisher_id = @0
  `,
    [id]
  );

  if (result.length === 0) {
    throw createError(404, "Publisher not found");
  }
  return result[0];
};

const getPublisherBySlug = async (slug: string) => {
  const result = await myDataSource.query(
    `
    SELECT * FROM publishers WHERE slug = @0
  `,
    [slug]
  );

  if (result.length === 0) {
    throw createError(404, "Publisher not found");
  }
  return result[0];
};

// Create a new publisher
const createPublisher = async (payload: Partial<Publisher>) => {
  const { publisher_ame, location, description } = payload;

  // Kiểm tra xem publisher_name đã tồn tại hay chưa
  const existingPublisher = await myDataSource.query(
    `
    SELECT * FROM publishers WHERE publisher_name = @0
  `,
    [publisher_ame]
  );

  if (existingPublisher.length > 0) {
    throw new Error("Publisher already exists");
  }

  // Nếu chưa tồn tại, thêm mới publisher
  await myDataSource.query(
    `
    INSERT INTO publishers (publisher_name, location, description)
    VALUES (@0, @1, @2)
  `,
    [publisher_ame, location, description]
  );

  return { ...payload };
};

// Update publisher by ID
const updatePublisher = async (id: number, payload: Partial<Publisher>) => {
  const existingPublisher = await getPublisherById(id);
  if (!existingPublisher) {
    throw createError(404, "Publisher not found");
  }

  const { publisher_ame, location, description } = payload;
  await myDataSource.query(
    `
    UPDATE publishers
    SET 
      publisher_name = @0,
      location = @1,
      description = @2
    WHERE publisher_id = @3
  `,
    [publisher_ame, location, description, id]
  );

  return { ...existingPublisher, ...payload };
};

// Delete publisher by ID
const deletePublisher = async (id: number) => {
  const existingPublisher = await getPublisherById(id);
  if (!existingPublisher) {
    throw createError(404, "Publisher not found");
  }

  await myDataSource.query(
    `
    DELETE FROM publishers WHERE publisher_id = @0
  `,
    [id]
  );

  return existingPublisher;
};

export default {
  getAllPublishers,
  getPublisherById,
  getPublisherBySlug,
  createPublisher,
  updatePublisher,
  deletePublisher,
};
