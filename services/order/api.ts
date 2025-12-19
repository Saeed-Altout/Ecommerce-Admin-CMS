import axios from "axios";
import { z } from "zod";

import { DeleteOrderRequest } from "./type";
import { orderSchema } from "@/schemas";

export const deleteOrder = async (req: DeleteOrderRequest) => {
  try {
    const response = await axios.delete(
      `/api/${req.storeId}/orders/${req.orderId}`,
    );
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
