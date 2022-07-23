import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrdersScreen from "../screens/OrdersScreen";
import OrderDelivery from "../screens/OrderDelivery";
import ProfileScreen from "../screens/ProfileScreen";
import { useAuthContext } from "../contexts/AuthContext";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const { dbCourier } = useAuthContext();
    return (
        
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        { dbCourier ? (
        <>
             <Stack.Screen 
             name = "OrdersScreen"
             component={OrdersScreen}
             />
             <Stack.Screen 
             name = "OrderDelivery"
             component={OrderDelivery}
             />
        </>
        ) : (
            <Stack.Screen 
                name = "Profile"
                component={ProfileScreen}
            />
        )}
       
    </Stack.Navigator>
    )

}

export default Navigation;