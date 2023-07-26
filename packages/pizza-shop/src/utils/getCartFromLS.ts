import { TCartItem } from '../redux/cart/types';
import { getTotalPrice } from './getTotalPrice';

export const getCartFromLS = () => {
    const cart = localStorage.getItem('cart') as string;

    let items = JSON.parse(cart) as TCartItem[];

    if (items === null) {
        items = [];
    }

    const totalPrice = getTotalPrice(items);

    return { items, totalPrice };
};
