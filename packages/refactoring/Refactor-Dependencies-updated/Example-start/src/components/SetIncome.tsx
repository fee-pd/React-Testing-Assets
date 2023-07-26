import React, { useState } from 'react';
import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Modal,
  Typography,
} from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles,
  Theme,
  WithStyles,
} from '@material-ui/core';

const addIncomeBtnTheme = createMuiTheme({
  palette: {
    secondary: green,
  },
});

const styles = (theme: Theme) => ({
  paper: {
    width: theme.spacing.unit * (50),
    [theme.breakpoints.down('xs')]: { width: '75%' },
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * (4),
    margin: 'auto',
  },
  newIncomeBtn: {
    [theme.breakpoints.down('xs')]: { width: '100%' },
  },
});

interface SetIncomeProps extends WithStyles<typeof styles> {
  setIncome: (income: number) => void;
}

const SetIncome: React.FC<SetIncomeProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [income, setIncome] = useState(0);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setIncome(0);
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setIncome(parseInt(event.target.value, 10));

  const handleSetIncome = () => {
    props.setIncome(income);
    handleClose();
  };

  const { classes } = props;

  return (
    <>
      <MuiThemeProvider theme={addIncomeBtnTheme}>
        <Button
          variant="contained"
          className={classes.newIncomeBtn}
          color="secondary"
          onClick={handleOpen}
        >
          Set Income
        </Button>
      </MuiThemeProvider>
      <Modal
        aria-labelledby="Set Income Amount"
        aria-describedby="Set's the income amount"
        open={open}
        onClose={handleClose}
      >
        <div className={classes.paper}>
          <Typography variant="body1" id="modal-title">
            Enter your total income.
          </Typography>

          <FormControl
            style={{
              display: 'block',
              marginTop: '10px',
              marginBottom: '20px',
            }}
          >
            <InputLabel htmlFor="adornment-amount">Amount</InputLabel>
            <Input
              type="number"
              placeholder="Enter a number"
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
          <MuiThemeProvider theme={addIncomeBtnTheme}>
            <Button
              disabled={income <= 0}
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleSetIncome}
            >
              Submit
            </Button>
          </MuiThemeProvider>
        </div>
      </Modal>
    </>
  );
};

export default withStyles(styles)(SetIncome);
