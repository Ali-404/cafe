import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../data/colors'
import Home from './Home'
import { Icon } from 'react-native-paper'
import Profile from './Home/Profile'
import Menu from './Home/Menu'
import Header from '../components/TitleHeader'
import Meal from './Home/Meal'
import { useRoute } from '@react-navigation/native'
import MyOrders from './Home/MyOrders'
import Orders from './Home/Orders'
import GetOrder from './Home/GetOrder'
import Manager from './Home/Manager'
import Qr from './Home/Qr'



const icons = {
  "Profile":"account-circle",
  "Home":"home",
  "Menu":"book",
  
}

const noNav = {
  "Meal": true,
  "Menu":true,
  "Profile": true,
  "MyOrders": true,
  "Orders": true,
  "GetOrder": true,
  "Manager": true,
  "Qr": true,
  
}



const Stack = createBottomTabNavigator()


const TabsBottom = ({state, navigation}) => {
  const currentRouteName = state?.routeNames[state.index];

  return (
    <View style={[styles.Nav, {
      display:noNav[currentRouteName] ? "none" : "flex"
    }]}>
      {state.routeNames.map((t,k) => {
        if(icons[t]){   
            return(
      
            <TouchableOpacity key={k} style={styles.tabButton} onPress={() => navigation.navigate(t)}>
              <Icon size={26} source={icons[t]} color={colors.primary} />
              <Text>{t}</Text>
            </TouchableOpacity>
          )
        }
      
      })}
    </View>
  )
}

export default function Main() {
  
  return (
    <Stack.Navigator 
    backBehavior='initialRoute'
    screenOptions={{headerShown:false}}
    tabBar={(props) => <TabsBottom {...props} />}
    initialRouteName='Home'
    // tabBar={({navigation}) => {navigation.go}}
    >
      <Stack.Screen   name='Profile' component={Profile} options={{headerShown:true, header:() => (<Header title="Account" />) }} />
      <Stack.Screen  name='Home' component={Home} />
      <Stack.Screen  name='Menu' component={Menu} options={{headerShown:true, header:() => (<Header title="Our Menu" />) }} />
      <Stack.Screen  name='Meal' component={Meal} options={{headerShown:true, header:() => (<Header />) }} />
      <Stack.Screen  name='MyOrders' component={MyOrders} options={{headerShown:true, header:() => (<Header title={'My Orders'} />) }} />
      <Stack.Screen  name='Orders' component={Orders} options={{headerShown:true, header:() => (<Header  />) }} />
      <Stack.Screen   name='GetOrder' component={GetOrder} options={{headerShown:true, header:() => (<Header title={'Delevery'} />) }} />
      
      <Stack.Screen  name='Manager' component={Manager} options={{headerShown:true, header:() => (<Header title={'Orders Management'} />) }} />
      <Stack.Screen  name='Qr' component={Qr} options={{headerShown:true, header:() => (<Header title={'Qr Code'} />) }} />


     

    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  Nav:{
    position:'absolute',
    width:'100%',
    height:'10%',
    top:'90%',
    backgroundColor:colors.secand,
    borderTopLeftRadius:25,
    borderTopRightRadius:25,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-evenly'
  },
  tabButton:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
  }
})