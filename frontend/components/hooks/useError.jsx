import React from 'react'
import { useState } from 'react'

function useError() {
 const [isError, setIsError] = useState(false)
 const useIsError = () => {
  setIsError(true)
  setTimeout(() => {
   setIsError(false)
  }, 5000)
 }
 return { isError, useIsError }
}

export default useError
