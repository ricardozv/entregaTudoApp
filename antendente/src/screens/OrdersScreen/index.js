import { useRef, useMemo, useEffect, useState } from 'react';
import { View, Text, Dimensions, useWindowDimensions, ActivityIndicator } from 'react-native';
import BottomSheet, {BottomSheetFlatList } from '@gorhom/bottom-sheet';
import * as Location from "expo-location";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import OrderItem from '../../components/OrderItem';
import MapView, { Marker } from "react-native-maps";
import { Entypo } from "@expo/vector-icons";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { DataStore } from 'aws-amplify';
import { Order } from '../../models';

const OrdersScreen = () => {
    const [ orders, setOrders ] = useState([]);
    const [driverLocation, setDriverLocation ] = useState(null);
    const bottomSheetRef = useRef(null);
    const { width, height } = useWindowDimensions();
    const snapPoints = useMemo(() => ["9%", "90%"], []);

    useEffect(() => {
        DataStore.query(Order, (order) =>
        order.status("eq", "READY_FOR_PICKUP")
        ).then(setOrders);
    }, []);

    console.log(orders)

  useEffect(() => {
     (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (!status === 'granted') {
            console.log('me dá sua localização lindX ')
                return;
        }

        let location = await getCurrentPositionAsync();
        setDriverLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.07,
            longitudeDelta: 0.07,
        });
    })(); 
  }, [])

  
  if (!driverLocation) {
    return <ActivityIndicator size = {"large"}/>
  }

    return (
    <View style={{backgroundColor:'lightblue', flex:1}}>
      <GestureHandlerRootView style={{backgroundColor:'lightblue', flex:1}}>
                <MapView style = {{ 
                    height, 
                    width, }}
                    showsUserLocation 
                    followsUserLocation
                    region={{
                        latitude:driverLocation.latitude,
                        longitude:driverLocation.longitude,
                        latitudeDelta: 0.07,
                        longitudeDelta: 0.07,
                    }}>
                        { orders.map (( order )=>(
                          <Marker 
                             title= { order.Restaurant.name }
                             description={ order.Restaurant.address }
                             coordinate = {{
                                  latitude: order.Restaurant.lat,
                                  longitude: order.Restaurant.lng,
                            }}>
                                <View style = {{ 
                                        backgroundColor: 'green',
                                        padding: 5,
                                        borderRadius: 20 }}>
                                <Entypo 
                                    name = "shop"
                                    size = {24}
                                    color = 'white' />
                                </View> 
                          </Marker>
                ))}
   
              </MapView>

        <BottomSheet index = {1} ref={bottomSheetRef} snapPoints={snapPoints}>
            <View style={{ alignItems:"center"}}>        
                <Text style = {{
                    fontSize: 20,
                    fontWeight: "600",
                    letterSpacing: 0.5,
                    paddingBottom: 5
                }}> 
                Pedidos Realizados: {orders.length} 
                </Text>
            </View>
        <BottomSheetFlatList
            showsVerticalScrollIndicator={false}
            data={orders}
            renderItem = {({ item }) => 
                   {
                    return <OrderItem
                        order={item} />;
                }}/>
        
        </BottomSheet>
      </GestureHandlerRootView>
    </View>
)

};

export default OrdersScreen;