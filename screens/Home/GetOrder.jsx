import { StatusBar } from 'expo-status-bar';
import {View, StyleSheet,TextInput, Alert, Linking, ScrollView} from 'react-native';
import { Button, HelperText, Text } from 'react-native-paper';
import colors from '../../data/colors';
import Notification from '../../components/Notification';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { get, getDatabase, off, onValue, ref, set } from 'firebase/database';
import { getUser } from '../../firebase/firebase';
import { clearBasket, selectBasketItems } from '../../features/basketSlice';
import { useDispatch, useSelector } from 'react-redux';
import { reloadApp } from '../../data/usefull'

const GetOrder = (props) => {
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [adresse, setAdresse] = useState('')
    const [city, setCity] = useState('')
    const [phone, setPhone] = useState('')

    const [pressed, setPressed] = useState(false)

    const validName = () => name.length >= 3 
    const validAdresse = () => adresse.length >= 6 
    const validCity = () => city.length >= 3 
    const validPhone = () => phone.length === 10 

    const meals = useSelector(selectBasketItems)
    
    const ConfermOrder = async (fromCafe = false) => {
        setPressed(true)
        const userRef = ref(getDatabase(), `users/${getUser().uid}`);
        
        try {
          const snapshot = await get(userRef);
          const userData = snapshot.val();
          let oldOrders = userData?.orders || [];
          
           // sender Data
           let senderData = {}
           if (!fromCafe){
            senderData = {
                name: name,
                adresse: adresse,
                city: city,
                phone: phone,
            }
            
           }
            

           const newOrder = { ...meals, orderState: 0,senderData: senderData };

          let updatedData;
      
          if (oldOrders.length === 1 && oldOrders[0] === 'Item 1') {
            updatedData = [newOrder];
          } else {
            if (oldOrders[0] == 'Item 1'){
                oldOrders.splice(0,1)
            }
            updatedData = [...oldOrders, newOrder];
          }
      
          // clear cart
          dispatch(clearBasket());
      
          // show notification
          Alert.alert('Cafe', 'Your Order has been placed successfully. \nYou can see your orders in Profile/Orders');
      
          setPressed(false)
          props.navigation.navigate('Home');

        try {
            await set(userRef, {
            orders: updatedData,
          });}
          catch (err){
            console.error(err)
            throw err
          }
      
          // navigate to home
        } catch (error) {
          // Handle errors
          console.error('Error processing order:', error);
          // You may want to show an error notification to the user
        }
      };

    return (
        <View style={styles.container}>
            <StatusBar style='light' />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{maxWidth:'95%', alignItems:'center', paddingBottom:15}}>

            <Text variant='headlineMedium' style={{width:'100%',textAlign:'left',color:colors.third, marginBottom:35, paddingHorizontal:15}}>Delevery Adresse</Text>

            <View style={styles.inputContainer}>
                <Text variant='titleMedium' style={{color:colors.third}}>Name</Text>
                <TextInput onChangeText={setName} defaultValue={name} style={styles.inputField}/>
            </View>
                <HelperText type="error" style={{fontSize:12}} visible={!validName()}>
                    The Name Should have 3 caracters or more !
                </HelperText>
            <View style={styles.inputContainer}>
                <Text variant='titleMedium' style={{color:colors.third}}>Adresse</Text>
                <TextInput onChangeText={setAdresse} defaultValue={adresse} style={styles.inputField}/>
            </View>
                <HelperText type="error" style={{fontSize:12}} visible={!validAdresse()}>
                    The Adresse Should have 6 caracters or more !
                </HelperText>
            <View style={styles.inputContainer}>
                <Text variant='titleMedium' style={{color:colors.third}}>City</Text>
                <TextInput onChangeText={setCity} defaultValue={city} style={styles.inputField}/>
            </View>
                <HelperText type="error" style={{fontSize:12}} visible={!validCity()}>
                    The City Should have 3 caracters or more !
                </HelperText>
            <View style={styles.inputContainer}>
                <Text variant='titleMedium' style={{color:colors.third}}>Phone</Text>
                <TextInput onChangeText={setPhone} defaultValue={phone} keyboardType='number-pad' style={styles.inputField}/>
            </View>
                <HelperText type="error" style={{fontSize:12}} visible={!validPhone()}>
                    The Phone Number Should have 10 numbers !
                </HelperText>

                {validName() && validAdresse() && validCity() && validPhone() && !pressed ?(
                    <Button  mode='elevated' onPress={() => ConfermOrder()} textColor={colors.primary} buttonColor={colors.secand} style={{marginVertical:20, width:'70%', padding:5}} >Conferm Order</Button>
            ) : (
                <Button  mode='elevated' textColor={colors.primary} buttonColor={colors.secand} style={{opacity:0.3,marginVertical:20, width:'70%', padding:5}} >Conferm Order</Button>
            )}

            <View style={{width:'100%',padding:15,flexDirection:'row', alignItems:'center'}}>
                <View style={styles.line}></View>
                <Text variant='headlineMedium' style={{color:colors.third, marginHorizontal:15}}>or</Text>
                <View style={styles.line}></View>
            </View>

            <Text style={{textAlign:'left', fontSize:18, color:colors.third, paddingHorizontal:15}}>
            You can come to our cafe and take the order yourself
            </Text>

         
            <Button disabled={pressed} mode='elevated' onPress={() => {ConfermOrder(true)}} textColor={colors.primary} buttonColor={colors.secand} style={{marginVertical:20, width:'70%', padding:5}} >Take it from cafe</Button>
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:colors.primary,
        alignItems:'center',
    },
    inputContainer:{
        width:'100%',
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row',
        paddingHorizontal:15,
        marginVertical:5,
    },
    inputField:{
        minWidth:'70%',
        borderRadius:15,
        padding:10,
        backgroundColor:colors.third,
    },
    line: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: colors.third,
      },
    

})

export default GetOrder;
