import {View, StyleSheet, Text, KeyboardAvoidingView, TextInput} from 'react-native';
import { Button, HelperText} from 'react-native-paper';
import colors from '../../data/colors';
import globalStyle from '../../data/globalStyle' ;
import { useState } from 'react';
import { createUserWithEmailAndPassword,auth, sendEmailVerification, updateProfile, getUser } from '../../firebase/firebase';
import {getUsernameFromEmail, isStrongPassword, isValidEmail} from '../../data/usefull'
const styles = globalStyle 


import { getDatabase, ref, set } from 'firebase/database';

const db = getDatabase();



const Register = ({navigation}) => {
    
    const [pressed, setPressed] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRePassword] = useState('')
    const [theError, setTheError] = useState(false)



    const signUpWithEmail = async (email, password, navigation) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // orders 
            const userRef = ref(db, `users/${userCredential.user.uid}`)
            set(userRef, {
                orders: ["Item 1"]
            }).then(() => {
                console.log('Database uploaded')
            }).catch((err) => console.error(err))



            console.log('User account created successfully!');
            // Send email verification
            await sendEmailVerification(userCredential.user);
            
            // name
            await updateProfile(userCredential.user, {displayName: getUsernameFromEmail(email)})
            
            
            navigation.navigate("Login")
            return true; // Return true if sign-up and verification were successful
        } catch (error) {
            console.error('Error creating user:', error);
            setTheError(error)
          return error.message; // Return the error message
        }
      };
      

    
    var errIndice = 0
    const errors = ['Invalid Email !', "Use a strong password contains 8 caracters and symbols and Capitals letters! Exemple: StrongPass123__ ", "Not matching the password!"]

    const registerFunc = () => {
        setPressed(true)
        signUpWithEmail(email, password,navigation)
        setTimeout(() => {
            setPressed(false)
        },2000)
       
    }   

    

    
    const emailError = () => !isValidEmail(email) 
    const passwordError = () => !isStrongPassword(password) 
    

    const repasswordError = () => password != repassword
    

    return (
        <KeyboardAvoidingView style={styles.form}>
            <View style={styles.input}>
                <Text style={styles.FormText}>Email</Text>
                <TextInput onChangeText={setEmail} value={email} textContentType='emailAddress' style={styles.inputField} placeholder='exemple@gmail.com' />

                {emailError() && (
                    <HelperText type="error" style={{fontSize:12}} visible={emailError()}>
                        {errors[0]}
                    </HelperText>
                )}
            </View>

            <View  style={styles.input}>
                <Text style={styles.FormText}>Password</Text>
                <TextInput onChangeText={setPassword} value={password} secureTextEntry={true} style={styles.inputField} textContentType='password'  />
                {passwordError() && (
                    <HelperText type="error" style={{fontSize:12}} visible={passwordError()}>
                    {errors[1]}
                </HelperText>
                )}
            </View>

            <KeyboardAvoidingView style={styles.input}>
                <Text style={styles.FormText}>Conferme Password</Text>
                <TextInput onChangeText={setRePassword} value={repassword} secureTextEntry={true} style={styles.inputField}  textContentType='password' />
                {repasswordError() && (
                    <HelperText type="error" style={{fontSize:12}} visible={repasswordError()}>
                        {errors[2]}
                    </HelperText>
                )}
            </KeyboardAvoidingView>

            {!emailError() && !passwordError() && !repasswordError() && !pressed && (
                <Button

                    onPress={() => registerFunc()}
                    buttonColor={colors.secand}
                    style={styles.button}
                    mode="elevated"
                    textColor={colors.primary}>
                    <Text style={{fontSize:20}}>Sign Up</Text>
                
                </Button>
            )}

            {theError && (
                <HelperText type="error" style={{fontSize:12}} visible={theError}>
                        {theError.message}
                    </HelperText>
            )}

        </KeyboardAvoidingView>
    );
}

export default Register;
