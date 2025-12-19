"use server";

import { Size } from "@/types";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL;

export async function getSizes(): Promise<Size[]> {
  try {
    const res = await axios.get(`${URL}/sizes`);
    return res.data;
  } catch {
    return [];
  }
}
