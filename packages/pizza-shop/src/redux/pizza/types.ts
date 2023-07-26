export type TPizza = {
    id: string;
    category: number;
    imageUrl: string;
    price: number;
    rating: number;
    sizes: number[];
    title: string;
    types: number[];
};

export enum Status {
    PENDING = 'pending',
    FULFILLED = 'fulfilled',
    REJECTED = 'rejected',
}

export interface PizzaSliceState {
    items: TPizza[];
    status: Status;
}

export type TFetchPizza = {
    sort: string;
    order: string;
    category: string;
    search: string;
    pageIndex: number;
};