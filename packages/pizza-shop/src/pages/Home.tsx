import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { Categories, Sort, PizzaBlock, PizzaSkeleton, Pagination, InfoBlock } from '../components';

import { useSelector } from 'react-redux';

import { setFilters } from '../redux/filter/slice';
import { fetchPizza } from '../redux/pizza/asyncActions';
import { RootState, useAppDispatch } from '../redux/store';

import errorImg from '../assets/img/error.jpg';

const Home: React.FC = () => {
    const { categoryId, sortSelector, pageIndex, searchValue } = useSelector(
        (state: RootState) => state.filter,
    );
    const { items: pizzas, status } = useSelector((state: RootState) => state.pizza);

    const isSearch = React.useRef<boolean>(false);
    const isMounted = React.useRef<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            dispatch(
                setFilters({
                    categoryId: Number(params.categoryId),
                    sortProperty: String(params.sortProperty),
                    pageIndex: Number(params.pageIndex),
                }),
            );
        }
    }, []);

    React.useEffect(() => {
        if (!isSearch.current) {
            const sort = sortSelector.property.replace('-', '');
            const order = sortSelector.property[0] === '-' ? 'asc' : 'desc';
            const category = categoryId ? `&category=${categoryId}` : '';
            const search = searchValue ? `&title=${searchValue}` : '';

            dispatch(fetchPizza({ sort, order, category, search, pageIndex }));
        }

        isSearch.current = false;
    }, [categoryId, sortSelector, searchValue, pageIndex]);

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                categoryId,
                sortProperty: sortSelector.property,
                pageIndex,
            });

            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sortSelector, searchValue, pageIndex]);

    return (
        <>
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">All pizzas</h2>
            {status === 'rejected' ? (
                <InfoBlock
                    title="Something went wrong :<"
                    description="Try refreshing the page. We'll sort it out soon :>"
                    img={errorImg}
                />
            ) : (
                <>
                    <div className="content__items">
                        {status === 'pending'
                            ? [...Array(4)].map((item, index) => <PizzaSkeleton key={index} />)
                            : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
                    </div>
                    <Pagination numberOfPages={3} />
                </>
            )}
        </>
    );
};

export default Home;
