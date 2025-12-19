import axios from "axios";
import { Category } from "@/types";

const URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/b6ae0098-aa2f-436d-a03a-2fb0cc9a867c/categories`
    );
    return res.data;
  } catch {
    return [];
  }
}
