## Using test to catch regressions when updating dependencies.

You will learn how to use test after updating application dependencies. Testing that the application continues to work as expected, quickly catching regressions.

We will start with the following dependencies on our package.json:

```json
{
  "@material-ui/core": "^1.4.2",
  "@material-ui/icons": "^2.0.1",
  "@testing-library/jest-dom": "^5.16.4",
  "@testing-library/react": "^12.1.2",
  "@testing-library/user-event": "^13.5.0",
  "@types/jest": "^27.5.2",
  "@types/node": "^16.11.41",
  "@types/react": "^17.0.58",
  "@types/recharts": "^1.8.24",
  "msw": "0.43.1",
  "react": "^16.4.2",
  "react-scripts": "5.0.1",
  "recharts": "^2.5.0",
  "typescript": "^4.7.4",
  "uuid": "^8.3.2",
  "web-vitals": "^2.1.4"
}
```

Our main focus will be on "@material-ui/core: ^1.4.2" and "@material-ui/icons: ^2.0.1". That will be updated to versions "^4.11.3" and "^4.11.2" respectevily.

Make sure the test sript in package.json contains the **--watchAll** command, so you have te test contious runnig while making the changes needed.

The test for this excercise will be for the following functionalities:
A. Setting Income
B. Creating a Budget
C. Deleting a Budget
D. Budget details

A. Setting Income

- Create a function that verify that the user enter an ammount on th income input:

```jsx
function setOneDollarIncome() {
  user.click(screen.getByText(/set income/i));
  user.type(screen.getByRole("spinbutton"), "1");
  user.click(screen.getByText(/submit/i));
}
```

- Then we will have the test code:
  - The **App** component will be render, then an income is set with the previous function.
  - The **within** function is used to access the amount text. **within** can be used to access the child elements of a parent.

```jsx
test("SetIncome, given income amount, sets income", () => {
  render(<BudgetApp />);

  setOneDollarIncome();
  const leftOverBudget = screen.getByText(/left over:/i);
  const leftOverBudgetAmount = within(leftOverBudget).getByText(/\$1/i);

  expect(leftOverBudgetAmount).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /income: \$1/i })
  ).toBeInTheDocument();
});
```

B. Creating a Budget

- Create a function to create a budget. A default 5 is set if there is no value for the amount parameter.

```jsx
function createCarBudget(amount = "5") {
  user.click(screen.getByText(/create new budget/i));
  user.selectOptions(screen.getByRole("combobox", { name: /category/i }), [
    screen.getByText("Auto"),
  ]);
  user.type(screen.getByRole("spinbutton"), amount);
  user.click(screen.getByText(/add budget/i));
}
```

- Then will have the test code:
  - We use the **each** method from Jest to allow the same test run multiple times with different values. The budgetAmount, spending and leftOver valables represent the tests values for each iteration.
  - In the actions of the test, the App will be rendered, set an income with **setOneDollarIncome** and the create a budget with **createCarBudget**.
  - As the previous set the expect to check that left over amount is in the document. Then set a expect to verify that the heading element for the current value f name is in the DOM.

```jsx
test.each`
  budgetAmount | spending           | leftOver
  ${"4"}       | ${"Spending: $5"}  | ${"$-4"}
  ${"5"}       | ${"Spending: $5"}  | ${"$-4"}
  ${"6"}       | ${"Spending: $10"} | ${"$-9"}
`(
  "given budget, updates budget summary",
  ({ budgetAmount, spending, leftOver }) => {
    render(<BudgetApp />);
    setOneDollarIncome();

    createCarBudget(budgetAmount);
    const leftOverBudget = screen.getByText(/left over:/i);
    const leftOverBudgetAmount = within(leftOverBudget).getByText(leftOver);

    expect(leftOverBudgetAmount).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: spending })).toBeInTheDocument();
  }
);
```

C. Deleting a Budget

- We will be using the two functions previouly writted, **setOneDollarIncome** and **createCarBudget**.
- The test steps will consist on:
  - Render **App**, then invoke ur two fnctions we metion before.
  - Search the trash icon with **getByLabelText** method and click on it.
  - Finally we assert to make sure that there are not items in the list, using **queryByRole**.

