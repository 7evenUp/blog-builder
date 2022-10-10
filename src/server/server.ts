import { initTRPC } from '@trpc/server'
import { z } from 'zod'

const t = initTRPC.create()

interface Post {
  id: number
  heading: string
}

const postList: Post[] = [
  {
    id: 1,
    heading: 'My first post'
  }
]

const appRouter = t.router({
  postById: t.procedure
    .input((val: unknown) => {
      if (typeof val === 'number') return val;
      throw new Error(`Invalid input: ${typeof val}`)
    })
    .query((req) => {
      const { input } = req
      const post = postList.find((u) => u.id === input)
      return post
    }),
  postCreate: t.procedure
    .input(z.object({ heading: z.string()}))
    .mutation((req) => {
      const id = Math.floor(Math.random() * 100)
      const post: Post = {
        id,
        heading: req.input.heading
      }
      postList.push(post)
      return post
    })
})

export type appRouter = typeof appRouter