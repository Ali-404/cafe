import { useEffect, useState } from 'react';
import {View, StyleSheet} from 'react-native';
import { Button, Dialog, PaperProvider, Portal, Text } from 'react-native-paper';
import colors from '../data/colors';



const OrdersPopup = ({visible,setVisible, states,action = (state, stateID) => false}) => {
   
    
    const showDialog = () => setVisible(true);
  
    const hideDialog = () => setVisible(false);
  
    return (
        <View>
          <Portal>
            <Dialog  visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Change Order State</Dialog.Title>
              <Dialog.Content>
                <Text variant="bodyMedium">Choose the order state:</Text>
              </Dialog.Content>
              <Dialog.ScrollArea >
              {states.map((state,k) => (
                <Button onPress={() => {action(state,k);hideDialog()} } style={{backgroundColor:state[1],marginBottom:5}} textColor={colors.primary} key={k}>{state[0]}</Button>

              ))}
              </Dialog.ScrollArea>
            </Dialog>
          </Portal>
        </View>
    );
  };

const styles = StyleSheet.create({})

export default OrdersPopup;
