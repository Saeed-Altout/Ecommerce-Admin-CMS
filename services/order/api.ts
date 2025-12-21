import axios from "axios";
import { z } from "zod";

import { orderSchema } from "@/schemas";

export const deleteOrder = async (req: {
  storeId: string;
  orderId: string;
}) => {
  try {
    const { storeId, orderId } = req;
    const response = await axios.delete(`/api/${storeId}/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (
  req: z.infer<typeof orderSchema> & { storeId: string },
) => {
  try {
    const { storeId, ...order } = req;
    const response = await axios.post(`/api/${storeId}/orders`, order);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateOrder = async (
  req: z.infer<typeof orderSchema> & {
    storeId: string;
    orderId: string;
  },
) => {
  try {
    const { storeId, orderId, ...order } = req;
    const response = await axios.patch(
      `/api/${storeId}/orders/${orderId}`,
      order,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
