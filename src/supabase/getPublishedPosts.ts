import { supabase } from "./supabaseClient"

export const getPublishedPosts = async () => {
  return await supabase.from('posts').select('*').eq('published', true);
}

type PublishedPostsResponse = Awaited<ReturnType<typeof getPublishedPosts>>
export type PublishedPostsResponseSuccess = PublishedPostsResponse['data']
export type PublishedPostsResponseError = PublishedPostsResponse['error']