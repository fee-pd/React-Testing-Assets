import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { selectorsDictionary } from '../../components/Sort';

import { FilterSetProps, FilterSliceState, TSortSelector } from "./types";

const initialState: FilterSliceState = {
    categoryId: 0,
    sortSelector: {
        title: 'Popularity (DESC)',
        property: 'rating',
    },
    pageIndex: 1,
    searchValue: '',
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSortSelector(state, action: PayloadAction<TSortSelector>) {
            state.sortSelector = action.payload;
        },
        setPageIndex(state, action: PayloadAction<number>) {
            state.pageIndex = action.payload;
        },
        incrementPageIndex(state, action: PayloadAction<number>) {
            if (state.pageIndex < action.payload) {
                state.pageIndex++;
            }
        },
        decrementPageIndex(state) {
            if (state.pageIndex > 1) {
                state.pageIndex--;
            }
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setFilters(state, action: PayloadAction<FilterSetProps>) {
            state.categoryId = Number(action.payload.categoryId);
            state.sortSelector = selectorsDictionary.find(
                (item) => item.property === action.payload.sortProperty,
            );
            state.pageIndex = Number(action.payload.pageIndex);
        },
    },
});

export const {
    setCategoryId,
    setSortSelector,
    setPageIndex,
    incrementPageIndex,
    decrementPageIndex,
    setSearchValue,
    setFilters,
} = filterSlice.actions;
export default filterSlice.reducer;