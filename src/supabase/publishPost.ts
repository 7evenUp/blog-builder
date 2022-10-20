import { PostType } from "./database.types"
import { supabase } from "./supabaseClient"

export const publishPost = async (post: PostType) => {
  return await supabase
                .from('posts')
                .update({
                  ...post,
                  published: true,
                  updated_at: new Date(Date.now()).toISOString()
                })
                .eq('id', post.id)
}

type PublishPostResponse = Awaited<ReturnType<typeof publishPost>>
export type PublishPostResponseSuccess = PublishPostResponse['data']
export type PublishPostResponseError = PublishPostResponse['error']