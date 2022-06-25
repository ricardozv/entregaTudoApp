import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import  RestaurantDetailsScreen  from '../screens/RestaurantDetailsScreen';
// import DishListItem from './src/components/DishListItem';
// import RestaurantItem from '../components/RestaurantItem';
 import DishDetailsScreen from '../screens/DishDetailsScreen';
 import Basket from '../screens/Basket';
import OrdersScreen from '../screens/OrdersScreen';
import OrderDetails from '../screens/OrderDetails';
import { Foundation, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name = "HomeTabs" 
                component={HomeTabs}
                options={{headerShown: false }}
                />
        </Stack.Navigator>
    );
};

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
    return (
        <Tab.Navigator barStyle={{ backgroundColor:"white"}}>
            <Tab.Screen 
                name = 'Home'
                component={HomeStackNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => ( 
                    <Foundation 
                    name="home" 
                    size={24} 
                    color={color} 
                    />
                    ),
                }} 
            />
            <Tab.Screen 
                name = 'Orders'
                component={OrderStackNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => ( 
                    <MaterialIcons 
                        name="list-alt" 
                        size={24} 
                        color={color} 
                    />
                    ),
                }} 
            />
            <Tab.Screen 
                name = 'Profile'
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color }) => ( 
                        <FontAwesome5 
                            name="user-astronaut" 
                            size={24} 
                            color={color} 
                            />
                    ),
                }} 
            />
        </Tab.Navigator>
    );
};

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen 
                name="Restaurants" 
                component={HomeScreen} 
                />
            <HomeStack.Screen 
                name="Restaurant" 
                component={RestaurantDetailsScreen} 
                options={{headerShown: false }} 
                />
            <HomeStack.Screen 
                name="Dish" 
                component={DishDetailsScreen} 
                />
            <HomeStack.Screen 
                name="Basket" 
                component={Basket} 
                />
        </HomeStack.Navigator>
    );
};

const OrdersStack = createNativeStackNavigator();

const OrderStackNavigator = () => {
    return (
        <OrdersStack.Navigator>
            <OrdersStack.Screen 
                name="Orders" 
                component={OrdersScreen} 
                />
            <OrdersStack.Screen 
                name="Order" 
                component={OrderDetails} 
                />
        </OrdersStack.Navigator>
    );
};

export default RootNavigator;