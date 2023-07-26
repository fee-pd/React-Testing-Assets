# react-testing-library

```
npm i
```
test('SetIncome, given income amount, sets income', () => {
  render(<BudgetApp />);

  setOneDollarIncome();
  const leftOverBudget = screen.getByText(/left over:/i);
  const leftOverBudgetAmount = within(leftOverBudget).getByText(/\$1/i);

  expect(leftOverBudgetAmount).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: /income: \$

