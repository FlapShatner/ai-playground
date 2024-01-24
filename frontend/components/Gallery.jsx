import React, { useState } from 'react'
import Chevron from './chevron'

import { prompts } from './prePrompt'
import { useLocalStorage } from 'usehooks-ts'
import { cn } from './utils'
import HistoryModal from './Modal'

function Gallery({ setCaption, setGenerated, generated, setImageStyle }) {
  const [history, setHistory] = useLocalStorage('history', [])
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      {history && history.length > 1 && (
        <div className='flex flex-col pl-1 m-2 bg-bg-secondary relative max-h-[70vh] border border-border'>
          <p onClick={() => setIsOpen(!isOpen)} className='mt-2 mb-3 mx-auto sm:w-max text-center border-b border-b-border text-txt-primary cursor-pointer'>
            History
          </p>
          <HistoryModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setCaption={setCaption}
            setGenerated={setGenerated}
            generated={generated}
            setImageStyle={setImageStyle}
          />
          <div className='flex flex-col gap-3  max-h-[70vh] overflow-y-scroll px-1'>
            {history.map((item, i) => {
              const isActive = item.url == generated
              const handleClick = () => {
                setGenerated(item.url)
                setCaption(item.prompt)
                const thisStyle = prompts.find((style) => style.id == item.style)
                if (!thisStyle) return
                setImageStyle(thisStyle)
              }
              return (
                <div onClick={handleClick} className='flex flex-col items-center cursor-pointer' key={i}>
                  <img
                    className={cn('w-12 h-12 sm:w-20 sm:h-20 object-cover  border border-border hover:border-accent', isActive && 'border-accent')}
                    src={item.url}
                  />
                  <p className='text-center text-txt-primary text-xs w-14 sm:w-20 text-ellipsis overflow-hidden whitespace-nowrap'>{item.prompt}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

export default Gallery
