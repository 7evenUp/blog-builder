import { NextPage } from 'next'
import Editor from './Editor'

interface Props {}

const Builder: NextPage<Props> = ({}) => {
  const savePost = () => {
    console.log('Saved')
  }

  const uploadPost = () => {
    console.log('Uploaded')
  }

  return (
    <main className="container mx-auto flex flex-col items-center justify-between min-h-screen p-4 gap-8">
      <h1 className="text-5xl text-gray-700 font-medium">Builder</h1>

      <Editor />

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

      
    </main>
  )
}

export default Builder