```jsx
test("DeleteBudget, given deleted budget, budget removed from DOM", () => {
  render(<BudgetApp />);
  setOneDollarIncome();
  createCarBudget();

  user.click(screen.getByLabelText(/trash can/i));

  expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
});
```

D. Budget Details

- As the previous test cases, **App** is rendered, then **setOneDollarIncome** and **createCarBudget** respectively.
- Then **user.click** is calledwith the **getByRole** method, to find the arrow right button.
- The assertion will expect for a heading that contains the progress of $5 with the method **getByRole**.

```jsx
test("given budget expense, updates budget progress", () => {
  render(<BudgetApp />);
  setOneDollarIncome();
  createCarBudget();

  user.click(screen.getByRole("button", { name: /arrowright/i }));

  expect(
    screen.getByRole("heading", { name: /\$5 of \$5/i })
  ).toBeInTheDocument();
});
```

You can try by copy and pasting these other 2 test, to see other test funcionality within the Budget app.

```jsx
test("given budget, displays budget chart", () => {
  render(<BudgetApp />);
  setOneDollarIncome();
  createCarBudget();

  expect(screen.getByTestId("chart")).toBeInTheDocument();
});

test("given budget, displays details", () => {
  render(<BudgetApp />);
  setOneDollarIncome();
  createCarBudget();

  const budgetList = screen.getByRole("listitem");

  expect(within(budgetList).getByText(/auto/i)).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /\$0 of \$5/i })
  ).toBeInTheDocument();
});
```

### Updating dependencies and failed test.

- Once you have passed all the tests, the next step is to update our **package.json** dependencies. You can check the final result on the Example-end file. Or try to update on this repositoty the following dependencies on the package.json:

```json
{
  "@material-ui/core": "^4.11.3",
  "@material-ui/icons": "^4.11.2"
}
```

\*Note - If the repository hasve issues while trying to run test, try deleting **node_modules** and the **package-lock.json** file. And restart you IDE software. If the problem persist try running the following command:

```cli
npx jest --clearCache
```

- After updating the dependencies and running **npm run test**, you should see the test failed with their different error messages like: "TestingLibraryElementError: Unable to find an accessible element with the role "heading" and name `/\$0 of \$5/i`".

- These error ocurr because of the changes on libraries like deprecated methods. So in order to fix our code and test we need to go trough the component files at first to check and change the methos and properties that have been changed by the library. While we make this changes, our test should be continue on watch mode, so we can see if them got fixed, until we have everything as Pass again.

  - One of the changes is on the **variant** property in Typography, where **variant="title"** is not valid anymore. And it should be changed to any of the options like an **h6**.

  ```jsx
  <Typography variant="title" classes={{ root: classes.root }}>
    ...
  </Typography>
  ```

  ```jsx
  <Typography variant="h6" classes={{ root: classes.root }}>
    ...
  </Typography>
  ```

  - With the change above, some of the assertions can fail with the method **getByRole**. So you will have to change the query method to find a new way to find the element and check that it its on the DOM.

  - You will see and other error message of a deprecated method, "Material-UI: theme.spacing.unit usage has been deprecated. It will be removed in v5. You can replace `theme.spacing.unit * y` with `theme.spacing(y)`".

  ```jsx
  const styles = (theme: Theme) => ({
    paper: {
      width: theme.spacing.unit * 50,
      [theme.breakpoints.down("xs")]: { width: "75%" },
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
      margin: "auto",
    },
    newBudgetBtn: {
      [theme.breakpoints.down("xs")]: { width: "100%" },
    },
  });
  ```

  ```jsx
  const styles = (theme: Theme) => ({
    paper: {
      width: theme.spacing(50),
      [theme.breakpoints.down("xs")]: { width: "75%" },
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(4),
      margin: "auto",
    },
    newBudgetBtn: {
      [theme.breakpoints.down("xs")]: { width: "100%" },
    },
  });
  ```

