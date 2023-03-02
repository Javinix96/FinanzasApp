import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, View } from 'react-native';
import { DoubtsScreen } from '../Screens/DoubtsScreen';
import { HomeScreen } from '../Screens/HomeScreen';

const Tab = createBottomTabNavigator();

export const BottomNavigator = () => {
  return (
    <Tab.Navigator
          initialRouteName= 'Spends'
          sceneContainerStyle={{backgroundColor: '#e3e3e3'}}
          screenOptions={({ route }) => ({
               tabBarIcon: ({color, focused, size}) => {
                return <GetIcon route={ route }  />
               },headerShown: false, tabBarLabelStyle:{ fontSize:20, top: 10},tabBarStyle:{height:90}})}>
      <Tab.Screen options={{tabBarLabel: "SPENDS"}} name="Spends" component={HomeScreen}/>
      <Tab.Screen name="Settings" component={DoubtsScreen} />
    </Tab.Navigator>
  );
}

const GetIcon = ({ route }:any) =>
{
     let iconN = "wallet-outline";

     switch  ( route.name ){
          case 'Spends':
               iconN = 'cash-outline';
          break;
     }
     return ( 
     <View>
          <Text>
               <Icon name={iconN} size={30} ></Icon>
          </Text>
     </View>)
}