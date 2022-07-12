import { useRef, useMemo } from "react";
import { View, Text } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FontAwesome5 } from '@expo/vector-icons';
import orders from '../../../assets/data/orders.json';
const order = orders[0];

const OrderDelivery = () => {
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ["10", "93%"], [])

    return (
        <View style={{ 
            backgroundColor: "lighblue", 
            flex: 1 }}>
            <GestureHandlerRootView style={{backgroundColor:'lightblue', flex:1}}>
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
                        justifyContent: 'center' }}>
                        
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
                        letterSpacing: 1 }}>5 km</Text>
                    </View>
                </BottomSheet>
            </GestureHandlerRootView>
           
        </View>

    )
};

export default OrderDelivery;