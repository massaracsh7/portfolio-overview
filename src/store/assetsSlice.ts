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
  },
});

export const { addAsset, removeAsset } = assetsSlice.actions;
export default assetsSlice.reducer;
