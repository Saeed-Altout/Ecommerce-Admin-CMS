"use server";

import qs from "query-string";
import axios from "axios";
import { Product } from "@/types";

interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}

const URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProducts(query: Query): Promise<Product[]> {
  try {
    const res = await axios.get(`${URL}/products`, {
      params: qs.stringify(query, {
        skipNull: true,
      }),
    });
    return res.data;
  } catch {
    return [];
  }
}
