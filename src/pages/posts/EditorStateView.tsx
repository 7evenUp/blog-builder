import React from "react";
import Image from "next/image";
import {
  PostParagraphType,
  PostDataType,
  PostImageType,
  TextNodeType,
  PostListType,
} from "./types";
import { Json } from "../../supabase/database.types";

const EditorStateView = ({ data }: { data: Json }) => {
  if (!data) return null;

  return (
    <div className="flex flex-col gap-1 border rounded-lg w-full">
      {
        // @ts-ignore
        JSON.parse(data).root.children.map(renderData)
      }
    </div>
  );
};

export default EditorStateView;

const renderData = (rootElement: PostDataType, key: number) => {
  if (rootElement.type === "heading") {
    if (rootElement.tag === "h1")
      return <h1 className="text-2xl">{rootElement.children[0]?.text}</h1>;
    else if (rootElement.tag === "h2")
      return <h2 className="text-xl">{rootElement.children[0]?.text}</h2>;
    else if (rootElement.tag === "h3")
      return <h3 className="text-lg">{rootElement.children[0]?.text}</h3>;
  } else if (rootElement.type === "paragraph")
    return renderParagraph(rootElement);
  else if (rootElement.type === "list") return renderList(rootElement);
  else if (rootElement.type === "quote") return renderBlockquote(rootElement);
  else if (rootElement.type === "code") return renderCode(rootElement);
  else if (rootElement.type === "horizontalrule")
    return <div className="w-full h-px my-8 bg-slate-400"></div>;
  else return <span>Not heading</span>;
};

const renderParagraph = (rootElement: PostDataType) => {
  if (rootElement.direction === null)
    return renderImage(rootElement.children[0]);
  else if (rootElement.format === "left")
    return (
      <p className="text-left">
        {rootElement.children.map(renderParagraphChildren)}
      </p>
    );
  else if (rootElement.format === "center")
    return (
      <p className="text-center">
        {rootElement.children.map(renderParagraphChildren)}
      </p>
    );
  else if (rootElement.format === "right")
    return (
      <p className="text-right">
        {rootElement.children.map(renderParagraphChildren)}
      </p>
    );
  return <p>{rootElement.children.map(renderParagraphChildren)}</p>;
};

const renderParagraphChildren = (
  textEl: PostParagraphType & TextNodeType,
  key: number
) => {
  if (textEl.type === "linebreak") return <br />;
  else if (textEl.type === "link")
    return (
      <a
        className="underline underline-offset-2 text-cyan-500"
        href={textEl.url}
        target="_blank"
        rel="noopener"
      >
        {textEl.children[0].text}
      </a>
    );
  else if (textEl.type === "text") return renderTextNode(textEl);
};

const renderTextNode = (textNode: TextNodeType) => {
  if (textNode.format === 0)
    return <React.Fragment>{textNode.text}</React.Fragment>;
  else if (textNode.format === 1) return <b>{textNode.text}</b>;
  else if (textNode.format === 2) return <i>{textNode.text}</i>;
  else if (textNode.format === 4)
    return <span className="line-through">{textNode.text}</span>;
  else if (textNode.format === 8)
    return <span className="underline">{textNode.text}</span>;
  else if (textNode.format === 32) return <sub>{textNode.text}</sub>;
  else if (textNode.format === 64) return <sup>{textNode.text}</sup>;
};

const renderImage = (imageElement: PostImageType) => {
  return (
    <Image
      className="my-8"
      src={imageElement.src}
      alt={imageElement.altText}
      width={500}
      height={300}
      objectFit="cover"
      layout="responsive"
    />
  );
};

const renderList = (rootElement: PostListType) => {
  if (rootElement.listType === "bullet") {
    return (
      <ul className="list-disc list-inside ml-4">
        {rootElement.children.map((el, key) => {
          return <li>{el.children?.map(renderParagraphChildren)}</li>;
        })}
      </ul>
    );
  } else if (rootElement.listType === "number") {
    return (
      <ol className="list-decimal list-inside ml-4">
        {rootElement.children.map((el, key) => {
          return <li>{el.children?.map(renderParagraphChildren)}</li>;
        })}
      </ol>
    );
  } else if (rootElement.listType === "check") {
    return (
      <div>
        {rootElement.children.map((el, key) => (
          <div className="flex gap-2 items-center">
            <span
              className={`border rounded w-5 h-5 block ${
                el.checked ? "border-cyan-400" : "border-slate-400"
              }`}
            />
            {el.children?.map(renderParagraphChildren)}
          </div>
        ))}
      </div>
    );
  }
};

const renderBlockquote = (rootElement) => {
  return (
    <div className="border-l border-slate-700 bg-slate-300 ml-4 pl-2">
      {rootElement.children.map(renderParagraphChildren)}
    </div>
  );
};

const renderCode = (rootElement) => {
  return (
    <pre>
      {rootElement.children.map((el, key) => {
        if (el.type === "linebreak") return <br />;
        else if (el.type === "code-highlight") {
          if (el.highlightType) {
            if (el.highlightType === "keyword")
              return <span className="text-red-400">{el.text}</span>;
            else if (el.highlightType === "operator")
              return <span className="text-orange-400">{el.text}</span>;
            else if (el.highlightType === "string")
              return <span className="text-green-400">{el.text}</span>;
            else if (el.highlightType === "punctuation")
              return <span className="text-green-400">{el.text}</span>;
            else if (el.highlightType === "constant")
              return <span className="text-amber-300">{el.text}</span>;
            else if (el.highlightType === "function-variable")
              return <span className="text-purple-200">{el.text}</span>;
          } else {
            return el.text;
          }
        }
      })}
    </pre>
  );
};
