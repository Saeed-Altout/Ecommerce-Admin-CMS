import axios from "axios";
import { z } from "zod";

import { DeleteCategoryRequest } from "./type";
import { categorySchema } from "@/schemas";

export const deleteCategory = async (req: DeleteCategoryRequest) => {
  try {
    const response = await axios.delete(
      `/api/${req.storeId}/categories/${req.categoryId}`,
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
