import React from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

import {InfoBlock} from "./InfoBlock";

import {categoriesDictionary} from "./Categories";
import {typeDictionary} from "./PizzaBlock";

import {addItem} from "../redux/cart/slice";
import {RootState} from "../redux/store";
import {TPizza} from "../redux/pizza/types";
import {TCartItem} from "../redux/cart/types";

export const PizzaItem: React.FC = () => {
  const {id} = useParams();
  const [pizza, setPizza] = React.useState<TPizza>();
  const [activeType, setActiveType] = React.useState<number>(0);
  const [activeSizeIndex, setActiveSizeIndex] = React.useState<number>(0);

  const items = useSelector((state: RootState) => state.cart.items);
   const count = items.reduce((count: number, val: TCartItem) => {
    if (val.id === id) {
      count += val.count;
    }

    return count;
  }, 0);

  const dispatch = useDispatch();

 

  React.useEffect(() => {
    axios
      .get(`../pizza-${id}.json`)
      .then((res) => {
        setPizza(res.data);
      });
  }, []);

  return !pizza ? (
    <InfoBlock
      title="Loading..."
      description="The e-pizza hasn't finished baking yet :>"
    />
  ) : (
    <div className="pizza-item">
      <div className="pizza-item__left-side">
        <img src={pizza.imageUrl} alt="pizza" />
      </div>
      <div className="pizza-item__right-side">
        <h1>{pizza.title}</h1>
        <p className="pizza-item__subtitle">
          Type: {categoriesDictionary[pizza.category]}
        </p>
        <div className="pizza-item__selector">
          <ul>
            {pizza.types.map((typeIndex, index) => (
              <li
                key={index}
                className={activeType === index ? "active" : ""}
                onClick={() => setActiveType(index)}
              >
                {typeDictionary[typeIndex]}
              </li>
            ))}
          </ul>

          <ul>
            {pizza.sizes.map((size, index) => (
              <li
                key={index}
                className={activeSizeIndex === index ? "active" : ""}
                onClick={() => setActiveSizeIndex(index)}
              >
                {size} cm.
              </li>
            ))}
          </ul>
        </div>
        <p className="pizza-item__description">
          Rating <span></span> {pizza.rating} / 10
        </p>

        <p className="pizza-item__description">
          Quantity <span></span> {count}
        </p>

        <p className="pizza-item__description">
          Price <span></span> $ {pizza.price}
        </p>

        <div className="pizza-item__buttonGroup">
          <Link to="/">
            <button className="pizza-item__button">Back</button>
          </Link>
          <button
            className="pizza-item__button"
            onClick={() =>
              dispatch(
                addItem({
                  id,
                  title: pizza.title,
                  image: pizza.imageUrl,
                  type: typeDictionary[activeType],
                  size: pizza.sizes[activeSizeIndex],
                  price: pizza.price,
                  count: 1,
                })
              )
            }
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
