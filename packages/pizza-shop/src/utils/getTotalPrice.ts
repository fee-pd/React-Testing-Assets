import { TCartItem } from "../redux/cart/types";

export const getTotalPrice = (items: TCartItem[])=>{
    return items !== null ? items.reduce(
        (sum, current) => sum + current.price * current.count,
        0,
    ): 0;
}