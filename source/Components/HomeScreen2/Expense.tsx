import {useNavigation} from '@react-navigation/native';
import React, {useRef} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Expense} from '../../Data/Data';

export const ExpenseC = (param: Expense) => {
  const {Name, Date, Amount, Type, nameCard} = param;
  const nav = useNavigation<any>();

  const SetType = (type: number) => {
    if (type === 1) return 'Credito';
    else if (type === 2) return 'Debito';
    else return 'Efectivo';
  };

  const GetColor = (amount: number) => {
    if (amount < 500) return '#0FE504';
    else if (amount > 500 && amount < 1001) return '#FFA200';
    return '#FF0000';
  };

  const height = useRef(new Animated.Value(-250)).current;

  const growIn = () => {
    Animated.timing(height, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  growIn();

  const CutString = (wordN: string, number: number) => {
    let word = '';

    if (wordN === null) return '';
    for (let i = 0; i < number; i++) word += wordN.charAt(i);

    return word.toUpperCase();
  };

  return (
    <Animated.View
      style={{...styleEx.Expense, transform: [{translateX: height}]}}>
      <TouchableOpacity
        style={{...styleEx.Expense, borderBottomColor: GetColor(Amount)}}
        activeOpacity={0.8}
        onPress={() => nav.navigate('Expense', param)}>
        <View style={styleEx.Container}>
          <Text style={styleEx.Title}>{Name}</Text>
        </View>
        <View style={styleEx.Spacer}>
          <Text style={styleEx.Type}>{SetType(Type).toUpperCase()}</Text>
          <Text style={styleEx.Date}>{Date}</Text>
          <Text style={styleEx.Date}>{CutString(nameCard, 5)}</Text>
        </View>
        <View style={styleEx.PriceContainer}>
          <Text
            style={{
              ...styleEx.Type,
              fontSize: 25,
              textAlign: 'right',
              color: GetColor(Amount),
            }}>
            {'$' + Amount}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styleEx = StyleSheet.create({
  Expense: {
    width: '99%',
    height: 60,
    //  backgroundColor: 'red',
    flexDirection: 'row',
    marginTop: 0,
    margin: 2,
    borderRadius: 14,
    borderBottomWidth: 1,
  },
  Container: {
    width: '36%',
    height: '100%',
    display: 'flex',
    //  flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Title: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    width: '100%',
    fontFamily: 'ChakraPetch-Regular',
    flexWrap: 'wrap',
    //  backgroundColor: 'white'
  },
  Date: {
    fontSize: 18,
    textAlign: 'left',
    marginLeft: 10,
    fontFamily: 'ChakraPetch-Regular',
    // backgroundColor: 'red',
  },
  Spacer: {
    width: '39%',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue',
  },
  PriceContainer: {
    width: '25%',
    height: '100%',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  Type: {
    fontSize: 18,
    textAlign: 'left',
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'ChakraPetch-Light',
    fontStyle: 'italic',
    textDecorationStyle: 'solid',
    textDecorationColor: 'black',
    // backgroundColor: 'red',
    //  paddingRight: 3,
  },
});
