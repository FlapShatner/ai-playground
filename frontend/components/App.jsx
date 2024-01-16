import { useState } from 'react'
import Form from './Form'
import Image from './Image'

export default function App({ home }) {
  const [generated, setGenerated] = useState(
    'https://images.unsplash.com/photo-1682686581663-179efad3cd2f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  )
  const [caption, setCaption] = useState('')
  return (
    <div className='p-8'>
      <h1 className='text-3xl text-center mb-6'>Generate a design with AI</h1>
      <div className='flex gap-4'>
        <Form setCaption={setCaption} setGenerated={setGenerated} />
        <Image caption={caption} generated={generated} />
      </div>
    </div>
  )
}
