import { GetStaticPropsContext } from "next";
import React from "react";
import {
  getPostById,
  PostResponseError,
  PostResponseSuccess,
} from "../../supabase/getPostById";
import { getPublishedPosts } from "../../supabase/getPublishedPosts";

import EditorStateView from "./EditorStateView";

const Post = ({
  post,
  error,
}: {
  post: PostResponseSuccess;
  error: PostResponseError;
}) => {
  if (!post) return null;
  if (error) return <h2 className="text-red-500 text-5xl">ERROR: {error.message}</h2>;

  return (
    <main className="container mx-auto flex flex-col items-center min-h-screen p-4 gap-8">
      <div className="flex items-end gap-6">
        <h2 className="text-4xl">{post.heading}</h2>
        <span className="text-sm text-slate-500">
          {new Date(post.created_at).toLocaleDateString()}
        </span>
      </div>

      <span>{post.desc}</span>
      <span>Here goes post</span>
      <EditorStateView data={post.post_data} />
    </main>
  );
};

export async function getStaticPaths() {
  const { data, error } = await getPublishedPosts();

  if (error) return { paths: [], fallback: false };

  const paths = data?.map((post) => ({ params: { id: `${post.id}` } }));

  return { paths, fallback: false };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  if (typeof context.params?.id === "string") {
    const { data, error } = await getPostById(context.params.id);

    return {
      props: { post: data, error },
    };
  }
}

export default Post;
