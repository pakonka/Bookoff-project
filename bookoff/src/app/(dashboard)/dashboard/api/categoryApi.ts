import { axiosClient } from '@/libs/axiosClient';

export const fetchCategories = async () => {
  try {
    const url = `http://localhost:5000/api/v1/categories/sub-category`;
    const res = await axiosClient.get(url);
    return res.data; // Return the category data
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to load categories.");
  }
};