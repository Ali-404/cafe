import React from 'react';
import { StyleSheet,Image,TouchableOpacity} from 'react-native';
import { Text } from 'react-native-paper';

const Card = ({meal, customCardStyle = {}, onPress = () => false}) => {
    return (
        <TouchableOpacity onPress={() => onPress()} touchSoundDisabled={false} style={[styles.miniCard, customCardStyle]}>
            <Image resizeMode='contain' style={styles.miniCardImage} source={{
                uri:meal?.img || ''
            }} />
            <Text numberOfLines={1} variant='headlineSmall' style={styles.miniCardText} 
            
            >{meal?.title}</Text>
            <Text numberOfLines={2}  variant='labelLarge' style={styles.miniCardText}>{meal?.price}</Text>
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
    },

    miniCardImage:{
        width:'100%',
        height:'70%',
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
