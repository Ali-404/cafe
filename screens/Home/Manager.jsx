import { StatusBar } from 'expo-status-bar';
import {View, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Image, Alert} from 'react-native';
import { Button, Divider, Icon, IconButton, Menu, Modal, PaperProvider, Portal, Text } from 'react-native-paper';
import colors from '../../data/colors';

import { getDatabase, ref, get, onValue, set } from 'firebase/database';
import { useEffect, useState } from 'react';
import OrdersPopup from '../../components/OrdersPopup'
import { useNavigation } from '@react-navigation/native';

const states = [['Not Accepted yet', "#a8a8a8"], ["Working On It ...", '#f7ce39'],[ "On Delevery", '#39e4f7'], ["Done", '#a5f739']]


const Manager = ({navigation}) => {
  const [users, setUsers] = useState(false)
  const [data, setData] = useState(false)



  const userRef = ref(getDatabase(), `users`)
  useEffect(() => {
      onValue(userRef,(snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
      
            setData(Object.values(userData))
            setUsers(Object.keys(userData))

     
          } else {
            console.log('User not found in the database.');
          }
      })
  }, [])  
     
      


    return (
        <View style={{flex:1, backgroundColor:colors.primary}}>
            <StatusBar style='light' />

            <ScrollView style={{maxHeight:'100%'}} contentContainerStyle={{flexGrow:1,gap:10,alignItems:'center', paddingVertical:15}}>

                {Array.isArray(data) && Array.isArray(users)  ? (
                  <>
                    {Object.values(data).map((orders,userID) => (
                      <>
                      
                      {Object.values(orders).map((order, key) => (
                        <TheCard key={key} users={users} data={order} userID={userID} />
                      ))}
                      </>
                    ))}
                  </>
                ) : (
                  <>
                    <Text>No Orders was found. Searching ...</Text>
                  </>
                ) }

                
            </ScrollView>


        </View>
    );
}

const TheCard = ({data, users,userID}) => {
  const [visible, setVisible] = useState(false)
  const [theState, setTheState] = useState([])
  const navigation = useNavigation()


  const showExtrasMenu = (o) => {
    navigation.navigate("Extras",{meal:o})
    
  }

  if (!data || data[0] == 'Item 1'){
    return (
      <>
      </>
    )
  }else {
    return (
      data.map((order,key) =>{
        if (!order.userUID)
        return(
          <>
        <ImageBackground key={key}  style={styles.container} resizeMode='repeat' imageStyle={{width:'100%'}} source={require('../../assets/images/ptrn.png')}>
          {
            Object.values(order).map((o,k) => {
              if (o && typeof(o) == 'object' && !o.phone && !o.userUID   ){
                return(
                  <View key={k} style={styles.card}>
                      <Text variant='headlineSmall'>{o.meal}</Text>
                      <View style={styles.intButtons}>
                          <Text  style={{color:colors.secand, fontSize:18, textAlign:'center'}} >{o.count}</Text>
                      </View>
                     
                      <IconButton icon={'book-information-variant'} containerColor={colors.ex1} onPress={() => showExtrasMenu(o)}>Extras</IconButton>
                      
              </View>
              )}
            })
          }
          
            {/* Orders data */}
            
            {order.senderData && order.senderData != []&& Object.keys(order.senderData).length > 2 ? (
              <MoreData order={order} />
            ) : (
              <>
              <Text variant='labelLarge'>Without Delevery</Text>
              <Text>Name: {order.senderData.userUID}</Text>

              </>
            )}
  

          <View style={{flexDirection:'row', width:'100%', alignItems:'center', justifyContent:'space-around'}}>

            <Text variant='labelLarge'>Order State: </Text>
            <Button mode='contained' onPress={() => {
              
              setTheState([users,userID, order.senderData.orderID])
              setVisible(!visible)}
              
              } buttonColor={states[order.orderState][1]}>
            {states[order.orderState][0]}</Button>
          </View>
            
          
            
              


            {/* <Button mode='elevated' buttonColor={colors.ex1} textColor={'black'} >Cancel Order</Button> */}
            <Text variant='titleLarge' numberOfLines={2} style={{
              textAlign:'center',
              marginHorizontal:15,
              color:colors.primary,
              backgroundColor:colors.ex2,
              borderRadius:15,
              paddingHorizontal:15,
              fontSize:15
            }}>Order ID: {order.senderData.orderID}</Text>
  
          {/*  7ta la kan order state === wslek */}
          {(order.orderState === 0 || order.orderState === 3) && (
            
            <IconButton onPress={() => changeOrderData('deleteOrder', users, userID, order.senderData.orderID)} icon={'close'} iconColor={colors.ex1} style={{
              position:'absolute',
              top:-5,
              left:'85%',
              
            }} />
          )}
  
        </ImageBackground>

        <OrdersPopup states={states} action={(state, stateID) => {changeOrderData("orderState", theState[0],theState[1], theState[2],stateID);setTheState([])}} setVisible={setVisible} visible={visible} />
    </>
      )})
    )
  }
  // return (<></>)
}


const changeOrderData = (dataType,users, userID, orderID, newOrderState = 0) => {

  console.log("==============")
  console.log(orderID)
  // change Order State
  // Delete Order

  if(!users){
    return console.warn("Users not loaded yet !")
  }

  const userUid = users[userID]

  if (!userUid) return console.warn("No User found with uid : " + userUid);

  const ordersRef = ref(getDatabase(), `users/${userUid}/orders`)

  get(ordersRef).then((snapshot) => {

    if (snapshot.exists()) {
        const orders = snapshot.val()
        if (orders) {

          if (dataType == 'orderState'){
            const ordersArray = Object.values(orders)
            
            const targetOrder = ordersArray.findIndex(order => order.senderData.orderID == orderID)
            
            if (targetOrder != -1){
              ordersArray[targetOrder].orderState = newOrderState
              set(ordersRef, orders)
            }else {
              console.warn("Unable to find order with this id !")
            }

          }else if (dataType == 'deleteOrder'){
            let newOrders = orders.filter((order) => order.senderData.orderID != orderID)
            if (newOrders.length <= 0){
              newOrders = ["Item 1"]
            }

            set(ordersRef, newOrders)
          }


        }else {
          console.error("No orders found in the user " + userUid)
        }
    }else {
      console.error("No User found with uid : " + userUid);
    }

  }).catch (err => {
    console.error(err)
    throw err
  })



}





const MoreData = ({order}) => {
  const [dataShown, setDataShown] = useState(false)

  return (
    <>
    
        <TouchableOpacity onPress={() => setDataShown(!dataShown)} style={{flexDirection:'row', gap:15,width:'85%', alignItems:'center', justifyContent:'center', backgroundColor:colors.ex2, padding:10,borderRadius:15}}>
          <Text variant='headlineSmall'>{dataShown ? "Hide" : "Show"} Informations</Text>
          <Icon source={dataShown ? 'eye-off' : "eye"} size={25} color={colors.primary} />
        </TouchableOpacity>

      <View  style={{display:dataShown ? 'flex' : 'none',width:'90%',backgroundColor:colors.ex3,padding:15,borderRadius:5, justifyContent:'space-around', flexDirection:'row', flexWrap:'wrap', gap:10}}>
        <Text styles={{color:colors.primary}} variant='titleMedium'>Name: {order.senderData.name} </Text>
        
        <Text styles={{color:colors.primary}} variant='titleMedium'>Adresse: {order.senderData.adresse} </Text>
        <Text styles={{color:colors.primary}} variant='titleMedium'>Phone: {order.senderData.phone} </Text>
      </View>
      </>
  )
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





export default Manager;
