import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const Total = ({Amount}: any) => {
  return (
    <View style={StylesT.Container}>
      <View style={StylesT.TextCon}>
        <Text style={StylesT.Total}>Total: </Text>
      </View>
      <View style={{width: '60%', height: '100%', justifyContent: 'center'}}>
        <Text style={StylesT.TotalText}>$ {Amount}</Text>
      </View>
    </View>
  );
};

const StylesT = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
    width: '100%',
    height: '8%',
    marginTop: 5,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  },
  TextCon: {
    width: '40%',
    height: '100%',
    // backgroundColor: "#04ff00",
    justifyContent: 'center',
  },
  Total: {
    textAlign: 'left',
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: 15,
    fontFamily: 'ChakraPetch-Regular',
  },
  TotalText: {
    textAlign: 'right',
    marginHorizontal: 5,
    fontSize: 34,
    fontFamily: 'ChakraPetch-Regular',
  },
});
