"use server";

import axios from "axios";
import { Product } from "@/types";

const URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await axios.get(`${URL}/products/${id}`);
    return res.data;
  } catch {
    return null;
  }
}
