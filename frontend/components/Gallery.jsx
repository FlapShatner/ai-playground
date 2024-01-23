import React from 'react'
import { useLocalStorage } from 'usehooks-ts'

function Gallery({ setCaption, setGenerated }) {
  const [history, setHistory] = useLocalStorage('history', [])
  return (
    <div className='flex flex-col px-2 m-2 bg-bg-secondary'>
      <p className='mt-2 mb-3 mx-auto sm:w-max text-center border-b border-b-border text-txt-primary'>History</p>
      <div className='flex flex-col gap-3'>
        {history.map((item, i) => {
          const handleClick = () => {
            setGenerated(item.url)
            setCaption(item.prompt)
          }
          return (
            <div onClick={handleClick} className='flex flex-col items-center cursor-pointer' key={i}>
              <img className='w-12 h-12 sm:w-20 sm:h-20 object-cover  border border-border hover:border-accent' src={item.url} />
              <p className='text-center text-txt-primary text-xs w-14 sm:w-20 text-ellipsis overflow-hidden whitespace-nowrap'>{item.prompt}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Gallery
