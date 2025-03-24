/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
interface WebSocketData {
    s: string;
    c: string; 
    P: string;
  }

const useWebSocket = (symbols: string[], callback: (data: WebSocketData) => void) => {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (wsRef.current) {
      wsRef.current.close();
    }

    if (symbols.length === 0) return;
    const names = symbols.map(sym => `${sym.toLowerCase()}usdt@ticker`).join("/");
    const url = `wss://stream.binance.com:9443/stream?streams=${names}`;
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => console.log("WebSocket подключен");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.data) {
        callback(data.data);
      }
    };
    ws.onerror = (error) => console.error("Ошибка WebSocket:", error);
    ws.onclose = () => console.log("WebSocket отключен");

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        console.log("WebSocket закрыт");
      }
    };
  }, [symbols.join(",")]); 

  return wsRef.current;
};

export default useWebSocket;
