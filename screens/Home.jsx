import {View, StyleSheet, StatusBar, ImageBackground,Image, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import globalStyle from '../data/globalStyle';
import colors from '../data/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Badge, Button, Icon, IconButton, Text } from 'react-native-paper';
import Card from '../components/Card';
import client, { urlFor } from '../sanity';
import { useEffect, useState } from 'react';
import {  useSelector } from 'react-redux';
import {  selectBasketItems } from '../features/basketSlice';



const Home = ({navigation}) => {

    const [cards , setCards ] = useState(false)
    
    const [randomCard, setRandomCard] = useState(false)
    const [searchText, setSearchText] = useState('')


    useEffect(() => {
        client.fetch('*').then((data) => {
            
            setCards(data.valueOf())
        }).catch((err) => console.error(err))
    }, [])


   




    useEffect(() => {
        let intervalId;

        const loadRandomCard = () => {
            if (cards){
                let randomID = Math.floor(Math.random() * cards.valueOf().length)
                const card = cards.filter(crd => crd.stock == 'InStock')[randomID]
                if (card?.image){
                    // 7yd li out of stock !! filter l cards
                    setRandomCard(card)
                }else 
                {
                    
                    setRandomCard(cards[0])
                }
            }
        }

        const startInterval = () => {
        intervalId = setInterval(loadRandomCard, 5000);
        };

        loadRandomCard()

        // Start the interval
        startInterval();

        return () => {

        clearInterval(intervalId);
        };
    }, [cards])


    const items = useSelector(selectBasketItems)
    

    const searchByName = () => {
        navigation.navigate("Menu", {searchText: searchText || ''})
    }

    const showMore = () => {
        navigation.navigate("Menu", {searchText:''})
    }

    return (
        <View style={[globalStyle.container, styles.container]}>
            <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} translucent={true}  />
            
            <ImageBackground 
            source={require("../assets/images/ptrn.png")}  style={styles.headerBG}
            resizeMode='repeat' imageStyle={{opacity:0.3}}
            >

            <SafeAreaView style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("MyOrders")} style={{width:'100%',display:'flex',alignItems:'flex-end' }}>
                    
                  <Icon source='cart' size={35} color={colors.third} />
                    {items.length > 0 && (
                        <Badge 
                        size={20}
                        style={{ backgroundColor:colors.secand,color:'black',position: 'absolute', top: -5, right: 0, fontSize:14 }}
                    >{items.length}</Badge>
                    )}
                    
                </TouchableOpacity>
                <Text variant='displaySmall' style={{color:colors.third}}>Welcome,</Text>
                <Text variant='displaySmall' style={{color:colors.third}}>What would you like to <Text variant='displaySmall' style={{color:colors.secand}}>eat ?</Text></Text>

                <View style={{display:'flex', flexDirection:'row'}}>
                    <TextInput style={[styles.input]} onChangeText={setSearchText} defaultValue={searchText} onSubmitEditing={searchByName}  placeholder='Search for meal ..' />
                    <IconButton onPress={searchByName} icon={"book-search"} iconColor={colors.primary} style={styles.iconButton}></IconButton>
                </View>


            </SafeAreaView>

            </ImageBackground>

            <ScrollView    style={{paddingVertical:5,paddingHorizontal:10,display:'flex', flexDirection:'column'}} contentContainerStyle={{maxHeight:'140%'}}>
                <Text variant='displaySmall' style={{color:colors.third, marginVertical:15}}>Popular Meal</Text>

                {randomCard &&  (
                    
                <View style={styles.card}>
                    <Image  resizeMode='contain' style={styles.cardImage}  source={{uri:urlFor(randomCard.image).url()}} /> 
                    <View style={{flex:1,backgroundColor:colors.secand, alignItems:"center", justifyContent:'space-evenly', paddingVertical:25, gap:15}}>
                        <View style={{alignItems:'center'}}>
                            <Text numberOfLines={2} variant='headlineMedium'>{randomCard.meal}</Text>
                            <Text numberOfLines={2} variant='labelLarge'>{randomCard.price} Dhs</Text>
                        </View>
                        <Button onPress={() => navigation.navigate('Meal', {meal: randomCard, img: urlFor(randomCard.image).url()})} mode='elevated' buttonColor={colors.ex3}>Order Now</Button>
                    </View>
                    
                </View>
                )}

                <Text variant='displaySmall' style={{color:colors.third, marginVertical:15}}>Suggestions</Text>

                <View style={{ width:'100%'}}>
                    <ScrollView horizontal={true} contentContainerStyle={{gap:15}} >
                        
                        {cards ? cards.map((meal, key) => {
                            if (key > 9 ){
                                //only 9s
                                return
                            }
                            if (meal.meal)
                               return (<Card onPress={() => navigation.navigate("Meal",{meal: meal, img:urlFor(meal.image).url() })} key={key} customCardStyle={{minWidth:200,height:"60%"}} meal={{title: meal.meal, price:`${meal.price} Dhs`,stock:meal.stock ,img:urlFor(meal.image).url()}} />
                            )
                            }) : (
                            <>
                                <Text>Loading ...</Text>
                            </>
                        )}
                        {cards && cards.length > 0 && (
                            <TouchableOpacity onPress={() => showMore()} style={styles.MoreBtn} >
                                <Icon size={35} source={'book-arrow-right'} />
                                <Text variant='titleMedium'>Show More</Text>
                            </TouchableOpacity>
                        )}
                        
                        
                    </ScrollView>
                </View>

            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        // alignItems:'center',
        justifyContent:'flex-start',
    },
    headerBG:{
        width:'100%',
        minHeight:'30%',
        // maxHeight:'30%',
    },
    header:{
        width:'100%',
        paddingHorizontal:15,
        paddingVertical:25,
        display:'flex',
        flexDirection:'column'
        // alignItems:'flex-end',
        // justifyContent:'flex-end',
    },
    input :{
        fontSize:15,
        borderRadius:15,
        flex:1,
        paddingVertical:10,
        paddingHorizontal:15,
        backgroundColor:colors.third
    },
    iconButton: {
        backgroundColor:colors.secand,
        borderRadius:10,
    },
    card:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        maxHeight:"40%",
        overflow:'hidden',
        borderRadius:15,
        
        
    },
    cardImage:{

        width:'50%', 
        height:'100%',
        backgroundColor:colors.primary
    },

    // mini card

    MoreBtn:{
        minWidth:100,
        height:'60%',
        borderRadius:25,
        backgroundColor:colors.secand,
        padding:15,
        alignItems:'center',
        justifyContent:'center'
    }
    

    
})

export default Home;
