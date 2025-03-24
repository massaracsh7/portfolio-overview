export interface Asset {
  id: string;
  name: string;
  quantity: number;
  price: number;
  change24h: number;
  portfolioShare: number;
}

export interface SymbolInfo {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
}

export interface AssetInfo {
  id: string;
  symbol: string;
  price: number;
  change: number;
}

export interface AssetData {
  id: string;
  symbol: string;
}