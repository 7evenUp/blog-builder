import { useRouter } from 'next/router'
import React from 'react'
import { supabase } from '../../utils/supabaseClient'

const Post = ({ post }) => {
  const router = useRouter()
  const { id } = router.query
  return (
    <div>Post: { id }</div>
  )
}

export async function getStaticPaths() {
  const { data, error } = await supabase
    .from('posts')
    .select('id')

  if (error) return { paths: [], fallback: false}

  const paths = data?.map(post => ({ params: { id: post.id } }))

  console.log(data)
  console.log('PATHS: ', paths)

  return { paths, fallback: false }
}

export async function getStaticProps(context) {
  return {
    props: { post: {} }
  }
}

export default Post