import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from '../Components/Button'
import { CustomTextInput } from '../Components/HomeScreen2/CustomTextInput'

export const RegisterScreen = ({ navigation: { navigate, goBack }}:any) => {
  return (
    <View style={ styles.MainView }>
        <View style={ styles.HeaderCont }>
          <View style={ styles.Ovalo } />
          <Text style={styles.Title}>Registrase</Text>
        </View>
        <View style={ styles.Inputs }>
          <CustomTextInput title='Usuario' isPass={false} placeHolder={'Ingrese el usuario'}  />
          <CustomTextInput title='Email' isPass={false} placeHolder={'Ingrese el usuario'}  />
          <CustomTextInput title='Contraseña' isPass placeHolder={'Ingrese el usuario'}  />
          <CustomTextInput title='Confirmar Contraseña' isPass placeHolder={'Ingrese el usuario'}  />
        </View>
        <View style={ styles.ButtonsCont}>
          <Button text={"Registrarse"} color={'#0036A2'} nav={() => navigate("Register")}  />
          <Button text={"Ya tienes cuenta?"} color={'#009C1C'} nav={() => goBack()} />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  MainView:{
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
  HeaderCont:{
    height: '25%',
    backgroundColor: '#0036A2',
    alignItems: 'center',
    justifyContent: 'center'
  },
  Ovalo:{
    height: 230,
    width: 230,
    backgroundColor: '#0036A2',
    position: 'relative',
    borderRadius: 150,
    bottom: -75,
    transform: [{scaleX: 2.5}, {scaleY:0.7}],
    zIndex: 10
  },
  Title:{
    fontSize: 45,
    position: 'absolute',
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    top: 110,
    zIndex: 11
  },
  Inputs:{
    backgroundColor: '#fff',
    width: '100%',
    height: 500,
    top: 42
  },
  ButtonsCont: {
    top: 30
  }
})