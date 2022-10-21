import { supabase } from "./supabaseClient";

export const createPost = async (heading: string) => {
  return await supabase
    .from("posts")
    .insert([{ heading }])
    .select("id")
    .single();
};

type CreatedPostResponse = Awaited<ReturnType<typeof createPost>>;
export type CreatedPostResponseSuccess = CreatedPostResponse["data"];
export type CreatedPostResponseError = CreatedPostResponse["error"];
