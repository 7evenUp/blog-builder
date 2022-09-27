import {
  GetServerSideProps,
  NextPage,
  NextApiRequest,
  NextApiResponse,
} from "next";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSWR from 'swr';
import { PostsData, PostStateData } from "./types";
import { parseData } from "./utils/parseData";

const fetcher = (url:string) => fetch(url).then((res) => res.json());

interface Props {}

const Posts: NextPage<Props> = () => {
  const {data, error} = useSWR('/api/staticdata', fetcher)
  const [parsedData, setParsedData] = useState<PostsData>([])

  useEffect(() => {
    if (data) {
      console.log("1: ", parseData(data))
      setParsedData(parseData(data))
      console.log('2: ', parsedData)
    }
  }, [data])

  return (
    <div className="flex flex-col items-center gap-8 bg-slate-200 min-h-screen">
      <h1 className="text-5xl">Posts</h1>
      <div className="w-full">
        <h2>Content goes here</h2>
        <div className="w-full">
          {error && <span>Failed to load</span>}
          {!data ? <span>Loading...</span> : (
            <div className="flex flex-col border rounded-lg w-full">
              {parsedData.map(renderData)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;

const renderData = (rootElement: PostStateData, key) => {
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
  else if (rootElement.type === 'paragraph') return renderParagraph(rootElement)
  // else if (rootElement.type === 'list') return renderList(rootElement)
  // else if (rootElement.type === 'quote') return renderList(rootElement)
  // else if (rootElement.type === 'code') return renderList(rootElement)
  else if (rootElement.type === 'horizontalrule') return <div className="h-1 w-full bg-slate-700"></div>
  else return <span>Not heading</span>
}

const renderParagraph = (rootElement: PostStateData) => {
  if (rootElement.direction === null) return renderImage(rootElement)
  else if (rootElement.format === "left") return <p className="text-left">{rootElement.children.map(renderParagraphChildren)}</p>
  else if (rootElement.format === "center") return <p className="text-center">{rootElement.children.map(renderParagraphChildren)}</p>
  else if (rootElement.format === "right") return <p className="text-right">{rootElement.children.map(renderParagraphChildren)}</p>
  return <p>{rootElement.children.map(renderParagraphChildren)}</p>
}

const renderParagraphChildren = ((textEl, key) => {
  if (textEl.format === 0) return <React.Fragment>{textEl.text}</React.Fragment>
  else if (textEl.format === 1) return <b>{textEl.text}</b>
  else if (textEl.format === 2) return <i>{textEl.text}</i>
  else if (textEl.format === 4) return <span className="line-through">{textEl.text}</span>
  else if (textEl.format === 8) return <span className="underline">{textEl.text}</span>
  else if (textEl.format === 32) return <sub>{textEl.text}</sub>
  else if (textEl.format === 64) return <sup>{textEl.text}</sup>
})

const renderImage = (rootElement) => {
  return <Image src={rootElement.children[0].src} alt={rootElement.children[0].atlText} width={500} height={300}/>
}

const renderList = (rootElement) => {
  return <ul><li>1</li></ul>
}
