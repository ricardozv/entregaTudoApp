import { useRef, useMemo } from 'react';
import { View, Text } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import orders from '../../../assets/data/orders.json';
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import OrderItem from '../../components/OrderItem';

const OrdersScreen = () => {
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ["8.5%", "93%"], [])

    return (
    <View style={{backgroundColor:'lightblue', flex:1}}>
      <GestureHandlerRootView style={{backgroundColor:'lightblue', flex:1}}>
        <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
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
        <FlatList
            showsVerticalScrollIndicator={false}
            data={orders}
            renderItem = {({ item }) => <OrderItem order={item} />} 
        />
        
    </BottomSheet>
    </GestureHandlerRootView>
    </View>
)

};

export default OrdersScreen;