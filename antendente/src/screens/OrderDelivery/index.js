import { useRef, useMemo, useState, useEffect } from "react";
import { View, Text, useWindowDimensions, ActivityIndicator } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FontAwesome5, Fontisto } from '@expo/vector-icons';
import orders from '../../../assets/data/orders.json';
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import MapViewDirections from "react-native-maps-directions";

const order = orders[0];

const ORDER_STATUSES = {
    READY_FOR_PICKUP: "READY_FOR_PICKUP",
    ACCEPTED: "ACCEPTED",
    PICKED_UP: "PICKED_UP",
}

const OrderDelivery = () => {
    const [driverLocation, setDriverLocation ] = useState(null);
    const [ totalMinutes, setTotalMinutes ] = useState(0);
    const [ totalKm, setTotalKm ] = useState(0);

    const bottomSheetRef = useRef(null);
    const { width, height } = useWindowDimensions();
    const snapPoints = useMemo(() => ["7%", "93%"], []);

    useEffect(() => {
        ( async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (!status === 'granted') {
                console.log('me dá sua localização lindX ')
                    return;
            }
    
            let location = await Location.getCurrentPositionAsync();
            setDriverLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.07,
                longitudeDelta: 0.07,
            });
        })();

        const foregroundSubscription = Location.watchPositionAsync (
            {
               accuracy: Location.Accuracy.High,
               distanceInterval: 100
            }, ( updatedLocation ) => {
                setDriverLocation ({
                latitude: updatedLocation.coords.latitude,
                longitude: updatedLocation.coords.longitude
            })
          }
        )
        return foregroundSubscription;
      }, [])
    
      console.warn(driverLocation);
      if (!driverLocation) {
        return <ActivityIndicator size = {"large"} />
      }
    

    return (
        <View style={{ 
            backgroundColor: "lighblue", 
            flex: 1 }}>
              
            <GestureHandlerRootView 
            style={{
                backgroundColor:'lightblue', 
                flex:1
             }}>
                  <MapView 
                    style ={{ height, width }}
                    showsUserLocation
                    followsUserLocation
                    initialRegion={{ 
                    latitude: driverLocation.latitude,
                    longitude: driverLocation.longitude,
                    latitudeDelta: 0.07,
                    longitudeDelta: 0.07,
                }}>
                    <MapViewDirections 
                        origin = { driverLocation }
                        destination = {{ 
                            latitude: order.User.lat,
                            longitude: order.User.lng }}
                            strokeWidth = { 10 }
                            waypoints = {[{
                                latitude: order.Restaurant.lat,
                                longitude: order.Restaurant.lng
                            }]}
                            strokeColor = "#3FC060"
                            apikey={"AIzaSyA7H4d7iJeVlUpO-rdhi3H-9XBpLpxSGIg"}
                            onReady = {( result ) => {
                                setTotalMinutes ( result.duration );
                                setTotalKm( result.distance );
                            }}
                    />
                    <Marker
                        coordinate={{ 
                            latitude: order.Restaurant.lat,
                            longitude: order.Restaurant.lng,}}
                            title = {order.Restaurant.name}
                            description = { order.Restaurant.address } >
                                <View style = {{ backgroundColor: "green", padding: 5, borderRadius: 20}}>
                                    <Entypo name = "shop" size={33} color="white" />
                                </View>
                    </Marker>
                    <Marker
                        coordinate={{ 
                        latitude: order.User.lat,
                        longitude: order.User.lng,}}
                        title = {order.User.name}
                        description = { order.User.address }>
                            <View style = {{ 
                                backgroundColor: "green", 
                                padding: 5, 
                                borderRadius: 20
                            }}>
                                <MaterialIcons 
                                    name = "restaurant"
                                    size={33}
                                    color="white" />
                            </View>
                    </Marker>
                </MapView>
                <BottomSheet 
                    ref={bottomSheetRef} 
                    snapPoints={snapPoints}
                    handleIndicatorStyle={{ 
                        backgroundColor: "black",
                        width: 100
                    }}>
                    <View style = {{ 
                        flexDirection: 'row',
                        alignItems:'center',
                        justifyContent: 'center',
                        marginBottom: 10 }}>
                        
                        <Text style ={{
                            fontSize: 25,
                            letterSpacing: 1

                        }}> { totalMinutes.toFixed(0) } minutos </Text>
                        <FontAwesome5 
                            name="shopping-bag"
                            size={30}
                            color="#3FC060"
                            style={{ marginHorizontal: 10}}
                        />
                        <Text style= {{ 
                        fontSize: 25, 
                        letterSpacing: 1 }}>
                            { totalKm.toFixed(0) } km
                        </Text>
                    </View>
                    <View style = {{ 
                        paddingHorizontal: 20,
                    }}>
                        <Text style= {{ 
                            fontSize: 25,
                            paddingVertical: 4
                            }}>
                                {order.Restaurant.name}
                        </Text>
                        <View style = {{ 
                            flexDirection: 'row',
                            marginBottom: 18
                        }}>
                        <Fontisto 
                            name = "shopping-store"
                            size={23}
                            color='grey'
                            />
                        <Text style = {{ 
                            fontSize: 15, 
                            color:'grey',
                            letterSpacing: 0.5,
                            fontWeight: "500",
                            marginLeft: 14
                            
                             }}>
                                {order.Restaurant.address}
                        </Text>
                        </View>
                        <View style = {{ 
                            flexDirection:'row',
                            marginBottom: 10
                        }}>
                        <FontAwesome5 
                            name = "map-marker-alt"
                            size = { 30 }
                            color = 'grey'
                        />
                        <Text style= {{ 
                            fontSize: 14,
                            color:'grey',
                            fontWeight:'500',
                            letterSpacing:0.5,
                            marginLeft: 15 }}>
                            {order.User.address}
                        </Text>
                        </View>
                        
                        <View style = {{ 
                            paddingTop: 6,
                            borderTopWidth: 2,
                            borderColor:'lightgrey'
                        }}>
                            
                            <Text
                            style= {{
                                fontSize: 18,
                                color:'grey',
                                fontWeight:'500',
                                letterSpacing:0.5,
                                marginBottom: 5
                            }}>Uma cerveja Heineken</Text>
                            <Text
                             style= {{
                                fontSize: 18,
                                color:'grey',
                                fontWeight:'500',
                                letterSpacing:0.5,
                                marginBottom: 5
                            }}>Um hamburguer</Text>
                            <Text
                             style= {{
                                fontSize: 18,
                                color:'grey',
                                fontWeight:'500',
                                letterSpacing:0.5,
                                marginBottom: 5
                            }}>Um ingresso </Text>
                        </View>
                    </View>
                    <View style={{ 
                        backgroundColor:'green',
                        marginTop:'auto',
                        marginVertical: 30,
                        marginHorizontal: 15,
                        borderRadius: 12 
                    }}>
                        <Text style ={{
                            color:"white",
                            paddingVertical: 15,
                            fontSize: 25,
                            textAlign: "center",
                            letterSpacing: 0.5
                        }}>
                            Entregrar produto
                        </Text>
                    </View>
                </BottomSheet>
            </GestureHandlerRootView>
           
        </View>

    )
};

export default OrderDelivery;