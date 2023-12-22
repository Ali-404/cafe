import React, { useEffect } from 'react';
import {View, StyleSheet} from 'react-native';
import { RadioButton, Switch, Text } from 'react-native-paper';
import colors from '../data/colors';
import { useState } from 'react';



const ExtrasList = ({extras, checkeds,setCheckeds,functions}) => {
    


    return (
        <View style={styles.container}>
        


            <View>
            
                
                {extras && Object.keys(extras).map((key,index) => {
                    const value = extras[key]
                    return (
                        <View key={index}>
                            <Text variant='headlineMedium' style={{color:colors.third}}>{value.ExtraName}:</Text>
                            {/* extra extras */}

                            {Array.isArray(value.value) && value.value.map((extra,i) => {
                                
                                
                                if (value.SelectType != 'checkone')
                                {
                                    return (<View key={i}>
                                            <Extra functions={functions} extra={value.ExtraName} checkeds={[checkeds,setCheckeds]} txt={extra.ExtraValue} addedPrice={extra.AddedPrice}  />
                                        </View>
                                    )
                                    
                                }
                            })}
                            
                            {Array.isArray(value.value) && value.SelectType == 'checkone' && (
                                <ExtraWithRadio functions={functions} typeName={value.ExtraName} radios={value.value} checkeds={[checkeds,setCheckeds]} />
                            )}

                        </View>
                    )
                })}
           
            </View>


            

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width:'90%',
    },

    extra:{
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center',
        paddingHorizontal:15,
        gap:15
        
    }
})


const Extra = ({ extra,txt, addedPrice, checkeds, functions}) => {
    const [checked, setIsChecked] = useState(false)
    useEffect(() => {
        functions[0]()
        functions[1]()
    }, [checked])

    return (
        <View style={styles.extra}>
            <Text variant='titleLarge' style={{color:colors.third}}>{txt}</Text>
            
            {Number(addedPrice) && Number(addedPrice) > 0 ? (
                <Text variant='titleMedium' style={{color:colors.ex2}} >(+{addedPrice} Dhs)</Text>
            ): (<></>)}
            
            <Switch 
                color={colors.secand} 
                
                onValueChange={(newValue) => {
                    
                        let newExtra = checkeds[0]
                        if (newValue){
                            if (!newExtra[extra]){
                                newExtra[extra] = [txt]
                                checkeds[1](newExtra)

                            }else 
                            {   
                                if (Object.values(newExtra[extra]).findIndex(el => el === txt) == -1){
                                    newExtra[extra] = [...(newExtra[extra]),txt]
                                    checkeds[1](newExtra)
                                }
                            }

                        }else 
                        {   
                            if (newExtra[extra]){
                                const index = Object.values(newExtra[extra]).findIndex(el => el === txt) 
                                
                                if (index !== -1) {
                                    const newExtraArray = newExtra[extra].filter((el, elIndex) => elIndex !== index);
                                    newExtra[extra] = newExtraArray;
                                    checkeds[1](newExtra);
                                }
                            }
                        }
                        
                        setIsChecked(newValue) 
                        // functions[0]()
                        // functions[1]()
                    }

                } 
                
                value={checked} 
                
            />

            
        </View>
    )
}


const ExtraWithRadio = ({typeName,radios,checkeds,functions}) => {
    const [radio,setRadio] = useState(radios[0].ExtraValue)
    useEffect(() => {
        functions[0]()
        functions[1]()
    }, [radio])


    return (
        <RadioButton.Group 
            onValueChange={newValue => {
                    let newExtra = checkeds[0]
                    newExtra[typeName]=newValue

                    checkeds[1](newExtra)
                    setRadio(newValue)
                    // functions[0]()
                    // functions[1]()
                }
            } 
            value={radio} 
        
        >

                <View style={{alignItems:'center'}}>
                    {Array.isArray(radios) && radios.map((r,i) => {
                        
                        return( 
                    
                            
                            <View key={i} style={{alignItems:'center',flexDirection:'row',gap:10}}>
                                <Text variant='titleLarge' style={{color:colors.third}}>{r.ExtraValue}</Text>


                                {Number(r.AddedPrice) && Number(r.AddedPrice) > 0 ? (
                                    <Text variant='titleMedium' style={{color:colors.ex2}} >(+{r.AddedPrice} Dhs)</Text>

                            ): (<></>)}

                                <RadioButton value={r.ExtraValue}  color={colors.secand} />
                            </View>


                            

                    )})}
                </View>
                    
        </RadioButton.Group>
    )
}

export default ExtrasList;
