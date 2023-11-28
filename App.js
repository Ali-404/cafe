import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';

import { Provider } from 'react-redux'
import {store} from './store'

import { BackHandler, StyleSheet, Text, View } from 'react-native';
import Splash from './screens/Splash';
import Account from './screens/Account';
import Verification from './screens/Verification';
// import Home from './screens/Home';
import Main from './screens/Main';
import { useEffect } from 'react';




const Stack = createNativeStackNavigator()


export default function App() {
  // remove back handler

  useEffect(() => {

    
    const backAction = () => {
     
      return true;
    };

   
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove(); // Remove the event listener on component unmount
  }, []);


  return (
  <PaperProvider>
    <NavigationContainer >
    
      <Provider store={store}>
          <Stack.Navigator backBehavior='none' initialRouteName='Splash'  screenOptions={{headerShown:false, headerBackButtonMenuEnabled:false}}>
            <Stack.Screen  name='Splash' component={Splash} />
            <Stack.Screen name='Account' component={Account} />
            <Stack.Screen name='Verification' component={Verification} />
            <Stack.Screen name='Main' component={Main} />
          </Stack.Navigator>
        </Provider>
    </NavigationContainer>
  </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
