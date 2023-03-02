import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {ExpenseP, Expenses} from '../Data/Data';
import {GetExpenses, UpdateExpense} from '../Data/Database';
import {GetTotal} from './SumExpenses';

export function GetExpenseHook(db: any) {
  const [expenses, setExpenses] = useState<any>([]);
  const [expensesTm, setExpensesTm] = useState(expenses);
  const [search, setSearch] = useState('');
  const [searchM, setSearchM] = useState(0);
  const [searchM2, setSearchM2] = useState(10000);
  const [total, setTotal1] = useState(0);

  const focus = useCallback(() => {
    setExpenses([]);
    const getExpense = async () => {
      try {
        const expensesDB = await GetExpenses(db);
        setExpenses(expensesDB);
        setExpensesTm(expensesDB);
      } catch {
        console.log('Error');
      }
    };
    getExpense();
  }, [db]);

  useEffect(() => {
    setTotal1(GetTotal(expensesTm));
  }, [expensesTm]);

  useFocusEffect(focus);

  const SearchByDate = (dateP: string, date2P: string) => {
    let date1 = dateP.split('/');
    let date2 = date2P.split('/');
    let dateN = Number(date1[2] + date1[1] + date1[0]);
    let dateN2 = Number(date2[2] + date2[1] + date2[0]);
    let expensesTmp: any = [];

    if (search === '' || search === null) {
      expenses.map((ex: any, index: number) => {
        let dateArr = ex.date.toString().split('/');
        let dateNu = Number(dateArr[2] + dateArr[1] + dateArr[0]);

        if (dateNu >= dateN && dateNu <= dateN2) expensesTmp.push(ex);
      });
    } else {
      expensesTm.map((ex: any, index: number) => {
        let dateArr = ex.date.toString().split('/');
        let dateNu = Number(dateArr[2] + dateArr[1] + dateArr[0]);

        if (dateNu >= dateN && dateNu <= dateN2) expensesTmp.push(ex);
      });
    }

    setExpensesTm(expensesTmp);

    if (searchM < 0) {
      // setExpensesTm(expenses);
      return;
    }
    setExpensesTm(
      expensesTmp.filter(
        (ex: any) =>
          Number(ex.amount) >= searchM && Number(ex.amount) <= searchM2,
      ),
    );
  };

  const ClearFilters = () => {
    setExpensesTm(expenses);
    setSearch('');
    setSearchM(0);
    setSearchM2(10000);
  };

  const SearchExpense = (value: string) => {
    setExpensesTm(expensesTm.filter((c: ExpenseP) => c.name.includes(value)));
    if (value.length <= 0) setExpensesTm(expenses);

    setSearch(value);
  };

  return {
    expenses,
    setExpenses,
    total,
    setTotal1,
    expensesTm,
    SearchExpense,
    SearchByDate,
    setSearchM,
    setSearchM2,
    ClearFilters,
    searchM,
    searchM2,
  };
}
