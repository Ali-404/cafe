import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import colors from '../data/colors'
import { Text } from 'react-native-paper';
import { getAddedPriceFromExtra } from '../data/usefull';
import { StatusBar } from 'expo-status-bar';

const MealExtras = ({route}) => {
    const {meal} = route?.params
    let total = 0
    let mealData = []
    const userExtras = meal?.UserExtras
 
    
    Object.keys(userExtras).map(ExtraName => {
        const ExtraValue = userExtras[ExtraName]
        const addPrice = getAddedPriceFromExtra(meal.extras,ExtraName, ExtraValue) || 0
        total = (total + addPrice)
        if (!mealData.includes([ExtraName,[ExtraValue,addPrice]])){
            mealData = [...mealData,[ExtraName,[ExtraValue,addPrice]]]
        }
    })
 
    

    return (
        <View style={styles.container}>
            <StatusBar style='light' />
            <Text variant='headlineLarge' style={{textAlign:'center'}} >{meal.meal} (x{meal.count}) {meal.price * meal.count}Dhs</Text>

            <ScrollView contentContainerStyle={{padding:20}}>
                <Text variant='headlineLarge' style={{color:colors.ex1}} >Extras:</Text>

                {mealData?.map((extra,k) => {
                        

                    return (
                        <View key={k}>
                            <View >

                                <Text variant='headlineMedium'>
                                    {extra[0]}:
                                </Text>

                                <Text style={{paddingHorizontal:30}} variant='headlineSmall' >
                                    {JSON.stringify(extra[1][0])}
                                </Text>
                                <Text style={{paddingHorizontal:30, color:colors.ex1}} variant='headlineSmall'  >
                                    + {extra[1][1]} Dhs
                                </Text>
                                
                            </View>
                        </View>
                    )
                })}

            </ScrollView>
            <Text variant='headlineSmall' style={{textAlign:'center', backgroundColor:colors.primary,borderRadius:15,padding:10,color:colors.secand}}>Total: {((meal.price + total) * meal.count ) || 0} Dhs</Text>

            
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.secand,
        padding:15,
    }
})

export default MealExtras;
