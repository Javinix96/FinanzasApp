import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { TouchableOpacity,StyleSheet, Text } from 'react-native'
import DatePicker from 'react-native-date-picker';
import { propsDate } from '../../Data/Data';


export const DatePickerButton = (param:propsDate) => {

  const {date, setDate,date2,open, setOpen, isAdd} = param.param;
  const {changeInput} = param;

  useEffect(() => {
    changeInput(date2);
  },[date2]);

  return (
  <TouchableOpacity onPress={() => setOpen(true)}  style={!isAdd ? styles.ButtonDate : styles.Input2} >
    <Text style={!isAdd ? styles.TextDate : {...styles.TextDate, textAlign: 'center', padding: 0,fontSize:28}}>
      {date2}
    </Text>
    <DatePicker modal date={date} mode={"date"} open={open} onConfirm={(da) =>{ setDate(da); setOpen(false); } } onCancel={() => setOpen(false)}/>
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  ButtonDate:{
    width: "40%",
    height: 50,
    margin:5,
    backgroundColor: 'white',
    borderRadius:5,
    justifyContent: 'center',
    alignItems: 'center'
   },
   TextDate:{
    fontSize: 30,
    padding:0,
    textAlign: 'left',
    color: '#6C0000',
    fontFamily: 'ChakraPetch-Regular'
   },
   Input2:{
    lineHeight:10,
    width: '70%',
    height: 40,
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderEndWidth:2,
    borderStartWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#CECECE',
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    fontSize: 18
},

})
