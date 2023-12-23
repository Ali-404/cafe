import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import colors from '../data/colors'
import { Text } from 'react-native-paper';
import { getAddedPriceFromExtra } from '../data/usefull';
import { StatusBar } from 'expo-status-bar';

const MealExtras = ({route}) => {
    
    const {meal} = route?.params
    const [total,setTotal] = useState(0)
    const [mealData,setMealData] = useState([])    

    const userExtras = meal?.UserExtras
    

    useEffect(() => {
        setTotal(0);
        setMealData([]);
        if (userExtras) {
          const updatedMealData = mealData.slice(); // Create a copy of mealData
      
          Object.keys(userExtras).forEach((ExtraName) => {
            const ExtraValue = userExtras[ExtraName];
            const addPrice = getAddedPriceFromExtra(meal.extras, ExtraName, ExtraValue) || 0;
      
            setTotal((prevTotal) => prevTotal + addPrice);
      
            const existingExtraIndex = updatedMealData.findIndex(
              (item) => item && item[0] === ExtraName
            );
      
            if (existingExtraIndex === -1) {
              updatedMealData.push([ExtraName, [ExtraValue, addPrice]]);
            } else {
              updatedMealData[existingExtraIndex][1] = [ExtraValue, addPrice];
            }
          });
      
          setMealData(updatedMealData);
        }
      }, [meal, userExtras]);

 
    

    return (
        <View style={styles.container}>
            <StatusBar style='light' />
            <Text variant='headlineLarge' style={{textAlign:'center'}} >{meal.meal} (x{meal.count}) {meal.price * meal.count}Dhs</Text>

            <ScrollView contentContainerStyle={{padding:20}}>
                <Text variant='headlineLarge' style={{color:colors.ex1}} >Extras:</Text>

                {mealData?.map((extra,k) => {
                        if (meal.extras.findIndex(ex => ex.ExtraName == [extra[0]]) !==-1 )

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
