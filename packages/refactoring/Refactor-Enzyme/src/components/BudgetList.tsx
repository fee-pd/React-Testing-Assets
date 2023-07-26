import React from "react";
import List from "@material-ui/core/List";
import Budget from "./Budget";
import { IBudget } from "../types/types";

interface BudgetListProps {
  budgets: IBudget[];
  setAmtSpent: (id: string, operation: "add" | "subtract") => void;
  deleteBudget: (id: string, budgetTotal: number) => void;
}

const BudgetList: React.FC<BudgetListProps> = ({
  budgets,
  setAmtSpent,
  deleteBudget,
}) => {
  return (
    <List>
      {budgets.map((budget) => (
        <Budget
          key={budget.id}
          categoryName={budget.category}
          totalBudget={budget.amount}
          setAmtSpent={setAmtSpent}
          amtSpent={budget.amtSpent}
          deleteBudget={deleteBudget}
          id={budget.id}
        />
      ))}
    </List>
  );
};

export default BudgetList;
