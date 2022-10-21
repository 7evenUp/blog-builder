import { supabase } from "./supabaseClient";

export const deletePost = async (id: number) => {
  return await supabase.from("posts").delete().eq("id", id);
};

type DeletedPostResponse = Awaited<ReturnType<typeof deletePost>>;
export type DeletedPostResponseSuccess = DeletedPostResponse["data"];
export type DeletedPostResponseError = DeletedPostResponse["error"];
