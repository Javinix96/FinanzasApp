import React, {useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {DatePickerButton} from '../Components/HomeScreen2/DatePickerButton';
import {Header} from '../Components/HomeScreen2/Header';
import {SpendsHook} from '../hooks/SpendsHook';
import {Picker} from '../Components/HomeScreen2/Picker';
import {useDBContext} from '../Context/DBContext';
import {InsertExpense} from '../Data/Database';
import {StackScreenProps} from '@react-navigation/stack';
import {DataTypes} from '../Data/Data';
import {ViewCard} from '../Components/addScreen/ViewCard';

interface Props extends StackScreenProps<any, any> {}

export const AddScreen = ({navigation}: Props) => {
  const [expense, setExpense] = useState({
    name: '',
    date: '',
    description: '',
    type: '',
    amount: '',
    nameCard: '',
  });
  const {open, setOpen, date, date2, setDate, openPick, setOpenPick} =
    SpendsHook();
  const props = {
    date,
    setDate,
    date2,
    open,
    setOpen,
    isAdd: true,
  };

  const [cardName, setCardName] = useState('');

  const db = useDBContext();

  const getInput = (value: any, field: string) => {
    setExpense({
      ...expense,
      [field]: value,
    });
  };

  const AddExpense = async () => {
    if (expense.name === '' || expense.name === null) {
      Alert.alert('Error', 'Llene el campo nombre');
      return;
    }
    if (expense.date === '' || expense.date === null) {
      Alert.alert('Error', 'Llene el campo fecha');
      return;
    }
    if (expense.type === '' || expense.type === null) {
      Alert.alert('Error', 'Seleccione el tipó de pago');
      return;
    }
    if (expense.amount === '' || expense.amount === null) {
      Alert.alert('Error', 'No es posible un gasto con cantidad 0');
      return;
    }
    if (expense.type === '1' || expense.type === '2') {
      if (cardName === '' || cardName === null) {
        Alert.alert('Error', 'Seleccione tarjeta o agregue tarjeta');
        return;
      }
    }
    try {
      InsertExpense(
        db,
        expense.name,
        expense.date,
        expense.description,
        expense.type,
        expense.amount,
        expense.nameCard,
      );
      await Alert.alert('Exito', 'Se inserto el dato correctamente');
      navigation.pop();
    } catch {
      Alert.alert('Error', 'Hubo un error al isertar el dato');
    }
  };

  // useEffect(() => {
  //      GetInput(date2,'date');
  // },[date2])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Header
        Title="Add"
        ShowIcon={false}
        isExpense={false}
        hasFilter={false}
        setOpenF={() => {}}
        openF={false}
      />
      <ScrollView style={{height: '100%'}}>
        <View style={{height: '100%'}}>
          <View style={styles.firstIn}>
            <View style={{width: '75%'}}>
              <Text
                style={{
                  fontSize: 24,
                  textAlign: 'left',
                  fontWeight: 'bold',
                  margin: 10,
                }}>
                Nombre y Fecha
              </Text>
            </View>
            <TextInput
              style={styles.Input1}
              placeholder={'Ingrese nombre'}
              onChangeText={v => getInput(v, 'name')}
            />
            <View style={styles.Line} />
            <DatePickerButton
              param={props}
              changeInput={value => {
                getInput(value, 'date');
              }}
            />
            {/* <TextInput style={styles.Input2} placeholder={"Fecha del Gastonnn"}/> */}
          </View>
          <View style={styles.firstIn}>
            <View style={{width: '75%'}}>
              <Text
                style={{
                  fontSize: 24,
                  textAlign: 'left',
                  fontWeight: 'bold',
                  margin: 10,
                }}>
                Descripcion
              </Text>
            </View>
            <TextInput
              style={styles.Descrep}
              placeholder={'Ingrese descripción'}
              editable
              multiline
              onChangeText={value => {
                getInput(value, 'description');
              }}
            />
          </View>
          <View
            style={
              !openPick
                ? {...styles.firstIn}
                : {...styles.firstIn, justifyContent: 'flex-start', height: 300}
            }>
            <View style={{width: '75%'}}>
              <Text
                style={{
                  fontSize: 24,
                  textAlign: 'left',
                  fontWeight: 'bold',
                  margin: 10,
                }}>
                Tipo de Pago
              </Text>
            </View>
            <Picker
              openPick={openPick}
              setOpenPick={setOpenPick}
              isFlex
              getType1={value => {
                getInput(value, 'type');
                setCardName('');
              }}
              DataTypes={DataTypes}
            />
          </View>
          {expense.type && expense.type !== '3' && (
            <ViewCard
              type1={expense.type.toString()}
              setTypeCard={c => {
                setCardName(c);
                getInput(c, 'nameCard');
              }}
            />
          )}

          <View style={styles.firstIn}>
            <View style={{width: '75%'}}>
              <Text
                style={{
                  fontSize: 24,
                  textAlign: 'left',
                  fontWeight: 'bold',
                  margin: 10,
                }}>
                Cantidad:
              </Text>
            </View>
            <TextInput
              style={styles.AmountS}
              placeholder={'Ingrese descripción'}
              keyboardType="numeric"
              onChangeText={value => {
                getInput(value, 'amount');
              }}
            />
          </View>
          <View style={styles.firstIn}>
            <TouchableOpacity
              style={styles.Button}
              activeOpacity={0.9}
              onPress={() => AddExpense()}>
              <Text style={styles.ButtonText}>AGREGAR GASTO</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height: 50}} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  firstIn: {
    // backgroundColor: "#e3e3e3",
    height: 160,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  Input1: {
    // lineHeight:10,
    width: '69.9%',
    height: 50,
    // backgroundColor: 'red',
    borderTopWidth: 2,
    borderEndWidth: 2,
    borderStartWidth: 2,
    borderColor: '#CECECE',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    color: '#000',
    fontSize: 28,
    textAlign: 'center',
  },
  Line: {
    width: '60%',
    height: 1,
    backgroundColor: '#19A8FF',
  },
  Descrep: {
    borderWidth: 1,
    width: '70%',
    height: 100,
    borderColor: '#CECECE',
    borderRadius: 10,
    padding: 3,
  },
  AmountS: {
    borderWidth: 1,
    width: '70%',
    height: 60,
    borderRadius: 10,
    borderColor: '#CECECE',
    fontSize: 30,
    padding: 10,
  },
  Button: {
    backgroundColor: '#004BF7',
    width: '80%',
    height: '50%',
    borderRadius: 20,
    justifyContent: 'center',
  },
  ButtonText: {
    textAlign: 'center',
    width: '100%',
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  CardsView: {
    //     height: 300,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  CardTypes: {
    width: '80%',
    //     height: '100%',
    //     backgroundColor: '#9E9E9E',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  ContainerR: {
    //     backgroundColor: 'red',
    height: 50,
    width: 150,
    justifyContent: 'space-around',
    padding: 6,
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
  CircleOut: {
    width: 30,
    height: 30,
    borderRadius: 20,
    borderColor: '#000',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Circle: {
    width: 18,
    height: 18,
    borderRadius: 20,
    backgroundColor: '#303030',
  },
});
