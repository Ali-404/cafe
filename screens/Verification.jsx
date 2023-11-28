import {View, StyleSheet, TouchableOpacity, Text, SafeAreaView, StatusBar, ImageBackground} from 'react-native';
import colors from '../data/colors';
import globalStyle from '../data/globalStyle';
import { Button, TextInput } from 'react-native-paper';
import { Link } from '@react-navigation/native';

const styles = globalStyle


const Verification = ({navigation}) => {

    

    return (
        <SafeAreaView style={styles_secand.container}>
            <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} translucent={true} />
            
            <ImageBackground 
            
            source={require("../assets/images/ptrn.png")}  style={globalStyle.container}
            resizeMode='repeat' imageStyle={{opacity:0.3}}
            >

            <Text style={[styles.bigTitle]}>Ali Cafe</Text>
            <Text style={styles.paragraph}>Best ☕ In Morocco</Text>

            <Text style={[styles.bigTitle, styles_secand.title]}>Number Verification</Text>

            <View style={styles.input}>
                <Text style={styles.FormText}>Verification Code</Text>
                <TextInput style={styles.inputField} placeholder='XXXXXX' keyboardType='numeric' />
                <Text style={styles_secand.p}>You will get a SMS contains the verification code.</Text>
                <View style={styles_secand.warningP}>
                    <Text style={styles_secand.p}>Don't Have it !</Text>
                    <Button>
                        <Text style={styles_secand.link}>Resend Code</Text>
                    </Button>
                </View>
            </View>

            <Button mode='elevated' buttonColor={colors.secand} t style={[styles.button,styles_secand.btn]}>
                <Text style={styles_secand.btnText}>Verify</Text>
            </Button>


            
            

            </ImageBackground>
        </SafeAreaView>
    );
}

const styles_secand = StyleSheet.create({
    container:{
        backgroundColor:colors.primary,
        flex:1,
        alignContent:'center',
        justifyContent:'center'
    },

    title:{
        fontSize:45,
        fontWeight:'normal',
        marginVertical:25,
        width:'100%',
        
    },
    p:{
        color:colors.third, 
        maxWidth:'90%',
        // backgroundColor:"red"
        fontSize:18,
        paddingHorizontal:5,
        marginVertical:15,

    },
    warningP:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    btnText:{
        fontSize:18,
        textAlign:'center',
        color:colors.secand,
        color:colors.primary
    },
    link:{
        fontSize:18,
        color:colors.secand,
        textDecorationLine:'underline',
    }
    

    
})

export default Verification;
