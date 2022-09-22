import {
  GetServerSideProps,
  NextPage,
  NextApiRequest,
  NextApiResponse,
} from "next";
import useSWR from 'swr';

const fetcher = (url:string) => fetch(url).then((res) => res.json());

interface Props {}

const Posts: NextPage<Props> = () => {
  const {data, error} = useSWR('/api/staticdata', fetcher)

  if (data) console.log(JSON.parse(data))

  return (
    <div className="flex flex-col items-center gap-8 bg-slate-200 min-h-screen">
      <h1 className="text-5xl">Posts</h1>
      <div>
        <h2>Content goes here</h2>
        <div>
          {error && <span>Failed to load</span>}
          {!data ? <span>Loading...</span> : (
            <div>
              data
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;
