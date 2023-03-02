import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

interface InputProps{
  title: string;
  isPass: boolean;
  placeHolder?: string;
  input?: any;
}

export const CustomTextInput = ({title,isPass, placeHolder,input}: InputProps) => {
  return (
    <View style={{justifyContent: 'space-around'}}>
      <Text style={styles.Text}>{title}:</Text>
      <TextInput
        style={styles.InputStyle}
        placeholder={placeHolder}
        secureTextEntry={isPass}
        onChangeText={(value) => input(value)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
InputStyle:{
  borderWidth:0.5,
  marginTop: 20,
  height: 60,
  marginHorizontal: 10,
  borderRadius: 10,
  fontSize: 32,
  borderColor: 'rgba(0,0,0,0.2)',
  paddingLeft: 10
},
Text:{
  fontSize: 24,
  marginLeft: 10,
  marginTop: 10,
  textTransform: 'uppercase',
  fontWeight: 'bold'
}
});
