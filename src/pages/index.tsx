import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from 'react'
import { supabase } from '../supabase/supabaseClient'
import Auth from '../components/Auth'
import Account from '../components/Account'
import { Session } from "@supabase/supabase-js";

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    let mounted = true

    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      // only update the react state if the component is still mounted
      if (mounted) {
        if (session) {
          setSession(session)
        }

        setIsLoading(false)
      }
    }

    getInitialSession()

    const { data } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )

    return () => {
      mounted = false

      data.subscription.unsubscribe()
    }
  }, [])

  return (
    <>
      <Head>
        <title>Blog builder</title>
        <meta name="description" content="Blog builder for ashel-blog.site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          Blog Builder for <span className="text-purple-300">Ashel-blog.site</span>
        </h1>

        <div className="text-xl flex gap-6 mt-8">
          {!session ? (
            <Auth />
          ) : (
            <>
              <Account key={session.user.id} session={session} />
              
            </>
          )}
          <div className="flex items-start gap-4">
            <MyLink href="/builder" title="Builder" />
            <MyLink href="/posts" title="Posts" />
          </div>
          
        </div>
      </main>
    </>
  );
};

export default Home

type MyLinkProps = {
  href: string,
  title: string
}

const MyLink = ({href, title}: MyLinkProps) => {
  return (
    <Link href={href}>
      <a className="border rounded p-2 bg-slate-300 hover:bg-gray-500 transition-all duration-200">{title}</a>
    </Link>
  )
}
