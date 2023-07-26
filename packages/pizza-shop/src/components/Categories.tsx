import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId as setActiveIndex } from '../redux/filter/slice';
import { RootState } from '../redux/store';

export const categoriesDictionary = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'];

export const Categories: React.FC = () => {
    const activeIndex = useSelector((state: RootState) => state.filter.categoryId);
    const dispatch = useDispatch();

    return (
        <div className="categories">
            <ul>
                {categoriesDictionary.map((category, index) => (
                    <li
                        key={index}
                        className={activeIndex === index ? 'active' : ''}
                        onClick={() => dispatch(setActiveIndex(index))}>
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
};
