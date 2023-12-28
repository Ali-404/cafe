import {View, StyleSheet, TouchableOpacity, Text, SafeAreaView, StatusBar, ImageBackground, Image} from 'react-native';
import colors from '../data/colors';
import globalStyle from '../data/globalStyle';



import Login from './Account/Login';
import Register from './Account/Register';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tabstable = createMaterialTopTabNavigator()

const Account = ({navigation}) => {

    

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} translucent={true} />
            
            <ImageBackground 
            
            source={require("../assets/images/ptrn.png")}  style={globalStyle.container}
            resizeMode='repeat' imageStyle={{opacity:0.3}}
            >

            <Text style={[{fontSize:50, marginTop:50, textAlign:'center', color:colors.secand}]}>Welcome </Text>


            {/* list */}
            <Tabstable.Navigator style={styles.navigator}
                sceneContainerStyle={{backgroundColor:'transparent'}}
                screenOptions={{
                    tabBarLabelStyle: { fontSize: 25,fontWeight:700, color:colors.third },

                    tabBarItemStyle: { backgroundColor:'transparent' },
                    tabBarStyle: { backgroundColor: 'transparent' },
                    tabBarAndroidRipple:false,
                    tabBarPressColor:colors.secand,
                    tabBarIndicatorStyle:{backgroundColor:colors.secand}
                    
                }}
            >
                <Tabstable.Screen name='Login'  component={Login} options={{title:'Sign In'}} />
                <Tabstable.Screen name='Register' component={Register} options={{title:'Sign Up'}} />
            </Tabstable.Navigator>
            
            

            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.primary,
        flex:1,
        alignContent:'center',
        justifyContent:'center',
        // position:'absolute',
        
    },

    navigator:{
        // maxHeight:'80%',

        marginTop:30,
       
    },

    
})

export default Account;
