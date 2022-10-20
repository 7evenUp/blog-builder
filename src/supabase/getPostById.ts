import { supabase } from "./supabaseClient";

export const getPostById = async (id: string) => {
  return await supabase.from("posts").select("*").eq("id", id).single();
};

type PostResponse = Awaited<ReturnType<typeof getPostById>>;
export type PostResponseSuccess = PostResponse["data"];
export type PostResponseError = PostResponse["error"];
