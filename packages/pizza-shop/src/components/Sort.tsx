import React from "react";
import {useSelector, useDispatch} from "react-redux";

import {setSortSelector as setSelector} from "../redux/filter/slice";
import {RootState} from "../redux/store";

export const selectorsDictionary = [
  {title: "Popularity (DESC)", property: "rating"},
  {title: "Popularity (ASC)", property: "-rating"},
  {title: "Price (DESC)", property: "price"},
  {title: "Price (ASC)", property: "-price"},
  {title: "Alphabet (DESC)", property: "title"},
  {title: "Alphabet (ASC)", property: "-title"},
];

export const Sort: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const selector = useSelector((state: RootState) => state.filter.sortSelector);
  const dispatch = useDispatch();

  const popupElement = React.useRef<HTMLDivElement>();

  function selectOption(option) {
    dispatch(setSelector(option));
    setIsVisible((prevIsVisible) => !prevIsVisible);
  }

  React.useEffect(() => {
    function handleBodyClick(e) {
      if (!!e?.path && !e?.path?.includes(popupElement.current)) {
        setIsVisible(false);
      }
    }

    document.body.addEventListener("click", handleBodyClick);

    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, []);

  return (
    <div className="sort" ref={popupElement}>
      <div
        className="sort__label"
        onClick={() => setIsVisible((prevIsVisible) => !prevIsVisible)}
      >
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Sort by:</b>
        <span>{selector.title}</span>
      </div>
      <div className={"sort__popup" + (isVisible ? " sort__visible" : "")}>
        <ul>
          {selectorsDictionary.map((obj, index) => (
            <li
              key={index}
              className={obj.property === selector.property ? "active" : ""}
              onClick={() => selectOption(obj)}
            >
              {obj.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
