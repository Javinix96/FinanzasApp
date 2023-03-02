import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {LoginScreen} from '../Screens/LoginScreen';
import {RegisterScreen} from '../Screens/RegisterScreen';
import {BottomNavigator} from './BottomNavigator';
import {AddScreen} from '../Screens/AddScreen';
import {ExpenseScreen} from '../Screens/ExpenseScreen';
import {Expense} from '../Data/Data';

export type RootParams = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Add: undefined;
  Expense: Expense;
};

const stack = createStackNavigator<RootParams>();

export const Navigator = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <stack.Screen name="Home" component={BottomNavigator} />
      <stack.Screen name="Login" component={LoginScreen} />
      <stack.Screen name="Register" component={RegisterScreen} />
      <stack.Screen name="Add" component={AddScreen} />
      <stack.Screen name="Expense" component={ExpenseScreen} />
    </stack.Navigator>
  );
};
