import React from 'react';
import { StyleSheet,Image,TouchableOpacity} from 'react-native';
import { Text } from 'react-native-paper';
import colors from '../data/colors';

const Card = ({meal, customCardStyle = {}, onPress = () => false}) => {
    return (
        <TouchableOpacity disabled={meal?.stock == 'OutOfStock'} onPress={() => onPress()} touchSoundDisabled={false} style={[styles.miniCard, customCardStyle,meal?.stock == 'OutOfStock' && {opacity:0.7}]}>
            <Image resizeMode='contain' style={styles.miniCardImage} source={{
                uri:meal?.img || ''
            }} />
            <Text numberOfLines={1} variant='headlineSmall' style={styles.miniCardText} 
            
            >{meal?.title}</Text>
            <Text numberOfLines={2}  variant='labelLarge' style={styles.miniCardText}>{meal?.price}</Text>
            
            
            { meal?.stock == 'OutOfStock' && (<Text numberOfLines={2}  variant='labelLarge' style={[styles.miniCardText, {color:colors.ex1}]}>Out Of Stock !</Text>)}


        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    // mini card
    miniCard:{
        // minWidth:200,
        // minHeight:'60%',
        backgroundColor:colors.secand,
        borderRadius:25,
        padding:15,
    },

    miniCardImage:{
        width:'100%',
        height:'60%',
        resizeMode:'contain',
    },
    miniCardText:{
        color:colors.primary,
        width:'100%',
        overflow:'hidden',

        textAlign:'center'
    },
   



})

export default Card;
