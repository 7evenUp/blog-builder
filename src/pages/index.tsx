import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
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

        <div className="text-xl text-cyan-600 flex gap-6 mt-8">
          <MyLink href="/posts" title="Posts" />
          <MyLink href="/builder" title="Builder" />
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
      <a className="border rounded p-2 hover:bg-gray-700 transition-all duration-200">{title}</a>
    </Link>
  )
}
