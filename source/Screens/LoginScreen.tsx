import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, StyleSheet, Text, Dimensions,  } from 'react-native';
import { Button } from '../Components/Button';
import { CustomTextInput } from '../Components/HomeScreen2/CustomTextInput';
import { LoginHook } from '../hooks/LoginHook';

export const LoginScreen = ({ navigation: { navigate }}:any) => {
  
  const { width, styles, setUser, setPass, Login} = LoginHook(style,navigate);

  return (
    <View style={{...style.ScreenMargin}}>
      <View style={ style.ImgContainer}>
        <View style={ styles } />
        <Text style={ style.Title }>Finanzas {'\n' }App</Text>
      </View>
      <View style={style.Inputs}>
        <CustomTextInput title='Usuario' isPass={false} placeHolder={'Ingrese el usuario'} input={setUser} />
        <CustomTextInput title='Password' isPass placeHolder="Ingrese la contraseña" input={setPass }/>
      </View>
      <View style={ width < 800 ? style.Buttons : style.ButtonsIpad}>
       <Button text={"LOGIN"} color={'#049AFC'} login={() => Login()}  />
       <Button text={"REGISTRARSE"} color={'#FC0404'} login={() => navigate("Register")} />
      </View>
      <View style={style.DownCont}>
        <View style={ width < 800 ? style.Ovalo2 : style.Ovalo2Ipad} />
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  ScreenMargin:{
    marginLeft: 0,
    backgroundColor: 'white',
    flex: 1,
    width: '100%',
  },
  ImgContainer:{
    height: 250,
    backgroundColor: '#0036A2',
    alignItems: 'center',
    justifyContent: 'center'
  },
  Buttons: {
    marginTop: 150,
    top: -20,
    height: 250,
    justifyContent: 'space-around',
  },
  ButtonsIpad: {
    marginTop: 150,
    height: 320,
    top: 50,
    justifyContent: 'space-around'
  },
  Title:{
    fontSize: 50,
    top: 50,
    textAlign: 'center',
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  Ovalo:{
    backgroundColor: '#0036A2',
    width: 230,
    height: 230,
    position: 'absolute',
    bottom: -80,
    borderRadius: 300,
    transform:[
      {scaleX: 2.6},{scaleY: 0.8}
    ]
  },
  OvaloIpad:{
    backgroundColor: '#0036A2',
    width: 230,
    height: 230,
    position: 'absolute',
    bottom: -80,
    borderRadius: 300,
    transform:[
      {scaleX: 6},{scaleY: 0.8}
    ]
  },
  Inputs:{
    height: 300,
    top: 57.3,
    justifyContent: 'space-around'
  },
  DownCont:{
    height: 250,
    width: '100%',
    backgroundColor: '#0036A2',
    position: 'absolute',
    bottom: 0,
    zIndex: -1
  },
  Ovalo2:{
    backgroundColor: '#0036A2',
    width: 230,
    height: 230,
    position: 'relative',
    alignSelf: 'center',
    top: -70,
    left:0,
    borderRadius: 300,
    transform:[
      {scaleX: 2.6},{scaleY: 0.8}
    ]
  },
  Ovalo2Ipad:{
    backgroundColor: '#0036A2',
    width: 230,
    height: 230,
    position: 'absolute',
    top: -30,
    left:300,
    borderRadius: 500,
    transform:[
      {scaleX: 10},{scaleY: 1.7}
    ]
  },
});

