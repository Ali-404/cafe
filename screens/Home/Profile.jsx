import {View, StyleSheet,} from 'react-native';
import { Button, Text  } from 'react-native-paper';
import colors from '../../data/colors';
import { LogOut, getUser } from '../../firebase/firebase';
import Dialog from 'react-native-dialog'

import { getDatabase, ref, get, onValue } from 'firebase/database';
import { useEffect, useState } from 'react';
import { isStrongPassword } from '../../data/usefull';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';

const db = getDatabase();

const Profile = ({navigation}) => {

    const [prompShown, setPrompShown] = useState(false)
    const [newPassword, setNewPassword] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const adminRef = ref(getDatabase(), `admins`);
        onValue(adminRef, (snapshot) => {
            if (snapshot.exists()){
                
                const admins = snapshot.val()
                if (admins){
                    
                    admins.map(admin => {
                        if (admin === getUser().uid){
                            setIsAdmin(true)
                        }
                    })
                }
            }
        })
    }, [])


    const seeOrders = () => {
        navigation.navigate("Orders")
    }

    const manageOrders =() => {
        navigation.navigate("Manager")
    }

    const changePass = () => {
        if (newPassword){
            if (isStrongPassword(newPassword)){

                const credential = EmailAuthProvider.credential(getUser().email, oldPassword);

                reauthenticateWithCredential(getUser(), credential)
                    .then(() => {

                        updatePassword(getUser(),newPassword)
                        .then(function() {
                            setPrompShown(false)
                            // Password updated successfully
                        alert("Password updated successfully");

                        })
                        .catch(function(error) {
                            // An error occurred
                            alert("Error updating password: ", error);
                            console.error(error.message)
                        });       
                    })
                    .catch((err) => {
                        console.error(err.message)
                        alert(err.message)
                    })
            }else {
                alert("Please use a strong password !")
            }
        }
    }

    
    return (
        <View style={styles.container}>
            <View style={{justifyContent:'flex-start', width:'90%',minHeight:'40%', paddingBottom:35}}>
                

                <Text variant='headlineLarge' style={styles.text} >Email</Text>
                <Text style={styles.text} >{getUser().email}</Text>

                <Text variant='headlineLarge' style={styles.text} >Name</Text>
                <Text style={styles.text} >{getUser().displayName}</Text>

                
                
            </View>
            {isAdmin &&(
                <Button onPress={() => manageOrders()} style={{width:'70%', padding:10}} mode='elevated'  buttonColor={colors.ex3}  >
                    <Text  style={[styles.text, {fontSize:20, color:colors.primary}]}>Manage Orders</Text>
                </Button>
            )}
            
            <Button onPress={() => seeOrders()} style={{width:'70%', padding:10}} mode='elevated'  buttonColor={colors.ex1}  >
                <Text  style={[styles.text, {fontSize:20}]}>Orders</Text>
            </Button>
       

            <Button style={{width:'70%', padding:10}} onPress={() => setPrompShown(!prompShown)} mode='elevated'  buttonColor={colors.ex1}  >
                <Text  style={[styles.text, {fontSize:20}]}>Change Password</Text>
            </Button>

            <Button onPress={() => LogOut(navigation)} style={{width:'70%', padding:10}} mode='elevated'  buttonColor={colors.ex1}  >
                <Text  style={[styles.text, {fontSize:20}]}>Sign Out</Text>
            </Button>
            
            <ChangePasswordPromp visible={prompShown} onSubmit={() =>changePass()} onCancel={() => setPrompShown(false)} newPassword={newPassword} setNewPassword={setNewPassword} oldPassword={oldPassword} setOldPassword={setOldPassword} />
            
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.primary,
        alignItems:'center',
        flexGrow:1,
        gap:15,
    },
    text:{
        color:colors.third
    }

})



const ChangePasswordPromp = ({visible = false, onCancel = () => {}, onSubmit = () => {}, newPassword, setNewPassword, oldPassword, setOldPassword}) => {
    return (
        <Dialog.Container visible={visible}>
            <Dialog.Title>Change Password</Dialog.Title>
            <Dialog.Input defaultValue={oldPassword} onChangeText={setOldPassword} placeholder='Enter your password' passwordRules={true} secureTextEntry={true} textContentType='password' />
            <Dialog.Input defaultValue={newPassword} onChangeText={setNewPassword} placeholder='Enter new password' passwordRules={true} secureTextEntry={true} textContentType='password' />
            <Dialog.Button label="Cancel" onPress={onCancel} />
            <Dialog.Button label="Update Password" onPress={onSubmit} />
        </Dialog.Container>
    )
}

export default Profile;
