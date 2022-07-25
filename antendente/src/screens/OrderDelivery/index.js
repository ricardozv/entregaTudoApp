import { useRef, useMemo, useState, useEffect } from "react";
import { View, Text, useWindowDimensions, ActivityIndicator, Pressable } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FontAwesome5, Fontisto } from '@expo/vector-icons';
// import orders from '../../../assets/data/orders.json';
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import { Entypo, MaterialIcons, Ionicons } from "@expo/vector-icons";
import MapViewDirections from "react-native-maps-directions";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DataStore } from "aws-amplify";
import {Order, OrderDish} from "../../models";
import {User} from "../../models";
//import { BottomSheetFlatList } from "@gorhom/bottom-sheet";


const ORDER_STATUSES = {
    READY_FOR_PICKUP: "READY_FOR_PICKUP",
    ACCEPTED: "ACCEPTED",
    PICKED_UP: "PICKED_UP",
}

const OrderDelivery = () => {
    const [ order, setOrder ] = useState(null);
    const [ user, setUser ] = useState(null);
    const [ dishItems, setDishItems ] = useState([]);
    const [driverLocation, setDriverLocation ] = useState(null);
    const [ totalMinutes, setTotalMinutes ] = useState(0);
    const [ totalKm, setTotalKm ] = useState(0);
    const [ deliveryStatus, setDeliveryStatus ] = useState(ORDER_STATUSES.READY_FOR_PICKUP);
    const [ isDriverClose, setIsDriverClose ] = useState(false);

    const bottomSheetRef = useRef(null);
    const mapRef = useRef(null);
    const { width, height } = useWindowDimensions();
    const snapPoints = useMemo(() => ["9%", "90%"], []);
    const navigation = useNavigation();
    const route = useRoute();
    const id = route.params?.id;

    useEffect(() => {
        if (!id) {
            return;
        }
        DataStore.query(Order, id).then(setOrder);
    }, [id])

    useEffect(()=> {
        if(!order) {
            return;
        }
        DataStore.query(User, order.userID).then(setUser)
        DataStore.query(OrderDish, (od) => od.orderID("eq", order.id)).then(
            setDishItems
        )
    }, [order]);

    useEffect(() => {
         (async () => {
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

      const onButtonpressed = () => {
        if (deliveryStatus === ORDER_STATUSES.READY_FOR_PICKUP ) {
            bottomSheetRef.current?.collapse();
            mapRef.current.animateToRegion({
                latitude: driverLocation.latitude,
                longitude: driverLocation.longitude,
                latitudeDelta: 0.01,
                longitude: 0.01
            });
            setDeliveryStatus(ORDER_STATUSES.ACCEPTED);
        }
        if ( deliveryStatus === ORDER_STATUSES.ACCEPTED) {
            bottomSheetRef.current?.collapse();
            setDeliveryStatus(ORDER_STATUSES.PICKED_UP);
        }
        if ( deliveryStatus === ORDER_STATUSES.PICKED_UP) {
            bottomSheetRef.current?.collapse();
            navigation.goBack();
            
        }
      }
    
      const renderButtonTitle = () => {
        if (deliveryStatus === ORDER_STATUSES.READY_FOR_PICKUP ) {
            return 'accept order'
        }
        if (deliveryStatus === ORDER_STATUSES.ACCEPTED ) {
            return 'Pick - up Order'
        }
        if (deliveryStatus === ORDER_STATUSES.PICKED_UP ) {
            return 'Complete delivery'
        }
      }

      const isButtonDisabled = () => {
        if (deliveryStatus === ORDER_STATUSES.READY_FOR_PICKUP) {
            return false;
        }
        if ( deliveryStatus === ORDER_STATUSES && isDriverClose) {
            return false;
        }
        if ( deliveryStatus === ORDER_STATUSES.PICKED_UP && isDriverClose ) {
            return false;
        }
        return true;
      }

      const restaurantLocation = { 
        latitude: order?.Restaurant?.lat, 
        longitude: order?.Restaurant?.lng }
    
    const deliveryLocation = { 
        latitude: user?.lat,
        longitude: user?.lng }

      if (!driverLocation) {
        return <ActivityIndicator size = {"large"} />
      }

      if (!order || !user || !driverLocation) {
        return (
            <ActivityIndicator  size = {"large"} color ="gray"/>
        )
      }

    return (
        <View style={{ backgroundColor: "lighblue", flex: 1 }}>
            <GestureHandlerRootView style={{ backgroundColor:'lightblue', flex:1 }}>
                  <MapView 
                    ref = {mapRef}
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
                        destination = {
                            deliveryStatus === ORDER_STATUSES.ACCEPTED 
                            ? restaurantLocation
                            : deliveryLocation
                            }
                            strokeWidth = { 10 }
                            waypoints = { deliveryStatus === ORDER_STATUSES.READY_FOR_PICKUP 
                                ? [ restaurantLocation ]: []}
                            strokeColor = "#3FC060"
                            apikey={"AIzaSyA7H4d7iJeVlUpO-rdhi3H-9XBpLpxSGIg"}
                            onReady = {( result ) => {
                                if(result.distance <= 0.1 ) {
                                    setIsDriverClose(result.distance <= 0.1);
                                }
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
                        coordinate={ deliveryLocation }
                        title = {user.name}
                        description = { user.address }>
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
                { deliveryStatus === ORDER_STATUSES.READY_FOR_PICKUP && (
                        <Ionicons
                        onPress={() => navigation.goBack()}
                        name = "arrow-back-circle"
                        size = { 45 }
                        color = 'green'
                        style={{ top: 40, left: 15, position: 'absolute'}}
                        />

                )}
                
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
                            {user.adress}
                        </Text>
                        </View>
                        
                        <View style = {{ paddingTop: 6, borderTopWidth: 2, borderColor:'lightgrey'}}>
                            {dishItems.map((dishItem) => (        
                                    <Text style= {{ fontSize: 18, color:'grey', fontWeight:'500', letterSpacing:0.5,marginBottom: 5 }}key ={dishItem.id}>
                                        {dishItem.Dish.name} X {dishItem.quantity} 
                                    </Text>
                                ))}
                    </View>
                    </View>
                    <Pressable 
                    style={{ 
                        backgroundColor: isButtonDisabled() ? 'grey':"#3FC060",
                        marginTop:'auto',
                        marginVertical: 30,
                        marginHorizontal: 15,
                        borderRadius: 12 
                    }} onPress = { onButtonpressed } 
                       disabled = { isButtonDisabled()}>
                        <Text style ={{
                            color:"white",
                            paddingVertical: 15,
                            fontSize: 25,
                            textAlign: "center",
                            letterSpacing: 0.5
                        }}>
                         { renderButtonTitle() }
                        </Text>
                    </Pressable>
                </BottomSheet>
            </GestureHandlerRootView>
           
        </View>

    )
};

export default OrderDelivery;