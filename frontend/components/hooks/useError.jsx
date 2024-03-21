import React from 'react'
import { useState } from 'react'
import { useSetAtom } from 'jotai'
import { isGeneratingAtom, isUpscalingAtom, isMakingVariantsAtom } from '../atoms'
import { toast } from 'react-toastify'

function useError() {
 const setIsGenerating = useSetAtom(isGeneratingAtom)
 const setIsUpscaling = useSetAtom(isUpscalingAtom)
 const setIsMakingVariants = useSetAtom(isMakingVariantsAtom)
 const [isError, setIsError] = useState(false)
 const useIsError = () => {
  //   setIsError(true)
  toast.error('Something went wrong. Please try again.', { theme: 'colored', hideProgressBar: true })
  setTimeout(() => {
   setIsError(false)
   setIsGenerating(false)
   setIsUpscaling(false)
   setIsMakingVariants(false)
  }, 2000)
 }
 return { isError, useIsError }
}

export default useError
