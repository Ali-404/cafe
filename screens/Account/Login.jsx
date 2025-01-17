import {View, StyleSheet, Text, KeyboardAvoidingView,TextInput} from 'react-native';
import { Button, HelperText } from 'react-native-paper';
import colors from '../../data/colors';
import globalStyle from '../../data/globalStyle' ;
import { useState } from 'react';
import { signInWithEmailAndPassword,auth, signOut, resetPass } from '../../firebase/firebase';
import { isValidEmail } from '../../data/usefull';
const styles = globalStyle



const Login = ({navigation}) => {

    // const navigation = useNavigation()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    

    
const signInWithEmail = async (email, password, navigation) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in successfully!');
  
      if (!userCredential.user.emailVerified) {
        setError('Email not verified. Please check your email inbox.');
        await signOut(auth);
        return false;
      }
  
      navigation.navigate("Main");
      return true;
    } catch (error) {
      setError(error.message);
      return false, error; // Return the error message
    }
  };

    const signIn = () => {
        signInWithEmail(email, password, navigation)    
    }

    const PasswordForgot = (email) => {
      try {
        resetPass(email).then(() => {
          alert("You will get an email to change your password.")
        }).catch (err => {
          alert("Error:\n " + err.error)
          console.error(err)
        })
      }catch (err){
        alert("We have an error:\n " + err.error)
        console.error(err)
      }
    }

    return (
        <KeyboardAvoidingView  style={styles.form}>
            <View style={styles.input}>
                <Text style={styles.FormText}>Email</Text>
                <TextInput textContentType='emailAddress' onChangeText={setEmail} value={email} style={styles.inputField} placeholder='exemple@gmail.com' />
            </View>

            

            <View  style={styles.input}>
                <Text style={styles.FormText}>Password</Text>
                <TextInput secureTextEntry={true} textContentType='password' onChangeText={setPassword} value={password}  style={styles.inputField} />
            </View>

            <Button onPress={() => signIn()}  buttonColor={colors.secand} style={styles.button} mode="elevated"  textColor={colors.primary}>
                <Text style={{fontSize:20}}>Sign In</Text>
            </Button>
            {email && isValidEmail(email) && (
              <Button onPress={() => PasswordForgot()} mode='text' textColor={colors.secand} >
                Forget Password? Reset it
              </Button>
              
            )}

            <HelperText type="error" style={{fontSize:15}} visible={error}>
                    {error}
              </HelperText>

        </KeyboardAvoidingView>
    );
}

export default Login;
