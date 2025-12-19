"use server";

import axios from "axios";
import { Category } from "@/types";

const URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCategory(id: string): Promise<Category | null> {
  try {
    const res = await axios.get(`${URL}/categories/${id}`);
    return res.data;
  } catch {
    return null;
  }
}
