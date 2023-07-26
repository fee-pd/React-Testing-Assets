import React from 'react';
import {
  Grid,
  IconButton,
  LinearProgress,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import ArrowRight from '@material-ui/icons/ArrowRight';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';

const styles = (theme: Theme) => ({
  root: { [theme.breakpoints.down('xs')]: { fontSize: '1rem' } },
  span: { paddingRight: '20px' },
  primary: {
    fontSize: '1.3125rem',
    [theme.breakpoints.down('xs')]: { fontSize: '1rem' },
  },  
});

interface BudgetProps extends WithStyles<typeof styles> {
  categoryName: string;
  totalBudget: number;
  setAmtSpent: (id: string, action: 'add' | 'subtract') => void;
  amtSpent: number;
  deleteBudget: (id: string, totalBudget: number) => void;
  id: string;
}

const Budget: React.FC<BudgetProps> = ({
  classes,
  categoryName,
  totalBudget,
  setAmtSpent,
  amtSpent,
  deleteBudget,
  id,
}) => {
  const addExpense = () => {
    return amtSpent + 5 <= totalBudget ? setAmtSpent(id, 'add') : null;
  };

  const subtractExpense = () => {
    return amtSpent - 5 >= 0 ? setAmtSpent(id, 'subtract') : null;
  };

  const handleDeleteBudget = () => deleteBudget(id, totalBudget);

  const normalize = (value: number) =>
    ((value - 0) * 100) / (totalBudget - 0);

  return (
    <ListItem style={{ paddingRight: 0, paddingLeft: 0 }} divider>
      <Grid alignItems="center" container>
        <Grid item xs={1}>
          <DeleteForeverTwoToneIcon
            aria-label="trash can"
            onClick={handleDeleteBudget}
            // className={classes.icon}
          />
        </Grid>
        <Grid item xs={3}>
          <ListItemText
            classes={{ primary: classes.primary }}
            primary={categoryName}
          />
        </Grid>

        <Grid style={{ textAlign: 'right' }} item xs={8}>
          <Typography variant="h6" classes={{ root: classes.root }}>
            <IconButton aria-label="ArrowLeft" onClick={subtractExpense}>
              <ArrowLeft />
            </IconButton>
            ${amtSpent}
            <IconButton aria-label="ArrowRight" onClick={addExpense}>
              <ArrowRight />
            </IconButton>
            <span className={classes.span}>of</span>${totalBudget}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <LinearProgress
            style={{ width: '100%', height: '10px', background: 'green' }}
            color="secondary"
            variant="determinate"
            value={normalize(amtSpent)}
          />
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default withStyles(styles)(Budget);
