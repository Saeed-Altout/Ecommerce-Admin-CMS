import axios from "axios";
import { z } from "zod";

import { DeleteColorRequest } from "./type";
import { colorSchema } from "@/schemas";

export const deleteColor = async (req: DeleteColorRequest) => {
  try {
    const response = await axios.delete(
      `/api/${req.storeId}/colors/${req.colorId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createColor = async (
  req: z.infer<typeof colorSchema> & { storeId: string },
) => {
  try {
    const { storeId, ...color } = req;
    const response = await axios.post(`/api/${storeId}/colors`, color);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateColor = async (
  req: z.infer<typeof colorSchema> & {
    storeId: string;
    colorId: string;
  },
) => {
  try {
    const { storeId, colorId, ...color } = req;
    const response = await axios.patch(
      `/api/${storeId}/colors/${colorId}`,
      color,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
