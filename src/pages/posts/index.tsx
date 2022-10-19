import { NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { PostType } from "../../supabase/database.types";
import { getPosts, PostsResponseError, PostsResponseSuccess } from "../../supabase/getPosts";
import { supabase } from "../../supabase/supabaseClient";

interface Props{}

const Posts: NextPage<Props> = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      const { data, error }: { data: PostsResponseSuccess, error: PostsResponseError } = await getPosts()

      if (error) console.error(error);

      if (data !== null) setPosts(data);
      console.log(data);
    };
    loadPosts();
  }, []);
  // const {data, error} = useSWR('/api/staticdata', fetcher)
  // const [parsedData, setParsedData] = useState<PostsDataType>([])

  // useEffect(() => {
  //   if (data) {
  //     console.log("1: ", parseData(data))
  //     setParsedData(parseData(data))
  //     console.log('2: ', parsedData)
  //   }
  // }, [data])

  return (
    <div className="flex flex-col items-center gap-8 bg-slate-200 min-h-screen w-3/5 mx-auto">
      <h1 className="text-5xl">Posts</h1>
      <div className="w-full">
        <div className="w-full">
          <div className="flex gap-4 flex-wrap">
            {posts.map((post) => (
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
                <Link href={`/posts/${post.id}`}>
                  <a>Read post</a>
                </Link>
              </div>
            ))}
          </div>
          {/* {error && <span>Failed to load</span>}
          {!data ? <span>Loading...</span> : (
            <div className="flex flex-col gap-1 border rounded-lg w-full">
              {parsedData.map(renderData)}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Posts;
