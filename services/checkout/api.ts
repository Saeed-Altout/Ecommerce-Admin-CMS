import axios from "axios";

export const checkout = async (productIds: string[]) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
      { productIds },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
