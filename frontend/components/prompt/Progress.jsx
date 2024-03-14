import React, { useEffect } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { useAtomValue, useAtom } from 'jotai'
import { progressAtom } from '../atoms'

function Progress() {
 const [progress, setProgress] = useAtom(progressAtom)

 const WS_URL = 'wss://home.ink-dev.com/'
 const { lastJsonMessage } = useWebSocket(WS_URL, {
  share: true,
  shouldReconnect: () => true,
 })

 useEffect(() => {
  console.log('progress', lastJsonMessage)
  if (lastJsonMessage) {
   if (lastJsonMessage.event === 'status') {
    console.log('lastJsonMessage', lastJsonMessage)
    setProgress(lastJsonMessage.status)
   }
  }
 }, [lastJsonMessage])

 return (
  <>
   <span className='my-1 flex w-full justify-center'>Progress: {progress}</span>
   <div className=' h-6 mb-2 w-full bg-bg-tertiary'>
    <div
     className='h-6 bg-accent-bright'
     style={{ width: progress }}></div>
   </div>
  </>
 )
}

export default Progress
