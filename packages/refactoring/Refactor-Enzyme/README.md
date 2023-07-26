# Refactoring from Enzyme and React Testing Utils to React Testing Library(RTL).

## Refactoring with Enzyme

Enzyme was popular library created by Airbnb to test UI React components, but it was slowly being maintened by the team that didn´t reach the React updates, and React Testing Library appeared with new approach for testing. The main difference is that Enzyme was design to test details of the component funcionality with led to some complex test and manteinance, while React Tests Library is designed to test from the perspective of the user behavior and interaction with the application.

Here will follow the steps to migrate from Enzyme test to React Test Library, using the tests on the "Refactor dependencies" section.

The next test made built with Enzyme, uses the **mount** method to render the **App**. Next, the **find** method used to locate the \*Set Income** component and invoke the setIncome method with the value 1. At the end we have and assertion to verify that the text value of the **h3** element with the id of income equals **Income $1**\*\*.

```jsx
test("Set Income, given income amount, set income", () => {
  const wrapper = mount(<App />);
  wrapper.find("SetIncome").props().setIncome(1);
  expect(wrapper.find("h3#income").text()).toEqual("Income: $1");
});
```

Now, with RTL we will have a test from the users perspective.

```jsx
test("Set Income, given income amount, sets income", () => {
  render(<App />);
  setOneDollarIncome();

  const leftOverBudget = screen.getByText(/left over:/i);
  const leftOverBudgetAmount = within(leftOverBudget).getByText(/\$1/i);

  expect(leftOverBudgetAmount).toBeInTheDocument();
});
```

The next test to refactor is the verify that **BudgetSummary** section its updated when a users creates a budget.

- The test first will render with **mount** method.
- Next, we use **ceil** from **Math** object and the **parseInt** method to round the passed-in budget amount of 5 to the nearest multiple of 5.
- Then, we use **find** to call the **addNewBudget** inside the **CreateNewBudget** with the object representing the budget.
- We call **setTotalSpending** method in the same component with the result of the **budgetAmount** variable.
- The assertion will look for the value of the **h3** with the id of spending is equal to Spending: $5. And the second assertion will look for the span element with the id of leftover is equal to $-5.

```jsx
test("given budget, updates budget summary", () => {
  const wrapper = mount(<App />);
  const budgetAmount = Math.ceil(parseInt("5", 10) / 5) * 5;

  wrapper.find("CreateNewBudget").props().addNewBudget({
    id: "1",
    category: "Auto",
    amount: budgetAmount,
    amtSpent: 0,
  });
  wrapper.find("CreateNewBudget").props().setTotalSpending(budgetAmount);

  expect(wrapper.find("h3#spending").text()).toEqual("Spending: $5");
  expect(wrapper.find("span#leftover").text()).toEqual("$-5");
});
```

The refactor code with RTL will look like this:

```jsx
test("given budget, updates budget summary", () => {
  render(<App />);
  setOneDollarIncome();
  createCarBudget("5");

  const leftOverBudget = screen.getByText(/left over:/i);
  const leftOverBudgetAmount = within(leftOverBudget).getByText("$-4");

  expect(leftOverBudgetAmount).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Spending: $5" })
  ).toBeInTheDocument();
});
```

The last test to refactor verifies that the Budget summary section is updates when the user creates a budget and a chart is displayed.

- First we render the App component with the **mount** and create a **budgetAmount** variable to convert into a multiple of five.
- The with the **find** method we call the **addNewBudget** inside the **CreateNewBudget** component and pass in a budget object.
- Then **setTotalSpending** method is call inside **CreateNewBudget** passing the budget amount. We call the **update** method to sync out with the code created by **Chart** component.
- Finally the assertion is made, to assert the **div** element with the **id** of **chart** is truthy.

```jsx
test("given budget, display budget chart", () => {
  const wrapper = mount(<App />);
  const budgetAmount = Math.ceil(parseInt("5", 10) / 5) * 5;
  wrapper.find("CreateNewBudget").props().addNewBudget({
    id: "1",
    category: "Auto",
    amount: "budgetAmount",
    amtSpent: 0,
  });
  wrapper.find("CreateNewBudget").props().setTotalSpending(budgetAmount);
  wrapper.update();

  expect(wrapper.find("div#chart")).toBeTruthy();
});
```

```jsx
test("given budget, displays budget chart", () => {
  render(<App />);
  setOneDollarIncome();
  createCarBudget();

  expect(screen.getByTestId("chart")).toBeInTheDocument();
});
```

After changing and refactor test cases you can proceed to uninstall all the enzyme related libreries.

## Refactoring with React Test Utils

**React Test Utils** is module included with React. We don't need to install or uninstall after the refactoring, the only thing to do work with it is to import or not import.

The refactor process is almost the same as the previous one with Enzyme.

- **ReactDOM** and **act** are imported from the **test-utils** module.
- A **div** element is crated in the DOM and assign it to a variable **container**.
- The element **container** is attached to the **body**, after this the **App** is rendered in the container, wrapped in the act.
- Finally we take DOM elements and assert the text values.

```jsx
it("SetIncome, given initial render, displays budget summary values", () => {
  let container = document.createElement("div");
  document.body.appendChild(container);

  act(() => {
    ReactDOM.render(<App />, container);
  });
  const income = container.querySelector("h3#income");
  const spending = container.querySelector("#spending");
  const leftover = container.querySelector("#leftover");

  expect(income.textContent).toBe("Income: $0");
  expect(spending.textContent).toBe("Spending: $0");
  expect(leftover.textContent).toBe("$0");

  document.body.removeChild(container);
});
```

- We proceed with the refactorization to implement React Testing Library it should look like:

```jsx
it("SetIncome, given initial render, displays budget summary values", () => {
  render(<App />);

  const income = screen.getByRole("heading", { name: /income: \$0/i });
  const spending = screen.getByRole("heading", { name: /spending: \$0/i });
  const leftover = screen.getByText(/left over:/i);

  expect(income).toHaveTextContent("Income: $0");
  expect(spending).toHaveTextContent("Spending: $0");
  expect(leftover).toHaveTextContent("$0");
});
```
- After we changed out test, we can clean the file by deleting the unused imports.
