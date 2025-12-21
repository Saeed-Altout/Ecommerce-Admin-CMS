import axios from "axios";
import { z } from "zod";

import { sizeSchema } from "@/schemas";

export const deleteSize = async (req: {
  storeId: string;
  sizeId: string;
}) => {
  try {
    const { storeId, sizeId } = req;
    const response = await axios.delete(`/api/${storeId}/sizes/${sizeId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createSize = async (
  req: z.infer<typeof sizeSchema> & { storeId: string },
) => {
  try {
    const { storeId, ...size } = req;
    const response = await axios.post(`/api/${storeId}/sizes`, size);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateSize = async (
  req: z.infer<typeof sizeSchema> & {
    storeId: string;
    sizeId: string;
  },
) => {
  try {
    const { storeId, sizeId, ...size } = req;
    const response = await axios.patch(`/api/${storeId}/sizes/${sizeId}`, size);
    return response.data;
  } catch (error) {
    throw error;
  }
};
