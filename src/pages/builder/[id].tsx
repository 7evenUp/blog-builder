import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  getPostById,
  PostResponseError,
  PostResponseSuccess,
} from "../../supabase/getPostById";
import {
  getPosts,
  PostsResponseError,
  PostsResponseSuccess,
} from "../../supabase/getPosts";
import {
  publishPost,
  PublishPostResponseError,
  PublishPostResponseSuccess,
} from "../../supabase/publishPost";
import { supabase } from "../../supabase/supabaseClient";
import Editor from "./Editor";

// TODO

const Post = ({ post }: {post: PostResponseSuccess}) => {
  if (post === null) return null

  const [heading, setHeading] = useState(post.heading || "");
  const [desc, setDesc] = useState(post.desc || "");
  const [editorState, setEditorState] = useState();

  useEffect(() => {
    console.log("POST in client: ", post);
  }, []);

  return (
    <main className="container mx-auto flex flex-col items-center min-h-screen p-4 gap-8">
      <div className="editor-shell">
        <Editor state={editorState} setState={setEditorState} />
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <label>Heading</label>
          <input
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.currentTarget.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.currentTarget.value)}
          />
        </div>
        <button
          type="button"
          className="border rounded py-1 px-2 bg-slate-100"
          onClick={async () => {
            console.log("EDITOR STATE: ", editorState);
            // const {
            //   data,
            //   error,
            // }: {
            //   data: PublishPostResponseSuccess;
            //   error: PublishPostResponseError;
            // } = publishPost({ ...post, post_data: editorState });

            const { data, error } = await supabase
              .from('posts')
              .update({
                heading,
                desc,
                published: true,
                post_data: editorState,
                updated_at: new Date(Date.now()).toISOString()
              })
              .eq('id', post.id)

            console.log(data);
          }}
        >
          Publish
        </button>
      </div>
    </main>
  );
};

export async function getStaticPaths() {
  const {
    data,
    error,
  }: {
    data: PostsResponseSuccess;
    error: PostsResponseError
  } = await getPosts();

  if (error) return { paths: [], fallback: false };

  const paths = data?.map((post) => ({ params: { id: `${post.id}` } }));

  return { paths, fallback: false };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  if (typeof context.params?.id === "string") {
    const {
      data,
      error,
    }: { data: PostResponseSuccess; error: PostResponseError } =
      await getPostById(context.params.id);

    return {
      props: { post: data },
    };
  }
}

export default Post;
