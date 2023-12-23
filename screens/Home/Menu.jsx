import {View, StyleSheet, ScrollView} from 'react-native';
import globalStyle from '../../data/globalStyle';
import Card from '../../components/Card';
import client, { urlFor } from '../../sanity';
import { useEffect, useState } from 'react';
import { Text } from 'react-native-paper';
import colors from '../../data/colors';


const Menu = ({navigation, route}) => {

    const [cards , setCards ] = useState(false)
    const searchText = route?.params?.searchText || ''
    
    useEffect(() => {
        client.fetch('*').then((data) => {
                setCards(data.valueOf().filter(crd => crd.stock == 'InStock'))
        }).catch((err) => console.error(err))
    }, [])

    return (
        <View style={{flex:1}}>    
            <ScrollView contentContainerStyle={styles.container} >
         

            {cards ? cards.map((meal, key) => {
                            
                if (meal.meal && meal.meal.toLowerCase().includes(searchText.toLowerCase()))
                return (<Card key={key} onPress={() => navigation.navigate("Meal", {meal: meal, img:urlFor(meal.image).url() })} customCardStyle={styles.card} meal={{title: meal.meal, price:`${meal.price} dhs`, img:urlFor(meal.image).url(),}}  />
            )
            }) : (
            <>
                <Text variant='headlineSmall' style={{color:colors.third, textAlign:'center', width:'100%'}}>Loading ...</Text>
            </>
        )}
        
            
         

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexWrap:"wrap",
        
        flexDirection:'row',
        padding:15,
        width:'100%',
        backgroundColor:colors.primary,
        gap:10,
        alignItems:'center',
        justifyContent:'flex-start',
        // flex:1,
        flexGrow: 1,
        
        paddingBottom:120,
    },
    card:{
        width:'47%',
        height:200,
        // flex:1,
        // height:'auto',
    }
})

export default Menu;
