import { NextPage } from 'next'
import { supabase } from '../../utils/supabaseClient'
import Editor from './Editor'

interface Props {}

const Builder: NextPage<Props> = ({}) => {
  const savePost = () => {
    console.log('Saved')
  }

  const uploadPost = () => {
    console.log('Uploaded')
  }

  const createPost = async () => {
    console.log('Creating!')
    
    const { data, error } = await supabase
      .from('posts')
      .insert([
        { heading: 'New Post1' },
      ])
      .select('id')
      .single()
    if (error) console.error(error)
    console.log(data?.id)
  } 

  return (
    <main className="container mx-auto flex flex-col items-center min-h-screen p-4 gap-8">
      <h1 className="text-5xl text-gray-700 font-medium">Builder</h1>

      <button
        className="border rounded-md text-lg py-1 px-3 hover:bg-cyan-600 duration-200 hover:text-white"
        onClick={(evt) => {
          evt.preventDefault()
          createPost()
        }}
      >
        New Post
      </button>

      <div className="editor-shell">
        <Editor />
      </div>

      {/* <div className="flex gap-2 self-end">
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
      </div> */}

      
    </main>
  )
}

export default Builder