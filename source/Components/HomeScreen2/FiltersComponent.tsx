import {useEffect, useRef} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {propsDate, propsDateSub} from '../../Data/Data';
import {DatePickerButton} from '../HomeScreen2/DatePickerButton';

interface propsFilter {
  Dates: propsDateSub[];
  Search: () => void;
  setSearchM: (cant: number) => void;
  setSearchM2: (cant: number) => void;
  ClearFilters: () => void;
  search1: string;
  search2: string;
}

export const FiltersComponent = ({
  Dates,
  Search,
  setSearchM,
  setSearchM2,
  ClearFilters,
  search1,
  search2,
}: propsFilter) => {
  const height = useRef(new Animated.Value(-250)).current;

  const growIn = () => {
    Animated.timing(height, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  growIn();
  return (
    <Animated.View
      style={{...styles.Filters, transform: [{translateY: height}]}}>
      <ScrollView>
        <Text
          style={{
            fontSize: 28,
            textAlign: 'left',
            marginHorizontal: 6,
            fontFamily: 'ChakraPetch-Light',
          }}>
          Fechas
        </Text>
        <View style={styles.Dates}>
          <DatePickerButton param={Dates[0]} changeInput={() => {}} />
          <Text
            style={{
              fontSize: 28,
              textAlign: 'center',
              marginHorizontal: 20,
              fontFamily: 'ChakraPetch-Light',
            }}>
            A
          </Text>
          <DatePickerButton param={Dates[1]} changeInput={() => {}} />
        </View>
        <Text
          style={{
            fontSize: 28,
            textAlign: 'left',
            marginHorizontal: 6,
            fontFamily: 'ChakraPetch-Light',
          }}>
          Precio
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
            keyboardType="decimal-pad"
            placeholder="$..."
            style={styles.PriceInput}
            onChangeText={text => {
              setSearchM(Number(text));
            }}
            value={search1}
          />
          <Text
            style={{
              fontSize: 28,
              textAlign: 'left',
              marginHorizontal: 6,
              fontFamily: 'ChakraPetch-Light',
            }}>
            A
          </Text>
          <TextInput
            keyboardType="decimal-pad"
            placeholder="$10000"
            style={styles.PriceInput}
            onChangeText={text => {
              setSearchM2(Number(text));
            }}
            value={search2.toString()}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              fontSize: 28,
              textAlign: 'left',
              marginHorizontal: 6,
              fontFamily: 'ChakraPetch-Light',
            }}>
            BANCO:
          </Text>
          <TextInput style={styles.BankStyle} />
        </View>
      </ScrollView>
      <View style={{width: '100%', flexDirection: 'row'}}>
        <TouchableOpacity style={styles.SearchB} onPress={() => ClearFilters()}>
          <Text style={styles.SearchBText}>Limpiar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.SearchB} onPress={() => Search()}>
          <Text style={styles.SearchBText}>Buscar</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  Filters: {
    width: '97.5%',
    height: '30%',
    backgroundColor: 'white',
    marginTop: 1,
    marginHorizontal: 5,
    justifyContent: 'space-between',
    zIndex: -10,
  },
  Dates: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SearchB: {
    width: '46%',
    height: 60,
    backgroundColor: '#0069DB',
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
  },
  SearchBText: {
    textAlign: 'center',
    fontSize: 38,
    color: 'white',
    textTransform: 'uppercase',
    fontFamily: 'ChakraPetch-Bold',
  },
  PriceInput: {
    width: '45%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    elevation: 10,
    color: 'black',
    fontSize: 24,
    padding: 3,
    fontFamily: 'ChakraPetch-Bold',
    marginRight: 2,
  },
  BankStyle: {
    width: '45%',
    height: 35,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    marginRight: 2,
    color: 'black',
    fontSize: 24,
    fontFamily: 'ChakraPetch-Regular',
  },
});
