import axios from "axios";
import { SymbolInfo } from "../types/types";
import { v4 as uuidv4 } from "uuid";

export const getAssetsData = async () => {
  try {
    const response = await axios.get("https://api.binance.com/api/v3/exchangeInfo");
    const data = response.data;
    const symbols = data.symbols
      .filter((symbol: SymbolInfo) => symbol.quoteAsset === "USDT")
      .map((symbol: SymbolInfo) => symbol.symbol);

    const assetsData = await Promise.all(symbols.map(async (symbol: SymbolInfo) => {
      const tickerResponse = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`);
      const tickerData = tickerResponse.data;
      return {
        id: uuidv4(),
        symbol: tickerData.symbol.replace("USDT", ""),
        price: parseFloat(tickerData.lastPrice),
        change: parseFloat(tickerData.priceChangePercent), 
      };
    }));

    const validAssetsData = assetsData.filter(asset => asset.price > 0 && asset.change !== 0);

    return validAssetsData;
  } catch (error) {
    console.error("Ошибка при получении списка валют:", error);
    return [];
  }
};
