import { GetStaticPropsContext } from "next";
import React, { useEffect, useState } from "react";
import { getPostById, PostResponseSuccess } from "../../supabase/getPostById";
import { getPosts } from "../../supabase/getPosts";
import { publishPost } from "../../supabase/publishPost";
import Editor from "./Editor";

const Post = ({ post }: { post: PostResponseSuccess }) => {
  if (post === null) return null;

  const [heading, setHeading] = useState(post.heading || "");
  const [desc, setDesc] = useState(post.desc || "");
  const [editorState, setEditorState] = useState(null);

  useEffect(() => {
    console.log("POST in client: ", post);
  }, []);

  const handleButtonClick = async () => {
    console.log("EDITOR STATE: ", editorState);
    const { data, error } = await publishPost({
      ...post,
      post_data: editorState,
      published: true,
      updated_at: new Date(Date.now()).toISOString(),
    });

    console.log(data);
  };

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
          onClick={handleButtonClick}
        >
          Publish
        </button>
      </div>
    </main>
  );
};

export async function getStaticPaths() {
  const { data, error } = await getPosts();

  if (error) return { paths: [], fallback: false };

  const paths = data?.map((post) => ({ params: { id: `${post.id}` } }));

  return { paths, fallback: false };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  if (typeof context.params?.id === "string") {
    const { data, error } = await getPostById(context.params.id);

    return {
      props: { post: data },
    };
  }
}

export default Post;
