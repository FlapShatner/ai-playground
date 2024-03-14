import { useState, useEffect, useRef } from 'react'
import { useAtom, useSetAtom } from 'jotai'
import { useLocalStorage } from 'usehooks-ts'
import {
  progressAtom,
  isGeneratingAtom,
  generatedAtom,
  webSocketAtom,
  wsIdAtom,
  detailModeAtom,
  isMakingVariantsAtom,
  captionAtom,
  imageStyleAtom,
  shapeAtom,
} from '../atoms'

const useWebSocket = (url) => {
  const connInit = useRef(false)
  const [caption, setCaption] = useAtom(captionAtom)
  const [imageStyle, setImageStyle] = useAtom(imageStyleAtom)
  const [isGenerating, setIsGenerating] = useAtom(isGeneratingAtom)
  const [generated, setGenerated] = useAtom(generatedAtom)
  const [detailMode, setDetailMode] = useAtom(detailModeAtom)
  const [isMakingVariants, setIsMakingVariants] = useAtom(isMakingVariantsAtom)
  const [shape, setShape] = useAtom(shapeAtom)
  const [ws, setWs] = useAtom(webSocketAtom)
  const [wsId, setWsId] = useAtom(wsIdAtom)
  const setProgress = useSetAtom(progressAtom)

  const [history, setHistory] = useLocalStorage('history', [])
  const addToHistory = (prompt, url, publicId, style, meta, up, shape) => {
    let newHistory = [...history]
    newHistory.unshift({ prompt, url, publicId, style, meta, up, shape })
    setHistory(newHistory)
  }

  // Function to setup WebSocket event listeners
  const setupWebSocketListeners = (webSocket) => {
    webSocket.onmessage = (event) => {
      const message = JSON.parse(event.data)
      console.log('WebSocket message:', message)
      if (message.id) {
        setWsId(message.id)
      } else if (message.status) {
        if (message.status === '0%') {
          setProgress('6%')
        }
        setProgress(message.status)
      } else if (message.payload) {
        if (message.payload.id === 'variations') {
          const wsPayload = message.payload
          console.log('payload:', message.payload)
          setIsGenerating(false)
          const up = false
          setGenerated({ url: wsPayload.imgData.url, publicId: wsPayload.imgData.publicId, meta: wsPayload.meta, up: up, shape: wsPayload.shape })
          addToHistory(caption, wsPayload.imgData.url, wsPayload.imgData.publicId, imageStyle.id, wsPayload.meta, up, wsPayload.shape)
          setDetailMode(false)
          setIsMakingVariants(false)
        }
      }
    }

    webSocket.onopen = () => {
      console.log('WebSocket connection established')
      connInit.current = true
      // Any other onopen logic...
    }

    webSocket.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    // You can add more event listeners here as needed
  }

  useEffect(() => {
    if (connInit.current) {
      return
    }
    console.log('Connecting to WebSocket:', url)

    const newWs = new WebSocket(url)
    setupWebSocketListeners(newWs)
    setWs(newWs)
    console.log('newWs', newWs)

    return () => {
      if (newWs.readyState < 2) {
        newWs.close()
        connInit.current = false
      }
    }
  }, [url, setWs])

  const sendMessage = async (message) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message))
    } else {
      console.log('WebSocket is not open, attempting to connect...')
      const newWs = new WebSocket(url)
      setWs(newWs)

      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Connection timeout'))
        }, 10000) // 10 seconds timeout for example

        newWs.onopen = () => {
          clearTimeout(timeout) // Clear the timeout on successful connection
          console.log('WebSocket connection established after retry')
          connInit.current = true
          setupWebSocketListeners(newWs)
          newWs.send(JSON.stringify(message)) // Send the message after connection is established
          resolve()
        }

        newWs.onerror = (error) => {
          clearTimeout(timeout)
          console.error('WebSocket error during retry:', error)
          reject(error)
        }
      })
    }
  }

  return { ws, sendMessage }
}

export default useWebSocket
