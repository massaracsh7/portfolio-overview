/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = "wss://stream.binance.com:9443/stream?streams=";

let socket: WebSocket | null = null;

export const subscribeToPriceUpdates = (symbols: string[], callback: (data: any) => void) => {
  if (socket) {
    socket.close(); 
  }

  if (symbols.length === 0) return;
  const streams = symbols.map(symbol => `${symbol.toLowerCase()}usdt@ticker`).join("/");
  socket = new WebSocket(`${BASE_URL}${streams}`);
  socket.onopen = () => {
    console.log("WebSocket подключен");
  };

  socket.onmessage = (event) => {
    const response = JSON.parse(event.data);
    if (response.data) {
      callback(response.data);
    }
  };

  socket.onclose = () => {
    console.log("WebSocket отключен");
  };

  socket.onerror = (error) => {
    console.error("Ошибка WebSocket:", error);
  };
};

export const closeWebSocket = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};
