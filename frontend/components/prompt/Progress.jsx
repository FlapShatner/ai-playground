import React, { useEffect } from 'react'
import { cn } from '../utils'
import { wsUrl } from '../config'
import useIsSmall from '../hooks/useIsSmall'
import useWebSocket from 'react-use-websocket'
import { useAtom } from 'jotai'
import { progressAtom } from '../atoms'

function Progress() {
 const [progress, setProgress] = useAtom(progressAtom)
 const isSmall = useIsSmall()
 const WS_URL = wsUrl
 const { lastJsonMessage } = useWebSocket(WS_URL, {
  share: true,
  shouldReconnect: () => true,
 })
 useEffect(() => {
  if (lastJsonMessage) {
   if (lastJsonMessage.event === 'status') {
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
   <span className={cn('my-1 mt-32 flex w-full justify-center', isSmall && 'mt-48')}>Progress: {progress}</span>
   <div className=' h-10 mb-2 w-full bg-bg-primary'>
    <div
     className='h-10 bg-accent-bright'
     style={{ width: progress }}></div>
   </div>
  </>
 )
}

export default Progress
