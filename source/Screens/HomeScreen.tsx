import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Header} from '../Components/HomeScreen2/Header';
import {SpendsHook} from '../hooks/SpendsHook';
import {SpendsHolder} from '../Components/HomeScreen2/SpendsHolder';
import {Total} from '../Components/HomeScreen2/Total';
import {StackScreenProps} from '@react-navigation/stack';
import {RootParams} from '../navigator/Navigator';
import {useDBContext} from '../Context/DBContext';
import {GetExpenseHook} from '../hooks/ExpensesHook';
import {FiltersComponent} from '../Components/HomeScreen2/FiltersComponent';
import {propsDateSub} from '../Data/Data';

interface Props extends StackScreenProps<RootParams, 'Home'> {}

export const HomeScreen = ({navigation}: Props) => {
  const {
    setSearch,
    open,
    setOpen,
    date,
    date2,
    setDate,
    openF,
    setOpenF,
    date3,
    setDate3,
    open2,
    setOpen2,
    date4,
    setDate4,
  } = SpendsHook();

  const db = useDBContext();

  const {
    total,
    SearchExpense,
    expensesTm,
    SearchByDate,
    setSearchM,
    setSearchM2,
    ClearFilters,
    searchM,
    searchM2,
  } = GetExpenseHook(db);

  const props: propsDateSub = {
    date,
    setDate,
    date2,
    open,
    setOpen,
    isAdd: false,
  };
  const props2: propsDateSub = {
    date: date3,
    setDate: setDate3,
    date2: date4,
    open: open2,
    setOpen: setOpen2,
    isAdd: false,
  };

  const propsF: propsDateSub[] = [{...props}, {...props2}];

  return (
    <View style={{width: '100%', height: '100%'}}>
      <Header
        Title="Gastos"
        ShowIcon
        Navigation={navigation}
        isExpense={false}
        hasFilter
        setOpenF={x => setOpenF(x)}
        openF={openF}
      />
      <TextInput
        style={styles.InputS}
        placeholder="Buscar..."
        placeholderTextColor={'rgba(0,0,0,0.5)'}
        onChangeText={text => {
          setSearch(text);
          SearchExpense(text);
        }}
      />
      {openF && (
        <FiltersComponent
          Dates={propsF}
          Search={() => SearchByDate(date2, date4)}
          setSearchM={mon => setSearchM(mon)}
          setSearchM2={mon => setSearchM2(mon)}
          ClearFilters={() => ClearFilters()}
          search1={searchM.toString()}
          search2={searchM2.toString()}
        />
      )}
      <SpendsHolder Expenses={expensesTm} height={openF ? '40%' : '70%'} />
      <Total Amount={total} />
    </View>
  );
};

const styles = StyleSheet.create({
  SearchList: {
    width: '100%',
    height: 60,
    // backgroundColor: "red",
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  InputS: {
    height: '7%',
    width: '97.5%',
    backgroundColor: 'white',
    color: 'black',
    marginHorizontal: 5,
    borderRadius: 5,
    fontSize: 30,
  },
  Filters: {
    width: '100%',
    height: '30%',
  },
});
