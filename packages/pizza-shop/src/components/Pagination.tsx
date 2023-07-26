import React from "react";
import {useSelector, useDispatch} from "react-redux";

import {RootState} from "../redux/store";

import {
  setPageIndex as setActiveIndex,
  incrementPageIndex as increment,
  decrementPageIndex as decrement,
} from "../redux/filter/slice";

interface PaginationProps {
  numberOfPages: number;
}

export const Pagination: React.FC<PaginationProps> = ({numberOfPages}) => {
  const indexes: JSX.Element[] = [];
  const indexes2: JSX.Element[] = [];

  const activeIndex = useSelector((state: RootState) => state.filter.pageIndex);
  const dispatch = useDispatch();

  for (let i = 1; i < numberOfPages + 1; i++) {
    indexes.push(
      <li
        key={i}
        onClick={() => dispatch(setActiveIndex(i))}
        className={activeIndex === i ? "active" : ""}
      >
        {i}
      </li>
    );
  }

  return (
    <div className="pagination">
      <ul>
        <li onClick={() => dispatch(decrement())}>{"<"}</li>

        {indexes}

        <li onClick={() => dispatch(increment())}>{">"}</li>
      </ul>
    </div>
  );
};
