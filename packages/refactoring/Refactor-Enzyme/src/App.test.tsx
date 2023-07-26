/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-node-access */
// @ts-ignore

import React from "react";
import ReactDOM from "react-dom";
import { render, screen, within } from "@testing-library/react";
import { mount } from "enzyme";
import user from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";
import { act } from "react-dom/test-utils";

describe("Enzyme test", () => {
  test("Set Income, given income amount, set income", () => {
    const wrapper = mount(<App />);
    // @ts-ignore
    wrapper.find("SetIncome").props().setIncome(1);
    expect(wrapper.find("h3#income").text()).toEqual("Income: $1");
  });

  test("given budget, updates budget summary", () => {
    const wrapper = mount(<App />);
    const budgetAmount = Math.ceil(parseInt("5", 10) / 5) * 5;
    // @ts-ignore
    wrapper.find("CreateNewBudget").props().addNewBudget({
      id: "1",
      category: "Auto",
      amount: budgetAmount,
      amtSpent: 0,
    });
    // @ts-ignore
    wrapper.find("CreateNewBudget").props().setTotalSpending(budgetAmount);

    expect(wrapper.find("h3#spending").text()).toEqual("Spending: $5");
    expect(wrapper.find("span#leftover").text()).toEqual("$-5");
  });

  test("given budget, display budget chart", () => {
    const wrapper = mount(<App />);
    const budgetAmount = Math.ceil(parseInt("5", 10) / 5) * 5;
    // @ts-ignore
    wrapper.find("CreateNewBudget").props().addNewBudget({
      id: "1",
      category: "Auto",
      amount: "budgetAmount",
      amtSpent: 0,
    });
    // @ts-ignore
    wrapper.find("CreateNewBudget").props().setTotalSpending(budgetAmount);
    wrapper.update();

    expect(wrapper.find("div#chart")).toBeTruthy();
  });
});

describe("React Test Util tests", () => {
  it("SetIncome, given initial render, displays budget summary values", () => {
    let container = document.createElement("div");
    document.body.appendChild(container);
  
    act(() => {
      ReactDOM.render(<App />, container);
    });
    const income = container.querySelector("h3#income");
    const spending = container.querySelector("#spending");
    const leftover = container.querySelector("#leftover");
  
    expect(income?.textContent).toBe("Income: $0");
    expect(spending?.textContent).toBe("Spending: $0");
    expect(leftover?.textContent).toBe("$0");
  
    document.body.removeChild(container);
  });
});

describe("RTL tests", () => {
  function setOneDollarIncome() {
    user.click(screen.getByText(/set income/i));
    user.type(screen.getByRole("spinbutton"), "1");
    user.click(screen.getByText(/submit/i));
  }

  function createCarBudget(amount = "5") {
    user.click(screen.getByText(/create new budget/i));
    user.selectOptions(screen.getByRole("combobox", { name: /category/i }), [
      screen.getByText("Auto"),
    ]);
    user.type(screen.getByRole("spinbutton"), amount);
    user.click(screen.getByText(/add budget/i));
  }

  test("Set Income, given income amount, sets income", () => {
    render(<App />);
    setOneDollarIncome();
  
    const leftOverBudget = screen.getByText(/left over:/i);
    const leftOverBudgetAmount = within(leftOverBudget).getByText(/\$1/i);
  
    expect(leftOverBudgetAmount).toBeInTheDocument();
  });

  test("given budget, updates budget summary", () => {
    render(<App />);
    setOneDollarIncome();
    createCarBudget('5');
  
    const leftOverBudget = screen.getByText(/left over:/i);
    const leftOverBudgetAmount = within(leftOverBudget).getByText("$-4");
  
    expect(leftOverBudgetAmount).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Spending: $5" })
    ).toBeInTheDocument();
  });

  test("given budget, displays budget chart", () => {
    render(<App />);
    setOneDollarIncome();
    createCarBudget();
  
    expect(screen.getByTestId("chart")).toBeInTheDocument();
  });

  it("SetIncome, given initial render, displays budget summary values", () => {
    render(<App />);
  
    const income = screen.getByRole("heading", { name: /income: \$0/i });
    const spending = screen.getByRole("heading", { name: /spending: \$0/i });
    const leftover = screen.getByText(/left over:/i);
  
    expect(income).toHaveTextContent("Income: $0");
    expect(spending).toHaveTextContent("Spending: $0");
    expect(leftover).toHaveTextContent("$0");
  });
});


