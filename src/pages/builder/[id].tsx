import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabaseClient'
import Editor from './Editor'

const Post = ({ post }) => {
  const [heading, setHeading] = useState(post.heading)
  const [desc, setDesc] = useState(post.desc || '')
  const [editorState, setEditorState] = useState()
  const router = useRouter()

  useEffect(() => {
    console.log('POST in client: ', post)
  }, [])

  const { id } = router.query

  return (
    <main className="container mx-auto flex flex-col items-center min-h-screen p-4 gap-8">
      <div className="editor-shell">
        <Editor state={editorState} setState={setEditorState} />
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <label>Heading</label>
          <input type="text" value={heading} onChange={(e) => setHeading(e.currentTarget.value)} />
        </div>
        <div>
          <label>Description</label>
          <input type="text" value={desc} onChange={(e) => setDesc(e.currentTarget.value)} />
        </div>
        <button
          type='button'
          className='border rounded py-1 px-2 bg-slate-100'
          onClick={async () => {
            console.log('EDITOR STATE: ', editorState)
            const { data, error } = await supabase
              .from('posts')
              .update({
                heading,
                desc,
                published: true,
                post_data: editorState,
                updated_at: new Date(Date.now()).toISOString()
              })
              .eq('id', post.id)

            console.log(data)
          }}
        >
          Publish
        </button>
      </div>
    </main>
  )
}

export async function getStaticPaths() {
  const { data, error } = await supabase
    .from('posts')
    .select('id')

  if (error) return { paths: [], fallback: false}

  const paths = data?.map(post => ({ params: { id: `${post.id}` } }))

  console.log(data)

  return { paths, fallback: false }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', context.params.id)
    .single()

  return {
    props: { post }
  }
}

export default Post