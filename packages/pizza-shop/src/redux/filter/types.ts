export type TSortSelector = {
    title: string;
    property: string;
};

export type FilterSetProps = {
    categoryId: number;
    sortProperty: string;
    pageIndex: number;
};

export interface FilterSliceState {
    categoryId: number;
    sortSelector: TSortSelector;
    pageIndex: number;
    searchValue: string;
}