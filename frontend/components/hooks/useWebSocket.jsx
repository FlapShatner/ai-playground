import { useState, useEffect } from 'react'
import { useAtom, useSetAtom } from 'jotai'
import { progressAtom, finalResultAtom, webSocketAtom, wsIdAtom } from '../atoms'
const useWebSocket = (url) => {
  const [ws, setWs] = useAtom(webSocketAtom)
  const setWsId = useSetAtom(wsIdAtom)
  const setFinalResult = useSetAtom(finalResultAtom)
  const setProgress = useSetAtom(progressAtom)

  useEffect(() => {
    if (ws && ws.readyState < 2) {
      return
    }

    const newWs = new WebSocket(url)
    setWs(newWs)

    newWs.onopen = () => {
      console.log('WebSocket connection established')
    }

    newWs.onmessage = (event) => {
      const message = JSON.parse(event.data)
      console.log('WebSocket message:', message)
      if (message.id) {
        setWsId(message.id)
      } else if (message.status) {
        if (message.status === '0%') {
          setProgress('6%')
        }
        setProgress(message.status)
      } else if (message.finalResult) {
        console.log('finalResult:', message.finalResult)
        setFinalResult(message.finalResult)
        setProgress('1%')
      }
    }
    newWs.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
    return () => {
      if (newWs.readyState < 2) {
        newWs.close()
      }
    }
  }, [url])

  return { ws }
}

export default useWebSocket
