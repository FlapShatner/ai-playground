import React, { useEffect } from 'react'
import { cn, wsUrl } from '../utils'
import useIsSmall from '../hooks/useIsSmall'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { useAtomValue, useAtom } from 'jotai'
import { progressAtom } from '../atoms'

function Progress() {
 const [progress, setProgress] = useAtom(progressAtom)
 const isSmall = useIsSmall()
 const WS_URL = wsUrl
 const { lastJsonMessage } = useWebSocket(WS_URL, {
  share: true,
  shouldReconnect: () => true,
 })
 //  const progress = '20%'
 useEffect(() => {
  console.log('progress', lastJsonMessage)
  if (lastJsonMessage) {
   if (lastJsonMessage.event === 'status') {
    console.log('lastJsonMessage', lastJsonMessage)
    setProgress(lastJsonMessage.status)
   }
  }
  return () => {
   console.log('cleanup')
   setProgress('0%')
  }
 }, [lastJsonMessage])

 return (
  <>
   <span className={cn('my-1 mt-48 flex w-full justify-center', isSmall && 'mt-32')}>Progress: {progress}</span>
   <div className=' h-10 mb-2 w-full bg-bg-primary'>
    <div
     className='h-10 bg-accent-bright'
     style={{ width: progress }}></div>
   </div>
  </>
 )
}

export default Progress
