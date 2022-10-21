import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createPost } from "../../supabase/createPost";
import { getPosts, PostsResponseSuccess } from "../../supabase/getPosts";
import { supabase } from "../../supabase/supabaseClient";

// TODO

interface Props {}

const Builder: NextPage<Props> = ({}) => {
  const [posts, setPosts] = useState<PostsResponseSuccess>([]);
  const router = useRouter();

  useEffect(() => {
    const loadPosts = async () => {
      const { data, error } = await getPosts();

      if (error) console.error(error);

      if (posts !== null) setPosts(data);
      console.log(posts);
    };
    loadPosts();
  }, []);

  const savePost = () => {
    console.log("Saved");
  };

  const uploadPost = () => {
    console.log("Uploaded");
  };

  const handleNewPostClick = async () => {
    const { data, error } = await createPost("New Post1")

    if (error) console.error(error);

    if (data) router.push(`/builder/${data.id}`);
  };

  return (
    <main className="container mx-auto flex flex-col items-center min-h-screen p-4 gap-8">
      <h1 className="text-5xl text-gray-700 font-medium">Builder</h1>

      <span className="text-lg text-slate-600">
        Create new post or edit existed one
      </span>

      <button
        className="border rounded-md text-lg py-1 px-3 hover:bg-cyan-600 duration-200 hover:text-white"
        onClick={handleNewPostClick}
      >
        New Post
      </button>

      <div className="flex gap-4 flex-wrap">
        {posts &&
          posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col gap-2 border rounded p-4 border-slate-300"
            >
              {post.published && (
                <span className="text-xs text-slate-400">published</span>
              )}
              <h3 className="text-lg font-medium">{post.heading}</h3>
              <span className="text-slate-600 text-sm">
                {new Date(post.created_at).toLocaleDateString()}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(`/builder/${post.id}`);
                  }}
                  className="rounded border bg-slate-50 py-1 px-2"
                >
                  edit
                </button>
                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    const { data, error } = await supabase
                      .from("posts")
                      .delete()
                      .eq("id", post.id);

                    if (error) console.error(error);

                    console.log("DELETED DATA: ", data);
                  }}
                  className="rounded border bg-slate-50 py-1 px-2"
                >
                  delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
};

export default Builder;
