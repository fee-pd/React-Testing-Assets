export type TCartItem = {
    id: string;
    title: string;
    image: string;
    type: string;
    size: number;
    price: number;
    count: number;
};

export interface CartSliceState {
    totalPrice: number;
    items: TCartItem[];
}
