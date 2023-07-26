import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {TFetchPizza, TPizza} from "./types";


export const fetchPizza = createAsyncThunk(
  "pizza/fetchPizza",
  async ({sort, order, category, search, pageIndex}: TFetchPizza) => {
    // const {data} = await axios.get<TPizza[]>(
    //   `https://62b7554a691dcea2733d6cff.mockapi.io/items?page=${pageIndex}&limit=4&sortBy=${sort}${search}&order=${order}${category}`
    // );
    const {data} = await axios.get<TPizza[]>(`./pizza-store-${pageIndex}.json`);

    return data as TPizza[];
  }
);
