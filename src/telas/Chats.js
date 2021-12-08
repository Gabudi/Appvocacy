
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, InputField } from 'react-native';
import { Card, CardItem, NativeBaseProvider } from "native-base";
import { getAuth } from "firebase/auth";
import { collection, onSnapshot, orderBy, where, query, addDoc, getFirestore, Timestamp } from "firebase/firestore";
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons'; 
import Message from "../components/Message";

const Chats = ({route,navigation}) => {
  const {params} = route;
  const db = getFirestore();
  const {Nome, Imagem, textoImg, Id, currentUserID} = params;
  const auth = getAuth();
  const user1 = auth.currentUser.uid;
  const user2 = Id
  const [textInput, setTextInput] = useState("");
  const [mensagem,setMensagem] = useState('')
  const [msgs,setMsgs] = useState([])
  const [id, setId ] = useState(user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`)

  useLayoutEffect(()=>{
    navigation.setOptions({
      headerTitle: <Text>{user2.name}</Text>
    })
  }, [navigation]);
  
  useEffect(() => {
    setTimeout(() => {
      selectUser()
    }, 1000);
  }, []);
    

  const selectUser = () => {
   

    const msgsRef = collection(db, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });

    console.log('foi')
    /* get last message b/w logged in user and selected user
    const docSnap = await getDoc(doc(db, "lastMsg", id));
    // if last message exists and message is from selected user
    if (docSnap.data() && docSnap.data().from !== user1) {
      // update last message doc, set unread to false
      await updateDoc(doc(db, "lastMsg", id), { unread: false });
    }*/
  };

  const handleSubmit = () => {
    console.log('inicio submmit')
    let url;
    try{
      addDoc(collection(db, "messages", id, "chat"), {
       text: mensagem,
       from: user1,
       to: user2,
       createdAt: Timestamp.fromDate(new Date()),
     });
    }catch(e){
      console.log(e)
    }


    /*await setDoc(doc(db, "lastMsg", id), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      unread: true,
    });*/
    //setMensagem("");

    console.log('fim submit')

  };

//  selectUser()

  return (
    <NativeBaseProvider>
    <View style = {styles.container}>
      <div className="messages">
        {msgs.length
          ? msgs.map((msgs, i) => (
            <Message key={i} msgs={msgs} user1={user1} />
          ))
        : null}
      </div>
    <View style={styles.enviar}>
      <TextInput
          placeholder="Escreva sua mensagem"
          numberOfLines={10}
          onChangeText={mensagem => setMensagem(mensagem)}
          style={styles.input}
      />
      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Ionicons name="send" size={30} color="#FFF" />
      </TouchableOpacity>
      
    </View>
    </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: "#e6e6e6"
    },
    Mensagem: {
      flexDirection: "row",
      alignItems: "center",
      alignContent: "center",
    },
    enviar:{
      position: "absolute",
      bottom: 10,
      width: "100%",
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "center",
      alignItems: 'center',
    },
    input: {
      width: 275,
      height: 40,
      borderStyle: "solid",
      borderColor: "#D49D3D",
      borderWidth: 1,
      top: 0,
      backgroundColor: "#FFF",
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      padding: 5
    },
    btn: {
      padding: 0,
      borderStyle: "solid",
      borderColor: "#D49D3D",
      borderWidth: 1,
      display: "flex",
      backgroundColor: "#D49D3D",
      justifyContent: "center",
      alignItems: "center",
      width: 50,
      height: 40,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
    },
})

export default Chats;