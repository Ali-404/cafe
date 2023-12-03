import { StatusBar } from 'expo-status-bar';
import {View, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Image} from 'react-native';
import { Button, Icon, IconButton, Text } from 'react-native-paper';
import colors from '../../data/colors';
import { useSelector } from 'react-redux';
import { selectBasketItems } from '../../features/basketSlice';
import { urlFor } from '../../sanity';
import { useEffect, useState } from 'react';



const TabsBottom = ({navigation}) => {
  const uploadedItems = useSelector(selectBasketItems)
  const [total, setTotal] = useState(0)
  
  useEffect(() => {
    let newTotal = 0;
   
    uploadedItems.forEach(item => {
       newTotal += (item.price * item.count);
    });
   
    setTotal(newTotal);
   }, [uploadedItems])
 
    return (
      <View style={styles.Nav}>
            <Text variant='titleMedium' style={{color:colors.primary}}>TOTAL: {total} Dhs</Text>
            <Button onPress={() => navigation.navigate("GetOrder")} mode='outlined' style={{borderRadius:10}} >
                <Text variant='titleLarge' style={{color:colors.primary}}>Order </Text>
                <Icon source='cart' size={18}  color={colors.primary} />
            </Button>
      </View>
    )
  }


const MyOrders = ({navigation}) => {
    

    
    const uploadedItems = useSelector(selectBasketItems)

    return (
        <View style={{flex:1, backgroundColor:colors.primary}}>
            <StatusBar style='light' />

            <ScrollView style={{maxHeight:'80%'}} contentContainerStyle={{flexGrow:1,gap:10,alignItems:'center', paddingVertical:15}}>
                {/* card */}
                {!uploadedItems || uploadedItems.length <= 0 && (
                  <Text variant='titleMedium' style={{textAlign:'center',color:colors.third}}>No Orders Yet!</Text>
                )}
                {uploadedItems && uploadedItems.map((item, key) => { 
                  
                  return(
                  <TouchableOpacity key={key} onPress={() => navigation.navigate("Meal", {
                    img:urlFor(item.image).url(), 
                    meal: item
                  })}>
                    <ImageBackground  style={styles.card} resizeMode='repeat' imageStyle={{width:'100%'}} source={require('../../assets/images/ptrn.png')}>
                        <Image style={styles.img} source={{uri:urlFor(item.image).url()}} resizeMode='contain' />
                        <Text variant='headlineSmall'  style={{maxWidth:'50%', textAlign:'center'}}>{item.meal} (x {item.count || 0})</Text>
                      
                        <Text numberOfLines={1}>{item.count * item.price} Dhs</Text>
                    </ImageBackground>
                    </TouchableOpacity>
                )})}


                
            </ScrollView>

              {uploadedItems && uploadedItems.length > 0 && (
                <TabsBottom  navigation={navigation} />
              )}
        </View>
    );
}

const styles = StyleSheet.create({
    Nav:{
        position:'absolute',
        width:'100%',
        height:'20%',
        top:'80%',
        backgroundColor:colors.secand,
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-evenly',
        overflow:'hidden',
        borderWidth:2,
      },

      card:{
        width:'95%',
        height:100,
        // flexWrap:'wrap',
        backgroundColor:colors.secand,
        borderRadius:25,
        overflow:'hidden',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:5,
        gap:10,
      },
      img:{
        width:'25%',
        height:'100%',
      },
      intButtons:{
        flexDirection:'row',
        backgroundColor:colors.primary,
        maxWidth:'20%',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:15
      }
})

export default MyOrders;
