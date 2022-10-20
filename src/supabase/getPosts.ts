import { supabase } from "./supabaseClient"

export const getPosts = async () => {
  return await supabase.from('posts').select('*')
}

type PostsResponse = Awaited<ReturnType<typeof getPosts>>
export type PostsResponseSuccess = PostsResponse['data']
export type PostsResponseError = PostsResponse['error']