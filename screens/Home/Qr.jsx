'use strict';

import {View, StyleSheet} from 'react-native';
import { Button, Text } from 'react-native-paper';
import colors from '../../data/colors';

import QRCode from 'react-native-qrcode-svg';
import { useRoute } from '@react-navigation/native';
import {  useState } from 'react';


const Qr = () => {
    const route = useRoute()


    const name = route?.params?.name || "None"
    const orderID = `Order ID: ${route?.params?.orderID} \n Name: ${name}`

    return (
        <View style={styles.container}>
            <QRCode
          value={orderID}
          size={200}
          color='white'
          backgroundColor='black'
          
            
          />

          <Text variant='headlineMedium' style={styles.txt}>Scan the QR Code</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.primary,
        alignItems:'center',
        justifyContent:'center',
        gap:30
    },
    txt:{
        color:colors.third,
        textAlign:"center"
    },
    btn:{
        padding:5,
        minWidth:'70%'
    }
})

export default Qr;
