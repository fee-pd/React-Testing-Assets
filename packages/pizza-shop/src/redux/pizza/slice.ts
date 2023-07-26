import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { PizzaSliceState, Status, TPizza } from "./types";

import { fetchPizza } from "./asyncActions";

const initialState: PizzaSliceState = {
    items: [],
    status: Status.PENDING,
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setPizza(state, action: PayloadAction<TPizza[]>) {
            state.items = action.payload;
        },
    },
    
    extraReducers: (builder) => {
        builder.addCase(fetchPizza.pending, (state) => {
            state.items = [];
            state.status = Status.PENDING;
        });
        builder.addCase(fetchPizza.fulfilled, (state, action: PayloadAction<TPizza[]>) => {
            state.items = action.payload;
            state.status = Status.FULFILLED;
        });
        builder.addCase(fetchPizza.rejected, (state) => {
            state.items = [];
            state.status = Status.REJECTED;
        });
    },
});

export const { setPizza } = pizzaSlice.actions;
export default pizzaSlice.reducer;
