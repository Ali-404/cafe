import { StatusBar } from 'expo-status-bar';
import {View, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Image} from 'react-native';
import { Button, Icon, IconButton, Text } from 'react-native-paper';
import colors from '../../data/colors';

import {urlFor} from '../sanity'
import { getDatabase, ref, get, onValue, set } from 'firebase/database';
import { getUser} from '../../firebase/firebase'
import { useEffect, useState } from 'react';


const Orders = ({navigation}) => {
  const [data, setData] = useState(false)
  const userRef = ref(getDatabase(), `users/${getUser().uid}`)
  useEffect(() => {
      onValue(userRef,(snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setData(userData.orders)
          } else {
            console.log('User not found in the database.');
          }
      })
  }, [])  
     



 

  const removeOrder = (order, orderID) => {
    const userRef = ref(getDatabase(), `users/${getUser().uid}`);
    
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const orders = userData.orders
        let newOrdersTable = orders.filter((el, key) => key !== orderID)
        if (newOrdersTable.length == 0){
          newOrdersTable[0] = ['Item 1']
        }
        try {
          set(userRef, { orders: newOrdersTable });
          setData(newOrdersTable)
        } catch (err) {
          console.error(err);
          throw err;
        }
      }
    });
  }; 
        


      const states = [['Not Accepted yet', "#a8a8a8"], ["Working On It ...", '#f7ce39'],[ "On Delevery", '#39e4f7'], ["Done", '#a5f739']]



    return (
        <View style={{flex:1, backgroundColor:colors.primary}}>
            <StatusBar style='light' />

            <ScrollView style={{maxHeight:'100%'}} contentContainerStyle={{flexGrow:1,gap:10,alignItems:'center', paddingVertical:15}}>

                {!data || data[0] == 'Item 1'  ?(
                  <Text variant='headlineSmall' style={{color:colors.third, textAlign:'center'}}>You don't have any orders yet.</Text>
                ): data.map((order,key) =>{
                  if (!order.city)
                  return(
                  
                  <ImageBackground key={key}  style={styles.container} resizeMode='repeat' imageStyle={{width:'100%'}} source={require('../../assets/images/ptrn.png')}>
                    {
                      Object.values(order).map((o,k) => {
                        if (o && typeof(o) == 'object' && !o.city  ){
                          var img = urlFor(o.image).url()
                          return(
                            <View key={k} style={styles.card}>
                                <Text variant='headlineSmall'>{o.meal}</Text>
                                <View style={styles.intButtons}>
                                    <Text  style={{color:colors.secand, fontSize:18, textAlign:'center'}} >{o.count}</Text>
                                </View>
                                <Text numberOfLines={1}>{o.price * o.count} Dhs</Text>
                        </View>
                        )}
                      })
                    }
                    

                    <View style={{flexDirection:'row', width:'100%', alignItems:'center', justifyContent:'space-around'}}>
                      <Text variant='labelLarge'>Order State: </Text>
                      <Button mode='contained' buttonColor={states[order.orderState][1]}>
                      {states[order.orderState][0]} 
                      </Button>
                    </View>
                      {/* <Button mode='elevated' buttonColor={colors.ex1} textColor={'black'} >Cancel Order</Button> */}

                    {/* zid 7ta la kan order state === wslek */}
                    {(order.orderState === 0 || order.orderState === 3) && (
                      
                      <IconButton onPress={() => removeOrder(order, key)} icon={'close'} iconColor={colors.ex1} style={{
                        position:'absolute',
                        top:-5,
                        left:'85%',
                        
                      }} />
                    )}

                  </ImageBackground>
                )})}
                

                
                
            </ScrollView>


        </View>
    );
}

const styles = StyleSheet.create({
    

  container:{
        width:'95%',
        height:'auto',
        // flexWrap:'wrap',
        backgroundColor:colors.secand,
        borderRadius:25,
        overflow:'hidden',
        flexDirection:'column',
        alignItems:'center',
        gap:10,
        // padding:15,
        paddingVertical:15,
      },
      card:{
          width:'100%',
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'center',
          paddingHorizontal:5,
          gap:15,
          flex:1,
          paddingVertical:15,
      },
      img:{
        width:'25%',
        height:'100%',
        
      },
      intButtons:{
        backgroundColor:colors.primary,
        minWidth:30,
        height:30,
        alignItems:'center',
        justifyContent:'center',
        textAlign:'center',
        paddingHorizontal:5,
        
        borderRadius:50
      }
})

export default Orders;
