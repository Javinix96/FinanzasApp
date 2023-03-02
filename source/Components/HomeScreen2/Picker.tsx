import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import { DataTypes } from '../../Data/Data';
import Icon from 'react-native-vector-icons/Ionicons';

interface props {
  openPick: boolean;
  setOpenPick: (s: any) => void;
  isFlex: boolean;
  getType1: (value: string) => void | undefined;
  DataTypes: Array<string>;
}

export const Picker = ({
  openPick,
  setOpenPick,
  isFlex = false,
  getType1,
  DataTypes,
}: props) => {
  const [type, setType] = useState('Seleccionar...');

  const getTypeI = (data: string) => {
    if (data === 'Credito') return '1';
    if (data === 'Debito') return '2';
    if (data === 'Efectivo') return '3';

    return '';
  };

  useEffect(() => {
    if (getType1 !== null) getType1(getTypeI(type));
  }, [type]);

  return (
    <TouchableOpacity
      style={
        !isFlex
          ? styles.PickerButton
          : {
              ...styles.PickerButton,
              width: '70%',
              borderColor: '#CECECE',
              borderWidth: 1,
            }
      }
      activeOpacity={1}
      onPress={() => setOpenPick(!openPick)}>
      <Text style={styles.HoldT}>{type}</Text>
      <Text style={styles.IconT}>
        <Icon name="caret-down-outline" size={35}></Icon>
      </Text>
      <View style={{...styles.PickerBody, display: openPick ? 'flex' : 'none'}}>
        {DataTypes.map((item: string, index: number) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.ButtonItems}
              onPress={() => {
                setType(item);
                setOpenPick(!openPick);
              }}>
              <Text style={{fontSize: 30, fontWeight: 'bold'}}>{item}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  PickerButton: {
    //     height: 50,
    backgroundColor: 'white',
    width: '43%',
    position: 'relative',
    marginVertical: 5,
    borderRadius: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    alignContent: 'space-between',
    zIndex: 5,
    // overflow: 'hidden'
    // left: "43%",
    // top: "-40%"
  },
  HoldT: {
    fontSize: 20,
    textAlign: 'center',
  },
  IconT: {
    textAlign: 'right',
    alignContent: 'space-between',
  },
  PickerBody: {
    backgroundColor: '#ECECEC',
    width: '100%',
    //     height: 170,
    position: 'absolute',
    top: 48,
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
    // overflow: 'scroll'
  },
  ButtonItems: {
    // backgroundColor: '#e3e3e3',
    width: '100%',
    height: 50,
    marginTop: 5,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 6,
  },
});
