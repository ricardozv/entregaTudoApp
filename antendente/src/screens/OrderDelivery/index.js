import { useRef, useMemo } from "react";
import { View, Text } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FontAwesome5, Fontisto } from '@expo/vector-icons';
import orders from '../../../assets/data/orders.json';

const order = orders[0];

const OrderDelivery = () => {
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ["8.6", "93%"], [])

    return (
        <View style={{ 
            backgroundColor: "lighblue", 
            flex: 1 }}>
            <GestureHandlerRootView 
            style={{
                backgroundColor:'lightblue', 
                flex:1
            }}>
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

                        }}> 25 minutes </Text>
                        <FontAwesome5 
                            name="shopping-bag"
                            size={30}
                            color="#3FC060"
                            style={{ marginHorizontal: 10}}
                        />
                        <Text style= {{ 
                        fontSize: 25, 
                        letterSpacing: 1 }}>
                            5 km
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