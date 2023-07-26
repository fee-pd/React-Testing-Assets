import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { withStyles, WithStyles, createStyles } from '@material-ui/core';

const styles = () =>
  createStyles({
    card: { textAlign: 'center' },
  leftoverText: { fontWeight: 'bold' },
  debt: { color: '#f44336' },
  profit: { color: '#4caf50' },
  neutral: { color: '#9E9E9E' },
  });

interface BudgetSummaryProps extends WithStyles<typeof styles> {
  income: number;
  spending: number;
  leftover: number;
}

const BudgetSummary: React.FC<BudgetSummaryProps> = ({
  classes,
  income,
  spending,
  leftover,
}) => {
  const getLeftOverClass = () => {
    if (leftover > 0) {
      return classes.profit;
    } else if (leftover === 0) {
      return classes.neutral;
    }
    return classes.debt;
  };

  return (
    <>
      <Card className={classes.card} raised={true}>
        <CardContent>
          <Typography variant="title">You've budgeted...</Typography>
          <Typography variant="subheading">Income: ${income}</Typography>
          <Typography variant="subheading">
            Spending: <span className={classes.debt}>${spending}</span>
          </Typography>
          <hr />
          <Typography className={classes.leftoverText}>
            Left over: <span className={getLeftOverClass()}>${leftover}</span>
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default withStyles(styles)(BudgetSummary);
