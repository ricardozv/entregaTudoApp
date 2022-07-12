import { View, FlatList } from 'react-native';
import OrderListItem from '../../components/OrderListItem';
import { useOrderContext } from '../../components/Contexts/OrderContext';

const OrdersScreen = ( ) => {
    const { orders } = useOrderContext();


    return (
        <View 
            style = {{ 
                flex: 1, 
                width: "100%", 
                paddingTop: 10 }}>
           <FlatList
            data = {orders}
            renderItem = {({ 
                item }) => 
                <OrderListItem order = {item} 
                />}
            />
        </View>
    )
}

export default OrdersScreen;

