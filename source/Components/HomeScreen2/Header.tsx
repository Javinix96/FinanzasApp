import { useNavigation } from '@react-navigation/native';
import React, { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

interface props{
  Navigation?: any,
  Title: string,
  ShowIcon: boolean,
  isExpense: boolean,
  hasFilter: boolean,
  openF: boolean,
  setOpenF: (x:boolean) => void
}


export const Header = ({Navigation,Title,ShowIcon,isExpense, hasFilter = false,setOpenF,openF}:props) => {
  const { top } = useSafeAreaInsets();
  const nav = useNavigation();

  return (
     <View style={styles.Header}>
      <Text style={{...styles.Title, top}}>
       {Title}
      </Text>
     <View style={{width:10,height:10, top: 50}} />
     {
      hasFilter && <IconF setOpenF={setOpenF} openF={openF}/>
     }
     {
      !isExpense ? 
       (
        ShowIcon && 
          <TouchableOpacity style={{...styles.AddButton,top: top - 10}} onPress={() => Navigation.navigate('Add')}>
            <Text style={{ textAlign: 'right',fontSize:300}}>
            <Icon name="add-outline" color={"white"} size={60} />
          </Text>
        </TouchableOpacity>) : <Edit top={top} />
     }
     </View>
  )
  }

const Edit = (top:any) =>{
  return (
    <TouchableOpacity style={{marginRight:0, height: 40, top: top.top, width:120}}> 
      <Text style={{ fontSize:40, color:'white', marginRight:0}}>EDIT</Text> 
    </TouchableOpacity>
  )
}

const IconF = ({setOpenF, openF}:any) =>{
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => setOpenF(!openF)}> 
      <Text style={{fontSize:30,color:'white', top: 55}}><Icon name='filter-outline' size={40} /></Text> 
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
     Header:{
       backgroundColor: "#2B2B2B",
       height: 110,
       width: "100%",
       flexDirection: 'row'
     },
     Title:{
       color: "white",
       fontSize: 44,
       marginLeft: 10,
       fontWeight: 'bold',
       width: 290,
       height: "50%",
       fontFamily: 'ChakraPetch-Regular'
     },
     AddButton:{
       width: 70,
       height: 70,
       marginVertical: 0,
       justifyContent:'center'
     }
   })
