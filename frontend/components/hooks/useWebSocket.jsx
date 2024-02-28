import { useState, useEffect } from 'react'
import { set } from 'react-hook-form'

const useWebSocket = (url) => {
  const [ws, setWs] = useState(null)
  const [wsId, setWsId] = useState(null)
  const [status, setStatus] = useState('')
  const [finalResult, setFinalResult] = useState('')

  useEffect(() => {
    // Establish WebSocket connection
    const newWs = new WebSocket(url)

    newWs.onopen = () => {
      console.log('WebSocket connection established')
    }

    newWs.onmessage = (event) => {
      const message = JSON.parse(event.data)
      if (message.id) {
        setWsId(message.id)
      } else if (message.status) {
        setStatus(message.status)
      } else if (message.finalResult) {
        setFinalResult(message.finalResult)
      }
    }
    newWs.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
    setWs(newWs)
    return () => {
      newWs.close()
    }
  }, [])

  return { ws, wsId, status, finalResult }
}

export default useWebSocket
