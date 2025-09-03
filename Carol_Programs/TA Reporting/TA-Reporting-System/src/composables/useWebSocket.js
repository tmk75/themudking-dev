import { ref, onMounted, onUnmounted } from 'vue'

export function useWebSocket(url) {
  const socket = ref(null)
  const isConnected = ref(false)
  const data = ref(null)
  const error = ref(null)

  const connect = () => {
    try {
      socket.value = new WebSocket(url)
      
      socket.value.onopen = () => {
        isConnected.value = true
        error.value = null
      }
      
      socket.value.onmessage = (event) => {
        try {
          data.value = JSON.parse(event.data)
        } catch (e) {
          data.value = event.data
        }
      }
      
      socket.value.onclose = () => {
        isConnected.value = false
      }
      
      socket.value.onerror = (err) => {
        error.value = err
        isConnected.value = false
      }
    } catch (err) {
      error.value = err
    }
  }

  const disconnect = () => {
    if (socket.value) {
      socket.value.close()
    }
  }

  const send = (message) => {
    if (socket.value && isConnected.value) {
      socket.value.send(typeof message === 'string' ? message : JSON.stringify(message))
    }
  }

  onMounted(() => {
    connect()
  })

  onUnmounted(() => {
    disconnect()
  })

  return {
    socket,
    isConnected,
    data,
    error,
    connect,
    disconnect,
    send
  }
}