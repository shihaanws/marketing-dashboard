// Keep it simple - go back to your original approach but optimized
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import dataset from "../../data/dataset.json";

export interface Row {
  id: number;
  channel: string;
  region: string;
  spend: number;
  impressions: number;
  conversions: number;
  clicks: number;
}

interface DataState {
  all: Row[];
  page: number;
  rowsPerPage: number;
  sortKey: keyof Row | null;
  sortDir: "asc" | "desc";
  filters: {
    channel: string;
    region: string;
  };
}

const initialState: DataState = {
  all: dataset as Row[],
  page: 1,
  rowsPerPage: 25,
  sortKey: null,
  sortDir: "asc",
  filters: {
    channel: "",
    region: "",
  },
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setSort(state, action: PayloadAction<keyof Row>) {
      if (state.sortKey === action.payload) {
        state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
      } else {
        state.sortKey = action.payload;
        state.sortDir = "asc";
      }
    },
    setFilter(state, action: PayloadAction<{ key: string; value: string }>) {
      const { key, value } = action.payload;
      if (key === "channel" || key === "region") {
        state.filters[key] = value;
      }
      state.page = 1;
    },
  },
});

export const { setPage, setSort, setFilter } = dataSlice.actions;
export default dataSlice.reducer;