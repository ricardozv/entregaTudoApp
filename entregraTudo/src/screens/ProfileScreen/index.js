import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Auth, DataStore } from "aws-amplify";
import { User } from '../../models';
import { userAuthContext } from "../../components/Contexts/AuthContext";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [adress, setAdress] = useState("");
  const [lat, setLat] = useState("0");
  const [lng, setLng] = useState("0");

  const { sub } = userAuthContext();

  const onSave = () => {
    try {

    DataStore.save(new User ({ 
      name, 
      adress, 
      lat: parseFloat(lat), 
      lng: parseFloat(lng), sub }))
      } 
      catch(e) {
      Alert.alert("Error", e.message )
    }
  };

  return (
    <SafeAreaView>
      <Text style={styles.title}>Profile</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />
      <TextInput
        value={adress}
        onChangeText={setAdress}
        placeholder="Adress"
        style={styles.input}
      />
      <TextInput
        value={lat}
        onChangeText={setLat}
        placeholder="Latitude"
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        value={lng}
        onChangeText={setLng}
        placeholder="Longitude"
        style={styles.input}
      />
      <Button onPress={onSave} title="Save" />
          <Text 
            onPress={() => Auth.signOut()} 
            style = {{ textAlign: 'center', color:"red", margin: 20}}>
              Sign Out
          </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  input: {
    margin: 10,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
  },
});

export default ProfileScreen;


