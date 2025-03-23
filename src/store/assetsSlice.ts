import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Asset } from "../types/types";


const initialState: Asset[] = JSON.parse(localStorage.getItem("portfolio") || "[]");

const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    addAsset: (state, action: PayloadAction<Asset>) => {
      state.push(action.payload);
      localStorage.setItem("portfolio", JSON.stringify(state));
    },
    removeAsset: (state, action: PayloadAction<string>) => {
      const updated = state.filter(asset => asset.id !== action.payload);
      localStorage.setItem("portfolio", JSON.stringify(updated));
      return updated;
    },
    updateAssetPrice: (state, action: PayloadAction<{ name: string; price: number; change24h: number }>) => {
      console.log(action.payload.name);
      const asset = state.find(item => item.name === action.payload.name);
      console.log(asset);
      if (asset) {
        asset.price = action.payload.price;
        asset.change24h = action.payload.change24h;
        localStorage.setItem("portfolio", JSON.stringify(state));
      }
      const totalV = state.reduce((sum, asset) => sum + asset.quantity * asset.price, 0);
      state.forEach(asset => {
        asset.portfolioShare = totalV > 0
          ? ((asset.quantity * asset.price) / totalV) * 100
          : 0;
      });
    },
    updateAsset: (state, action: PayloadAction<Asset>) => {
      const index = state.findIndex(asset => asset.name === action.payload.name);
      if (index !== -1) {
        state[index] = action.payload; 
      }
    },
  },
});

export const { addAsset, removeAsset, updateAssetPrice, updateAsset } = assetsSlice.actions;
export default assetsSlice.reducer;
