import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import BudgetList from './components/BudgetList';
import BudgetSummary from './components/BudgetSummary';
import Chart from './components/Chart';
import CreateNewBudget from './components/CreateNewBudget';
import SetIncome from './components/SetIncome';
import  { IBudget } from './types/types';
import { createStyles, Theme } from '@material-ui/core';


const styles = (theme: Theme) => createStyles({
  layout: { [theme.breakpoints.up('sm')]: { margin: 'auto' } },
  chart: { [theme.breakpoints.down('xs')]: { display: 'none' } },
});

interface AppProps extends WithStyles<typeof styles> {}

const App: React.FC<AppProps> = ({ classes }) => {
  const [income, setIncome] = useState<number>(0);
  const [spending, setSpending] = useState<number>(0);
  const [budgets, setBudgets] = useState<IBudget[]>([]);

  const setTotalSpending = (newBudgetTotal: number) => {
    setSpending(prevSpending => prevSpending + newBudgetTotal);
  };

  const addNewBudget = (newBudget: IBudget) => {
    setBudgets(prevBudgets => [...prevBudgets, newBudget]);
  };

  const deleteBudget = (id: string, budgetTotal: number) => {
    setBudgets(prevBudgets => prevBudgets.filter(budget => budget.id !== id));
    setSpending(prevSpending => prevSpending - budgetTotal);
  };

  const setAmtSpent = (id: string, expenseAction: 'add' | 'subtract') => {
    setBudgets(prevBudgets => prevBudgets.map(budget =>
      budget.id === id
        ? { ...budget, amtSpent: expenseAction === 'add' ? budget.amtSpent + 5 : budget.amtSpent - 5 }
        : budget
    ));
  };

  return (
    <Grid
      className={classes.layout}
      style={{ textAlign: 'center', maxWidth: '600px' }}
      container
      spacing={24}  
    >
      <Grid item xs={12} style={{ paddingBottom: 0 }}>
          <AccountBalanceIcon style={{ fontSize: '8rem' }} />
        </Grid>

        <Grid item xs={12} style={{ paddingTop: 0 }}>
          <BudgetSummary
            income={income}
            spending={spending}
            leftover={income - spending}
          />
        </Grid>

        <Grid
          item
          xs={12}
          className={classes.chart}
          style={{ paddingTop: 0, paddingBottom: 10 }}
        >
          <Chart data={budgets} />
        </Grid>

        <Grid item xs={12} sm={6} style={{ paddingTop: 0 }}>
          <SetIncome setIncome={setIncome} />
        </Grid>

        <Grid item xs={12} sm={6} style={{ paddingTop: 0 }}>
          <CreateNewBudget
            setTotalSpending={setTotalSpending}
            addNewBudget={addNewBudget}
          />
        </Grid>

        <Grid item xs={12} style={{ paddingTop: 0 }}>
          <BudgetList
            deleteBudget={deleteBudget}
            setAmtSpent={setAmtSpent}
            budgets={budgets}
          />
        </Grid>
    </Grid>
  );
}

export default withStyles(styles)(App);