import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDBContext} from '../../Context/DBContext';
import {ExpenseP} from '../../Data/Data';
import {ExpenseC} from './Expense';

interface props {
  Expenses: ExpenseP[];
  height: any;
}

export const SpendsHolder = ({Expenses, height}: props) => {
  const db = useDBContext();
  const [arr2, setArr] = useState<Array<any>>([]);
  let arr: any = [];

  // const delay = (ms:number) => new Promise(resolve => setTimeout(resolve,ms));
  useEffect(() => {
    let i = 0;

    if (Expenses.length <= 0) return;
    setArr([]);
    const interval = setInterval(() => {
      if (i >= Expenses.length - 1) clearInterval(interval);
      setArr(err => [...err, Expenses[i]]);
      i++;
    }, 200);

    return () => clearInterval(interval);
  }, [Expenses]);

  return (
    <View style={{...styleH.Holder, height}}>
      <ScrollView
        style={{flex: 1}}
        centerContent={true}
        alwaysBounceVertical
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
        <View style={{flex: 1}}>
          {arr2.map((ex: any, index: number) => {
            // console.log(index);
            return (
              <ExpenseC
                key={ex.id}
                Id={ex.id}
                Name={ex.name}
                Date={ex.date}
                Amount={ex.amount}
                Type={ex.typePayment}
                Description={ex.description}
                nameCard={ex.nameCard}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styleH = StyleSheet.create({
  Holder: {
    backgroundColor: 'white',
    width: '100%',
    height: '70%',
    position: 'relative',
    marginTop: 10,
    zIndex: -1,
  },
});
