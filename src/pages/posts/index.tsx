import {
  GetServerSideProps,
  NextPage,
  NextApiRequest,
  NextApiResponse,
} from "next";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSWR from 'swr';
import { PostParagraphType, PostsDataType, PostDataType, PostImageType, PostListType } from "./types";
import { parseData } from "./utils/parseData";

const fetcher = (url:string) => fetch(url).then((res) => res.json());

interface Props {}

const Posts: NextPage<Props> = () => {
  const {data, error} = useSWR('/api/staticdata', fetcher)
  const [parsedData, setParsedData] = useState<PostsDataType>([])

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
            <div className="flex flex-col gap-1 border rounded-lg w-full">
              {parsedData.map(renderData)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;

const renderData = (rootElement: PostDataType, key: number) => {
  if (rootElement.type === 'heading') {
    switch (rootElement.tag) {
      case 'h1':
        return <h1 className="text-2xl">{rootElement.children[0]?.text}</h1>

      case 'h2':
        return <h2 className="text-xl">{rootElement.children[0]?.text}</h2>

      case 'h3':
        return <h3 className="text-lg">{rootElement.children[0]?.text}</h3>
    
      default:
        break;
    }
  }
  else if (rootElement.type === 'paragraph') return renderParagraph(rootElement)
  else if (rootElement.type === 'list') return renderList(rootElement)
  else if (rootElement.type === 'quote') return renderBlockquote(rootElement)
  else if (rootElement.type === 'code') return renderCode(rootElement)
  else if (rootElement.type === 'horizontalrule') return <div className="h-1 w-full bg-slate-700"></div>
  else return <span>Not heading</span>
}

const renderParagraph = (rootElement: PostDataType) => {
  if (rootElement.direction === null) return renderImage(rootElement.children[0])
  else if (rootElement.format === "left") return <p className="text-left">{rootElement.children.map(renderParagraphChildren)}</p>
  else if (rootElement.format === "center") return <p className="text-center">{rootElement.children.map(renderParagraphChildren)}</p>
  else if (rootElement.format === "right") return <p className="text-right">{rootElement.children.map(renderParagraphChildren)}</p>
  return <p>{rootElement.children.map(renderParagraphChildren)}</p>
}

const renderParagraphChildren = ((textEl: PostParagraphType, key: number) => {
  if (textEl.format === 0) return <React.Fragment>{textEl.text}</React.Fragment>
  else if (textEl.format === 1) return <b>{textEl.text}</b>
  else if (textEl.format === 2) return <i>{textEl.text}</i>
  else if (textEl.format === 4) return <span className="line-through">{textEl.text}</span>
  else if (textEl.format === 8) return <span className="underline">{textEl.text}</span>
  else if (textEl.format === 32) return <sub>{textEl.text}</sub>
  else if (textEl.format === 64) return <sup>{textEl.text}</sup>
})

const renderImage = (imageElement: PostImageType) => {
  return <Image src={imageElement.src} alt={imageElement.altText} width={500} height={300}/>
}

const renderList = (rootElement: PostDataType) => {
  if (rootElement.listType === 'bullet') {
    return (
      <ul>
        {rootElement.children.map((el, key) => {
          return <li>{el.children.map(renderParagraphChildren)}</li>
        })}
      </ul>
    )
  }
  else if (rootElement.listType === 'number') {
    return (
      <ol>
        {rootElement.children.map((el, key) => {
          return <li>{el.children?.map(renderParagraphChildren)}</li>
        })}
      </ol>
    )
  }
  else if (rootElement.listType === 'check') {
    return (
      <div>
        {rootElement.children.map((el, key) => {
          if (el.checked) {
            return (
              <div className="flex gap-2 items-center">
                <span className="border rounded w-5 h-5 border-cyan-400 block"/>
                {el.children?.map(renderParagraphChildren)}
              </div>
            )
          }
          else {
            return (
              <div className="flex gap-2 items-center">
                <span className="border rounded w-5 h-5 border-slate-400 block"/>
                {el.children?.map(renderParagraphChildren)}
              </div>
            )
          }
        })}
      </div>
    )
  }
}

const renderBlockquote = (rootElement) => {
  return (
    <div className="border-l border-slate-700 bg-slate-300 ml-4 pl-2">
      {rootElement.children.map(renderParagraphChildren)}
    </div>
  )
}

const renderCode = (rootElement) => {
  return (
    <pre>
      {rootElement.children.map((el, key) => {
        if (el.highlightType) {
          if (el.highlightType === "keyword") return <span className="text-red-400">{el.text}</span>
          else if (el.highlightType === "operator") return <span className="text-orange-400">{el.text}</span>
          else if (el.highlightType === "string") return <span className="text-green-400">{el.text}</span>
        }
        else {
          return el.text
        }
      })}
    </pre>
  )
}
