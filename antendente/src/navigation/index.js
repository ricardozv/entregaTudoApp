import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrdersScreen from "../screens/OrdersScreen";
import OrderDelivery from "../screens/OrderDelivery";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen 
            name = "OrdersScreen"
            component={OrdersScreen}
            />
        <Stack.Screen 
            name = "OrderDelivery"
            component={OrderDelivery}
            />
    </Stack.Navigator>
    )

}

export default Navigation;