import axios from "axios";
import { z } from "zod";

import { DeleteProductRequest } from "./type";
import { productSchema } from "@/schemas";

export const deleteProduct = async (req: DeleteProductRequest) => {
  try {
    const response = await axios.delete(
      `/api/${req.storeId}/products/${req.productId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (
  req: z.infer<typeof productSchema> & { storeId: string },
) => {
  try {
    const { storeId, ...product } = req;
    const response = await axios.post(`/api/${storeId}/products`, product);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (
  req: z.infer<typeof productSchema> & {
    storeId: string;
    productId: string;
  },
) => {
  try {
    const { storeId, productId, ...product } = req;
    const response = await axios.patch(
      `/api/${storeId}/products/${productId}`,
      product,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
