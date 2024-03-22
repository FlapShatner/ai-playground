import React from 'react'
import useIsSmall from '../hooks/useIsSmall'
import {cn} from '../utils'
import  {useAtom} from 'jotai'
import {notesAtom} from '../atoms'

function Notes() {
    const isSmall = useIsSmall()
    const [notes, setNotes] = useAtom(notesAtom)
  return (
    <div className='mt-4'>
      <label
       className='text-sm'
       htmlFor='notes'>
       Special instructions:
      </label>
      <input
       value={notes}
       onChange={(e) => setNotes(e.target.value)}
       type='text'
       className={cn('h-8', isSmall && 'bg-transparent border border-border')}
       name='notes'
       id='notes'
      />
     </div>
  )
}

export default Notes