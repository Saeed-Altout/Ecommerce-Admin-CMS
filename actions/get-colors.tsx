"use server";

import axios from "axios";
import { Color } from "@/types";

const URL = process.env.NEXT_PUBLIC_API_URL;

export async function getColors(): Promise<Color[]> {
  try {
    const res = await axios.get(`${URL}/colors`);
    return res.data;
  } catch {
    return [];
  }
}
