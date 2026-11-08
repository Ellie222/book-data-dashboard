import { createClient } from "@supabase/supabase-js";
import { cacheLife } from "next/cache";
import type { Book } from "./types";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export async function getBooks(): Promise<Book[]> {
  "use cache";
  cacheLife("minutes"); // 몇 분 단위로 재검증

  if (!url || !key) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY 가 설정되지 않았습니다.");
  }
  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { data, error } = await supabase
    .from("books")
    .select("id, title, price, rating, detail_url")
    .order("id");
  if (error) throw new Error(`books 조회 실패: ${error.message}`);
  return (data ?? []).map((r) => ({
    id: r.id,
    title: r.title,
    price: Number(r.price),
    rating: r.rating,
    detailUrl: r.detail_url,
  }));
}
