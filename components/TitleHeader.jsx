import {View, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import { Text } from 'react-native-paper';
import { Icon } from 'react-native-paper'
import colors from '../data/colors';
import { useNavigation, useRoute } from '@react-navigation/native';

const Header = ({title}) => {
    const navigation = useNavigation()
    const route = useRoute()
    return (
        <View style={{
            paddingVertical:30,
            paddingHorizontal:15,
            backgroundColor:colors.primary,
            alignItems:'center',
            justifyContent:'center',
            width:'100%',
            
        }}>
            <View style={{
                
                width:'100%',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
                gap:15,
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon source={'arrow-left'} size={28} color={colors.third} />
                </TouchableOpacity>
                <Text variant='headlineSmall' style={{color:colors.third, fontWeight:'bold'}}>{title || route.name || 'Untitled'}</Text>
                <Text variant='headlineSmall'  style={{flex:0.1}}></Text>
            </View>            
        </View>
    );
}

const styles = StyleSheet.create({})

export default Header;
