import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { supabase } from '../../utils/supabaseClient'
import Editor from './Editor'

const Post = ({ post }) => {
  const router = useRouter()
  console.log('POST in client: ', post)
  const { id } = router.query
  return (
    <main className="container mx-auto flex flex-col items-center min-h-screen p-4 gap-8">
      <div className="editor-shell">
        <Editor />
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

  return {
    props: { post }
  }
}

export default Post