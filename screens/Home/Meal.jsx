import { StatusBar } from 'expo-status-bar';
import {View, StyleSheet, TouchableOpacity, ImageBackground, Image} from 'react-native';
import { Button, Icon, IconButton, Text } from 'react-native-paper';
import colors from '../../data/colors';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsById, selectBasketItemsByMeal } from '../../features/basketSlice';


const TabsBottom = ({meals}) => {
    
    return (
      <View style={styles.Nav}>
            <Text variant='titleMedium' style={{color:colors.primary}}>TOTAL: {(meals[0]?.count || 0) * meals[0]?.price || 0} Dhs</Text>
            
      </View>
    )
  }


const Meal = ({ route }) => {

    const image = route?.params.img
    const { meal, description } = route?.params.meal

    
    const dispatch = useDispatch()
    const items = useSelector(state => selectBasketItemsByMeal(state, route?.params.meal.meal))


    const addBtn = () => {
        dispatch(addToBasket(route?.params.meal))

    }

    const removeBtn = () => {
        dispatch(removeFromBasket(route?.params.meal.meal))
    }


    return (
        <View style={styles.container}>
            <StatusBar style='light' />

            <ImageBackground style={styles.pictureContainer} resizeMode='cover' source={require('../../assets/images/ptrn.png')}>
                <Image resizeMode='center' source={{uri: image}}  style={styles.img}  />
                <Text variant='displaySmall' style={{color:colors.primary,fontWeight:'bold'}}>{meal}</Text>
            </ImageBackground>
            <View style={styles.interaction}>
                <Text variant='headlineMedium'  style={{color:colors.secand}} >Description</Text>
                <View style={styles.interactionButtons}>
                    <TouchableOpacity onPress={removeBtn} style={styles.smallBtn}><Text variant='headlineMedium'>-</Text></TouchableOpacity>
                    <Text variant='headlineSmall' style={{color:colors.secand}} >{items[0]?.count || 0}</Text>
                    <TouchableOpacity onPress={() => addBtn()} style={styles.smallBtn}><Text variant='headlineMedium'>+</Text></TouchableOpacity>
                </View>
            </View>
            <Text variant='labelLarge' style={{color:colors.third, textAlign:'left', width:'90%'}} >{description}</Text>
            <TabsBottom meals={items} />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.primary,
        flex:1,
        alignItems:'center',
        
    },
    pictureContainer:{
        minHeight:'40%',
        width:'90%',
        alignItems:'center',
        justifyContent:'center',
        gap:10,
        backgroundColor:colors.secand,
        borderRadius:25,
        overflow:'hidden'
    },
    img :{
        width:'100%',
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
