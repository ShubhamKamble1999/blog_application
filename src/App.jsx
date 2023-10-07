import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const vite = import.meta.env
  const appwrite = vite.VITE_APPWRITE_URL

  return (
    <>
      <h1 className='bg-orange-500'>Blog application</h1>
      <h1 className='bg-orange-500'>{appwrite}</h1>
    </>
  )
}

export default App
