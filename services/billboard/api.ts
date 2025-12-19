import axios from "axios";
import { z } from "zod";

import { DeleteBillboardRequest } from "./type";
import { billboardSchema } from "@/schemas";

export const deleteBillboard = async (req: DeleteBillboardRequest) => {
  try {
    const response = await axios.delete(
      `/api/${req.storeId}/billboards/${req.billboardId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createBillboard = async (
  req: z.infer<typeof billboardSchema> & { storeId: string },
) => {
  try {
    const { storeId, ...billboard } = req;
    const response = await axios.post(`/api/${storeId}/billboards`, billboard);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBillboard = async (
  req: z.infer<typeof billboardSchema> & {
    storeId: string;
    billboardId: string;
  },
) => {
  try {
    const { storeId, billboardId, ...billboard } = req;
    const response = await axios.patch(
      `/api/${storeId}/billboards/${billboardId}`,
      billboard,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
