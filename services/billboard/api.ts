import axios from "axios";
import { z } from "zod";

import { billboardSchema } from "@/schemas";

export const deleteBillboard = async (req: {
  storeId: string;
  billboardId: string;
}) => {
  try {
    const { storeId, billboardId } = req;
    const response = await axios.delete(
      `/api/${storeId}/billboards/${billboardId}`,
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
    const { storeId, ...rest } = req;
    const response = await axios.post(`/api/${storeId}/billboards`, rest);
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
    const { storeId, billboardId, ...rest } = req;
    const response = await axios.patch(
      `/api/${storeId}/billboards/${billboardId}`,
      rest,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
