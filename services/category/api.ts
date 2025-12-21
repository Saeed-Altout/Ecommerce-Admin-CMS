import axios from "axios";
import { z } from "zod";

import { categorySchema } from "@/schemas";

export const deleteCategory = async (req: {
  storeId: string;
  categoryId: string;
}) => {
  try {
    const { storeId, categoryId } = req;
    const response = await axios.delete(
      `/api/${storeId}/categories/${categoryId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCategory = async (
  req: z.infer<typeof categorySchema> & { storeId: string },
) => {
  try {
    const { storeId, ...category } = req;
    const response = await axios.post(`/api/${storeId}/categories`, category);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCategory = async (
  req: z.infer<typeof categorySchema> & {
    storeId: string;
    categoryId: string;
  },
) => {
  try {
    const { storeId, categoryId, ...category } = req;
    const response = await axios.patch(
      `/api/${storeId}/categories/${categoryId}`,
      category,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
