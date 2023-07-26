import React, { useState } from "react";
import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Modal,
  Select,
  Typography,
} from "@material-ui/core";
import { withStyles, Theme, WithStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";
import categories from "../data/categories";
import { IBudget } from "../types/types";

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

interface CreateNewBudgetProps extends WithStyles<typeof styles> {
  addNewBudget: (newBudget: IBudget) => void;
  setTotalSpending: (amount: number) => void;
}

const CreateNewBudget: React.FC<CreateNewBudgetProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setCategory("");
    setAmount(0);
    setOpen(false);
  };

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { name, value } = event.target;
    if (name === "category") {
      setCategory(value as string);
    } else if (name === "amount") {
      setAmount(parseInt(value as string, 10));
    }
  };

  const handleAddNewBudget = () => {
    const newAmount = Math.ceil(amount / 5) * 5;
    const id = uuidv4();
    props.addNewBudget({ id, category, amount: newAmount, amtSpent: 0 });
    props.setTotalSpending(newAmount);
    handleClose();
  };

  const renderBudgetOptions = () => {
    return categories.map((category) => (
      <option key={category} value={category}>
        {category}
      </option>
    ));
  };

  const { classes } = props;

  return (
    <>
      <Button
        variant="contained"
        className={classes.newBudgetBtn}
        color="primary"
        onClick={handleOpen}
      >
        Create New Budget
      </Button>
      <Modal
        aria-labelledby="Create New Budget"
        aria-describedby="Create's a new budget"
        open={open}
        onClose={handleClose}
      >
        <div className={classes.paper}>
          <Typography variant="body1" id="modal-title">
            Select a category and enter a budget amount.
          </Typography>

          <FormControl
            style={{
              width: "181px",
              marginTop: "10px",
              marginBottom: "20px",
            }}
          >
            <InputLabel htmlFor="category-native-simple">Category</InputLabel>
            <Select
              native
              value={category}
              onChange={handleChange}
              inputProps={{
                name: "category",
                id: "category-native-simple",
              }}
            >
              <option value="" />
              {renderBudgetOptions()}
            </Select>
          </FormControl>

          <FormControl style={{ display: "block", marginBottom: "20px" }}>
            <InputLabel htmlFor="adornment-amount">Amount</InputLabel>
            <Input
              type="number"
              inputProps={{
                name: "amount",
                id: "amount-native-simple",
              }}
              placeholder="Enter a number"
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
            <Typography color="error" variant="body1">
              * Budgets must be in increments of 5. {<br />}* Amounts less than
              5 will default to $5.
            </Typography>
          </FormControl>
          <Button
            disabled={!amount || !category}
            fullWidth
            variant="contained"
            color="secondary"
            onClick={handleAddNewBudget}
          >
            Add Budget
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default withStyles(styles)(CreateNewBudget);
