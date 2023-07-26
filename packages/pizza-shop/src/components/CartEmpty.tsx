import React from 'react';
import { Link } from 'react-router-dom';

import cartEmptyImg from '../assets/img/empty-cart.png';

export const CartEmpty: React.FC = () => {
    return (
        <div className="container--cart">
            <div className="cart cart--empty">
                <h2>
                    Cart is empty 😕
                </h2>
                <p>
                    You probably haven't ordered pizza yet.&nbsp;
                    <br />
                    To order pizza, go to the main page.
                </p>
                <img src={cartEmptyImg} alt="Empty cart" />
                <Link to="/" className="button button--black">
                    <span>Come back</span>
                </Link>
            </div>
        </div>
    );
};