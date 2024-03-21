import React from 'react'
import { useAtom } from 'jotai'
import { generatedAtom } from '../atoms'

function useClearGenerated() {
 const [generated, setGenerated] = useAtom(generatedAtom)
 const clearGenerated = () => {
  setGenerated({
   url: '',
   publicId: '',
   meta: {},
   up: false,
  })
 }
 return clearGenerated
}

export default useClearGenerated
