export const DataTypes: any = ['Credito', 'Debito', 'Efectivo'];

export interface expenseI {
  Date: string;
  Name: string;
  Amount: number;
  type: string;
}

export interface Expense {
  Id: number;
  Name: string;
  Date: string;
  Amount: number;
  Type: number;
  Description?: string;
  nameCard: string;
}

export interface ExpenseP {
  id: number;
  name: string;
  date: string;
  amount: number;
  type: number;
  description?: string;
  nameCard: string;
}

export const Expenses: expenseI[] = [];

export interface propsDate {
  param: {
    date: Date;
    date2: string;
    open: boolean;
    setDate: (Date: Date) => void;
    setOpen: (bool: boolean) => void;
    styles2?: React.CSSProperties;
    isAdd: boolean;
  };
  changeInput: (value: string) => void;
}

export interface propsDateSub {
  date: Date;
  date2: string;
  open: boolean;
  setDate: (Date: Date) => void;
  setOpen: (bool: boolean) => void;
  styles2?: React.CSSProperties;
  isAdd: boolean;
}
