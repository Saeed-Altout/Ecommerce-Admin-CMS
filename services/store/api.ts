import axios from "axios";
import { z } from "zod";

import { storeSchema } from "@/schemas";

export const deleteStore = async (req: { storeId: string }) => {
  try {
    const { storeId } = req;
    const response = await axios.delete(`/api/stores/${storeId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateStore = async (
  req: z.infer<typeof storeSchema> & {
    storeId: string;
  },
) => {
  try {
    const { storeId, ...rest } = req;
    const response = await axios.patch(`/api/stores/${storeId}`, rest);
    return response.data;
  } catch (error) {
    throw error;
  }
};
