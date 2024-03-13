import React from 'react'
import { useAtomValue } from 'jotai'
import { progressAtom } from '../atoms'

function Progress() {
  const progress = useAtomValue(progressAtom)
  return (
    <>
      <span className='my-1 flex w-full justify-center'>Progress: {progress}</span>
      <div className=' h-6 mb-2 w-full bg-bg-tertiary'>
        <div className='h-6 bg-accent-bright' style={{ width: progress }}></div>
      </div>
    </>
  )
}

export default Progress
