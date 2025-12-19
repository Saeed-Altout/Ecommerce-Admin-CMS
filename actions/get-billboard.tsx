"use server";

import axios from "axios";
import { Billboard } from "@/types";

const URL = process.env.NEXT_PUBLIC_API_URL;

export async function getBillboard(id: string): Promise<Billboard | null> {
  try {
    const res = await axios.get(`${URL}/billboards/${id}`);
    return res.data;
  } catch {
    return null;
  }
}
