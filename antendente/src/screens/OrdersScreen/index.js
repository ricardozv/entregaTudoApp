import { useRef } from 'react';
import { View, Text } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import orders from '../../../assets/data/orders.json';
import { GestureHandlerRootView } from "react-native-gesture-handler";


const OrdersScreen = () => {
    const bottomSheetRef = useRef(null);
return (
    <View style={{backgroundColor:'lightblue', flex:1}}>
    <GestureHandlerRootView style={{backgroundColor:'lightblue', flex:1}}>
    <BottomSheet ref={bottomSheetRef} snapPoints={["25%", "95%"]}>
        <View style={{ flex:1 }}>        
            <Text> Fala tu: {orders.length} </Text>
        </View>
        
    </BottomSheet>
    </GestureHandlerRootView>
    </View>
)

};

export default OrdersScreen;