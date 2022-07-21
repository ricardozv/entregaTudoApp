import {View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Auth, DataStore } from "aws-amplify";
import { Courier } from '../../models';
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const ProfileScreen = () => {
  const { dbCourier, sub, setDbCourier } = useAuthContext();

  const [name, setName] = useState(dbCourier?.name || "");
  const [adress, setAdress] = useState(dbCourier?.lat + "" || "0");
  const [lat, setLat] = useState(dbCourier?.lat + "" || "0");
  const [lng, setLng] = useState(dbCourier?.lng + "" || "0");


  const navigation = useNavigation();

  const onSave = async () => {
    if (dbCourier){
      await updateUser();
      } else {
        await createUser();
      }
      navigation.goBack();
    };

    const updateCourier = async () => {
      const courier = await DataStore.save (
        Courier.copyOf(dbCourier, ( updated ) => {
          updated.name = name;
          updated.address = adress;
          updated.lat = parseFloat(lat);
          updated.lng = parseFloat(lng); 
        })
      );
      setDbCourier(courier);
    }

    const createCourier = async () => {
      try {
        const courier = await DataStore.save(
          new Courier({
            name,
            adress,
            lat:parseFloat(lat),
            lng: parseFloat(lng),
            sub,
          })
        );
        setDbCourier(courier);
      } catch(e) {
        Alert.alert( "Error", e.message);
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
      <View style={{ flexDirection: "row"}}>
        <View style ={{ backgroundColor: "red"}}>
            <MaterialIcons name = "pedal-bike" size={40} color="black"/>
          </View>
          <View>
          <FontAwesome5 name = "car" size={40} color="black"/>
        </View>
      </View>


      <Button 
          onPress={onSave} 
          title="Save" />
          <Text 
            onPress={() => Auth.signOut()} 
            style = {{ 
              textAlign: 'center', 
              color:"red", 
              margin: 20
              }}>
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


