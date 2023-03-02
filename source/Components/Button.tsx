import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

interface ButtonsProps{
    text:string;
    color: string;
    login: () => void ;
}

export const Button = ( {text,color,login}:ButtonsProps) => {
  return (
    <TouchableOpacity activeOpacity={0.7} 
     onPress={login}
    >
        <View style={ {...style.Container, backgroundColor: color}}>
            <Text style={style.Text}>{text}</Text>
        </View>
    </TouchableOpacity>
  )
}


const style = StyleSheet.create({
    Container:{
      height: 60,
      borderRadius: 15,   
      justifyContent: 'center',
      marginHorizontal: 10,
      marginVertical: 10

    },
    Text:{
      fontSize: 28,
      alignSelf: 'center',
      color: 'white',
      
    }
  });