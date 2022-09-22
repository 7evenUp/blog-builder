import {
  GetServerSideProps,
  NextPage,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { useEffect } from "react";
import useSWR from 'swr';
import { parseData } from "./utils/parseData";

const fetcher = (url:string) => fetch(url).then((res) => res.json());

interface Props {}

const Posts: NextPage<Props> = () => {
  const {data, error} = useSWR('/api/staticdata', fetcher)
  let parsedData

  useEffect(() => {
    if (data) {
      parsedData = parseData(data)
      console.log(parsedData)
    }
  }, [data, parsedData])

  return (
    <div className="flex flex-col items-center gap-8 bg-slate-200 min-h-screen">
      <h1 className="text-5xl">Posts</h1>
      <div className="w-full">
        <h2>Content goes here</h2>
        <div className="w-full">
          {error && <span>Failed to load</span>}
          {!data ? <span>Loading...</span> : (
            <div className="flex flex-col border rounded-lg w-full">
              {/* {parsedData && parsedData[0].type === 'heading' && parsedData[0].tag === 'h1' && (
                <h1>abc{parsedData[0].children[0].text}</h1>
              )} */}
              {/* {parsedData && <h1>Data</h1>} */}
              {JSON.parse(data).root.children.map(renderData)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;

const renderData = (rootElement, key) => {
  if (rootElement.type === 'heading') {
    switch (rootElement.tag) {
      case 'h1':
        return <h1 className="text-2xl">{rootElement.children[0].text}</h1>

      case 'h2':
        return <h2 className="text-xl">{rootElement.children[0].text}</h2>

      case 'h3':
        return <h3 className="text-lg">{rootElement.children[0].text}</h3>
    
      default:
        break;
    }
  }
  else if (rootElement.type === 'paragraph') return <p>{rootElement.children.map(renderParagraph)}</p>
  else if (rootElement.type === 'horizontalrule') return <div className="h-1 w-full bg-slate-700"></div>
  else return <span>Not heading</span>
}

const renderParagraph = ((textEl, key) => {
  if (textEl.format === 0) return textEl.text
  else if (textEl.format === 1) return <b>{textEl.text}</b>
  else if (textEl.format === 2) return <i>{textEl.text}</i>
  else if (textEl.format === 4) return <span className="line-through">{textEl.text}</span>
  else if (textEl.format === 8) return <span className="underline">{textEl.text}</span>
  else if (textEl.format === 32) return <sub>{textEl.text}</sub>
  else if (textEl.format === 64) return <sup>{textEl.text}</sup>
  else if (textEl.format === "left") return <span className="text-left">{textEl.text}</span>
  else if (textEl.format === "center") return <span className="text-center">{textEl.text}</span>
  else if (textEl.format === "right") return <span className="text-right">{textEl.text}</span>
  // <sub>
  // <sup>
})
