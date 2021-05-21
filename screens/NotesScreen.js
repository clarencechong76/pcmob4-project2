import React, { useEffect, useState } from "react";
import firebase from "../database/firebaseDB";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
const db = firebase.firestore().collection("todo");

export default function NotesScreen({ navigation, route }) {
  const [notes, setNotes] = useState([]);

firebase.firestore().collection("testing").add({
title: "testing! Does this work???",
body: "this is to check the Integration is working",
potato: true,
question: "why is there a potato bool here"
});

useEffect(() => {
  const unsubscribe = firebase
  .firestore()
  .collection("todo")
  .onSnapshot((collection) => {
    const updatedNotes = collection.docs.map((doc) => {
      const noteObject = {
        ...doc.data(),
        id: doc.id,
      };
      console.log(noteObject);
      return noteObject;

      });
    setNotes(updatedNotes);  
    
});

return () => {
  unsubscribe();
};
}, []);

  // This is to set up the top right button
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addNote}>
          <Ionicons
            name="ios-create-outline"
            size={30}
            color="black"
            style={{
              color: "#f55",
              marginRight: 10,
            }}
          />
        </TouchableOpacity>
      ),
    });
  });

  // Monitor route.params for changes and add items to the database
  useEffect(() => {
    if (route.params?.text) {
      const newNote = {
        title: route.params.text,
        done: false,
        id: notes.length.toString(),
      };
      firebase.firestore().collection("todo").add(newNote)
      
    }
  }, [route.params?.text]);

  function addNote() {
    navigation.navigate("Add Screen");
  }

  // This deletes an individual note
  function deleteNote(id) {
    console.log("Deleting " + id);
db.doc(id).delete();

    firebase
    .firestore()
    .collection("todo")
    .where("id", "==", id)
    .get()
    .then((querySnapshot) =>{
      querySnapshot.forEach((doc) => doc.ref.delete());
    });

  

    // To delete that item, we filter out the item we don't want
    setNotes(notes.filter((item) => item.id !== id));
  }

  // The function to render each row in our FlatList
  function renderItem({ item }) {
    return (
      <View
        style={{
          padding: 10,
          paddingTop: 20,
          paddingBottom: 20,
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>{item.title}</Text>
        <TouchableOpacity onPress={() => deleteNote(item.id)}>
          <Ionicons name="trash" size={16} color="#944" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        renderItem={renderItem}
        style={{ width: "100%" }}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffc",
    alignItems: "center",
    justifyContent: "center",
  },
});
