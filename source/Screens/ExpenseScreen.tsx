import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Header } from '../Components/HomeScreen2/Header';
import { useDBContext } from '../Context/DBContext';
import { DeleteExpense } from '../Data/Database';
import { RootParams } from '../navigator/Navigator';

interface Props extends StackScreenProps<RootParams,'Expense'>{};

export const ExpenseScreen = ({route,navigation}:Props) => {

     const {Id,Name, Date, Amount, Type, Description} = route.params;
     const db = useDBContext();

     const DeleteExpense1 = async() =>{
      await DeleteExpense(db,Id);
      navigation.pop();
     }

  return (
   <View style={{alignItems: 'center'}}>
     <Header Title={Name} ShowIcon={false} isExpense />
     <TouchableOpacity style={styles.ButtonDel} onPress={() => DeleteExpense1()}>
        <Text style={styles.ButtonText}>Borrar Gasto</Text>
     </TouchableOpacity>
   </View>
  )
}

const styles = StyleSheet.create({
  ButtonDel:{
    backgroundColor: 'red',
    width: '85%',
    height: 60,
    margin:10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ButtonText:{
    fontSize: 30,
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  }
});