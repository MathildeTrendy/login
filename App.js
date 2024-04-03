import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { app, database } from './firebase';
import { getAuth } from "firebase/auth";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';


let auth
if(Platform.OS === 'web'){
  auth = getAuth(app)
}else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  })
}



export default function App() {
const [enteredEmail, setEnteredEmail] = useState("123@hotmail.com")
const [enteredPassword, setEnteredPassword] = useState("123456")
const [userId, setUserId] = useState(null)
const [enteredText, setenteredText] = useState("type here")

useEffect(() =>{
  const auth_ = getAuth()
  const unsubscribe = onAuthStateChanged(auth_, (currentUser) => {
    if (currentUser){
      setUserId(currentUser.uid)
    }else{
      setUserId(null)
    }
  })
  return () => unsubscribe()
},[])


async function addDocument(){
try{
await addDoc(collection(database, userId),{
text:enteredText
})
}catch(error){
console.log("error addDocument " + error)
}
}


async function login(){
  try{
    const userCredential = await signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
    console.log("logged in " + userCredential.user.uid)
    setUserId(response.data.localId)
  }catch(error){}
}


async function signup(){
try{
const userCredential = await createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
}catch(error){
console.log("New user added" + userCredential.user.uid)
}
}

async function sign_out(){
  await signOut(auth)
}

return (
<View style={styles.container}>
 { !userId &&
  <>
<Text>Login</Text>
<TextInput
onChangeText={newText => setEnteredEmail(newText)}
value={enteredEmail}
/>
<TextInput
onChangeText={newText => setEnteredPassword(newText)}
value={enteredPassword}
/>
<Button
title='Log in'
onPress={login}
/>
<TextInput
onChangeText={newText => setEnteredEmail(newText)}
value={enteredEmail}
/>
<TextInput
onChangeText={newText => setEnteredPassword(newText)}
value={enteredPassword}
/>
<Button
title='Signup'
onPress={signup}
/>
</> 
}
{ userId &&
  <>
<TextInput
onChangeText={newText => setenteredText(newText)}
value={enteredText}
/>
<Button
title='Add new Document'
onPress={addDocument}
/>
<Button
title='Sign out'
onPress={sign_out}
/>
</>
}
</View>
);
}


const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff',
alignItems: 'center',
justifyContent: 'center',
},
});




