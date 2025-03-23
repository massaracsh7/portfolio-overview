/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const fetchAssetsFromBinance = async () => {
  try {
    const response = await axios.get("https://api.binance.com/api/v3/exchangeInfo");
    const data = response.data;
    return data.symbols
      .filter((symbol: any) => symbol.quoteAsset === "USDT")
      .map((symbol: any) => ({
        id: symbol.symbol,
        symbol: symbol.baseAsset,
      }));
  } catch (error) {
    console.error("Ошибка при получении списка валют:", error);
    return [];
  }
};
