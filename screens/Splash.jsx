import React, { useEffect, useState } from 'react';
import {View, StyleSheet, StatusBar, ImageBackground,Image, Text} from 'react-native';
import colors from '../data/colors';
import {Button} from 'react-native-paper'
import globalStyle from '../data/globalStyle';
import { autoLogin } from '../firebase/firebase';


const Splash = ({navigation}) => {


    
    const [btnVisible, setBtnVisible] = useState(false)
    useEffect(() => {

        

        const isAutoLogin = autoLogin(navigation) 
        
        setTimeout(() => {if (!isAutoLogin){
            setBtnVisible(true)
        }}, 2500)
      }, []);  
    return (
        <ImageBackground 
            
            source={require("../assets/images/ptrn.png")}  style={styles.container}
            resizeMode='repeat' imageStyle={{opacity:0.3}}
            >
            <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} translucent={true} />

            
            <Image  source={require('../assets/tt.jpg')} resizeMode='contain' style={globalStyle.mainLogo} />
            
            <Text style={globalStyle.paragraph}>Best ☕ In Morocco</Text>


            <Text style={[globalStyle.paragraph, {fontSize:15, position:'absolute', top:'95%', color:'gray'}]}>version 1.0</Text>
            
            {btnVisible && (
                <Button onPress={() => navigation.navigate("Account")}  buttonColor={colors.secand} textColor={colors.primary} mode="elevated" style={styles.button}>Order Now</Button>
            )}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:colors.primary,
        flex:1,
        alignItems:'center',
        justifyContent:'center'

    },

    
    button :{
        marginTop:10, width:'80%',
        paddingVertical:10,
        position:'absolute',
        top:'85%',
    }
   
})

export default Splash;
