import {View, StyleSheet} from 'react-native';
import { Icon, IconButton, Text } from 'react-native-paper';
import colors from '../data/colors';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';



const Notification = ({}) => {
    
  

    
    return (
        <View style={{
            position:"absolute",
            width:'100%',
            height:'100%',
            backgroundColor:'rgba(0,0,0,0.7)',
            zIndex:9999,
            alignItems:'center',
            justifyContent:'center',
          
        }}>
            <View style={{
                backgroundColor:colors.secand,
                padding:35,
                borderRadius:25,
                alignItems:'center',
                justifyContent:'center',
                gap:15,                
            }}>
                <IconButton icon={"close"} iconColor='red' onPress={() => close()} style={{
                    position:'absolute',
                    top:0,
                    left:'90%'
                }} /> 
                <Icon source={"check"} size={150}  />
                <Text variant='displayMedium' >Thank You!</Text>
                <Text variant='titleLarge' style={{textAlign:'center'}}>You order is on road for you. Stay Tuned !</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Notification;
