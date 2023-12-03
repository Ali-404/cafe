import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Icon, Text } from 'react-native-paper';
import colors from '../data/colors';

const NoConnection = () => {
    return (
        <View style={styles.container}>
        <Icon source={'wifi-off'} size={180} color={colors.ex1}></Icon>
            <Text variant='headlineMedium' style={{color:colors.ex1}}>No Internet Connection !</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.primary,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default NoConnection;
