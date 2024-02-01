import React, { useState } from 'react'

import { prompts } from './prePrompt'
import { useLocalStorage } from 'usehooks-ts'
import { cn } from './utils'
import HistoryModal from './HistoryModal'

function Gallery({ setCaption, setGenerated, generated, setImageStyle }) {
  const [history, setHistory] = useLocalStorage('history', [])
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <p onClick={() => setIsOpen(!isOpen)} className='mt-2 mb-3 mx-auto sm:w-max text-center border-b border-b-border text-txt-primary cursor-pointer'>
        History
      </p>
      <div className='flex m-auto bg-bg-secondary relative max-w-[600px] border border-border py-2 mb-4 overflow-x-scroll'>
        <HistoryModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setCaption={setCaption}
          setGenerated={setGenerated}
          generated={generated}
          setImageStyle={setImageStyle}
        />
        <div className={cn('flex gap-3 px-2')}>
          {history.length > 0 ? (
            history.map((item, i) => {
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
            })
          ) : (
            <div className='overflow-visible flex flex-col items-center w-12 sm:w-20 h-full'>
              <p className='text-xs text-wrap'>You don't have any previous designs yet</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Gallery
