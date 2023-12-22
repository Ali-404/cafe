import { StatusBar } from 'expo-status-bar';
import {View, StyleSheet, TouchableOpacity, ImageBackground, Image, ScrollView} from 'react-native';
import { Button, Icon, IconButton, Text } from 'react-native-paper';
import colors from '../../data/colors';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItemsByMeal } from '../../features/basketSlice';
import ExtrasList from '../../components/ExtrasList';
import {  useEffect, useState } from 'react';
import {getAddedPriceFromExtra} from '../../data/usefull'

const TabsBottom = ({meals,userExtras,extras}) => {
    let addedPrice = 0

    

    // calcul addeddPrice
    
    Object.keys(userExtras).map(ExtraName => {
            const ExtraValue = userExtras[ExtraName]

            const extraPrice = getAddedPriceFromExtra(extras,ExtraName, ExtraValue) || 0
            addedPrice +=extraPrice

    })
    return (
      <View style={styles.Nav}>
            <Text variant='titleMedium' style={{color:colors.primary}}>TOTAL: {(meals[0]?.count || 0) * ((meals[0]?.price || 0) + addedPrice)} Dhs</Text>
            
      </View>
    )
  }


const Meal = ({ route }) => {

    const [checkeds,setCheckeds] = useState({})



    const image = route?.params.img
    const { meal, description,extras } = route?.params.meal
    const [_extras, setExtras] = useState({});

    
    const dispatch = useDispatch()
    const items = useSelector(state => selectBasketItemsByMeal(state, route?.params.meal.meal))



    const getExtras = ( ) => {
        let newExtras = {}
        
        // load default 
        extras.map(extra => {
            if (extra.SelectType != 'checkone'){
                newExtras[extra.ExtraName] = []
            }else{
                
                newExtras[extra.ExtraName] = extra.value[0].ExtraValue  
            }
        })

        // load custom
            Object.keys(checkeds).map(extKey => {
                const theExtra = checkeds[extKey]
                if (theExtra){
                    newExtras[extKey] = theExtra
                }
            })


        return newExtras
    }

    const addBtn = () => {
        
        const updatedExtras = getExtras()
        let mealWithExtras = {...route?.params.meal,UserExtras:updatedExtras}
        
        dispatch(addToBasket(mealWithExtras))

        setExtras(updatedExtras);

    }

    const removeBtn = () => {
        dispatch(removeFromBasket(route?.params.meal.meal))
    }


    return (
        <View style={styles.container}>
            <StatusBar style='light' />
            <ScrollView  contentContainerStyle={{alignItems:'center',paddingBottom:150}} >
            
            <ImageBackground style={styles.pictureContainer} resizeMode='cover' source={require('../../assets/images/ptrn.png')}>
                <Image resizeMode='contain' source={{uri: image}}  style={styles.img}  />
            </ImageBackground>
            <Text variant='displaySmall' style={{color:colors.secand,fontWeight:'bold', paddingVertical:15,textDecorationLine:'underline'}}>{meal}</Text>
            <View style={styles.interaction}>
                <Text variant='headlineMedium'  style={{color:colors.secand}} >Description</Text>
                <View style={styles.interactionButtons}>
                    <TouchableOpacity onPress={removeBtn} style={styles.smallBtn}><Text variant='headlineMedium'>-</Text></TouchableOpacity>
                    <Text variant='headlineSmall' style={{color:colors.secand}} >{items[0]?.count || 0}</Text>
                    <TouchableOpacity onPress={() => addBtn()} style={styles.smallBtn}><Text variant='headlineMedium'>+</Text></TouchableOpacity>
                </View>
            </View>
            <Text variant='labelLarge' style={{color:colors.third, textAlign:'left', width:'90%',maxHeight:'50%'}} >{description}</Text>


            {/* extras */}


            {extras && (items[0]?.count > 0) && (
                <>
                <Text variant='headlineLarge' style={{color:colors.secand, textAlign:'left', width:'90%',marginVertical:10}} >Extras</Text>

                <ExtrasList functions={[addBtn,removeBtn]} extras={extras} checkeds={checkeds} setCheckeds={setCheckeds} />
                </>
            )}


            </ScrollView>
            <TabsBottom meals={items} checkeds={checkeds} userExtras={_extras} extras={extras} />

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.primary,
        flex:1,
        alignItems:'start',
        
    },
    pictureContainer:{
        // minHeight:'30%',
        width:'100%',
        height:200,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:colors.secand,
        borderRadius:25,
        overflow:'hidden',
    },
    img :{
        width:'50%',
        minHeight:'30%',
    },
    interaction:{
        width:'90%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical:15,
    },
    interactionButtons:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        gap:10,
    },
    smallBtn:{
        backgroundColor:colors.secand,
        borderRadius:50,
        width:'20%',
        alignItems:'center',
        justifyContent:'center'
    },
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
     
})

export default Meal;
