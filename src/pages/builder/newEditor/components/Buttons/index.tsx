import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import React from 'react'

export default function Buttons() {
  const [editor] = useLexicalComposerContext();

  const savePost = () => {
    console.log('Saved')
    console.log(editor.getEditorState())
  }

  const uploadPost = () => {
    console.log('Uploaded')
  }

  return (
    <div className="flex gap-2 self-end">
        <button
          className="border rounded-md text-lg py-1 px-3 hover:bg-cyan-600 duration-200 hover:text-white"
          onClick={savePost}
        >
          Save
        </button>
        <button
          className="border rounded-md text-lg py-1 px-3 hover:bg-cyan-600 duration-200 hover:text-white"
          onClick={uploadPost}
        >
          Post
        </button>
      </div>
  )
}
