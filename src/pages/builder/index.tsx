import { NextPage } from 'next'
import Editor from './newEditor'

interface Props {}

const Builder: NextPage<Props> = ({}) => {
  

  return (
    <main className="container mx-auto flex flex-col items-center justify-between min-h-screen p-4 gap-8">
      <h1 className="text-5xl text-gray-700 font-medium">Builder</h1>

      <Editor />

      

      
    </main>
  )
}

export default Builder