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
    updateAssetPrice: (state, action: PayloadAction<{ id: string; price: number; change24h: number }>) => {
      const asset = state.find(a => a.id === action.payload.id);
      if (asset) {
        asset.price = action.payload.price;
        asset.change24h = action.payload.change24h;
        localStorage.setItem("portfolio", JSON.stringify(state));
      }
    },
  },
});

export const { addAsset, removeAsset, updateAssetPrice } = assetsSlice.actions;
export default assetsSlice.reducer;
