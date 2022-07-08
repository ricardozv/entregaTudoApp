import { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Pressable, Text } from 'react-native';
import DishListItem from '../../components/DishListItem';
import {Ionicons } from "@expo/vector-icons";
import Header  from './Header';
import styles from './styles';
import { useRoute, useNavigation } from "@react-navigation/native";
import { DataStore } from 'aws-amplify';
import { Restaurant } from '../../models';
import { Dish } from '../../models';
import { useBasketContext } from '../../components/Contexts/BasketContext';


const RestaurantDetailsScreen = () => {
    const [restaurant, setRestaurant] = useState(null);
    const [ dishes, setDishes ] = useState([]);
    const route = useRoute();
    const navigation = useNavigation();
    const id = route.params?.id;

    const { setRestaurant: setBasketRestaurant, basket, basketDishes } = useBasketContext();

    useEffect(() => {
        if(!id) {
            return;
        }
        setBasketRestaurant(null);

        DataStore.query(Restaurant, id).then(setRestaurant);
        DataStore.query( 
            Dish, (dish) => dish.restaurantID("eq", id )).then(
            setDishes
        );
    },[id]);

    useEffect(() => {
        setBasketRestaurant(restaurant);
    }, [restaurant])

    if (!restaurant) {
        return (< ActivityIndicator size={"large"} color="gray"/>)
    }
    
    return (
        <View style={styles.page}>
            <FlatList
                ListHeaderComponent={() => <Header restaurant = {restaurant} />}
                data = {dishes}
                renderItem = {({ item }) => <DishListItem dish = {item} />}
                keyExtractor = {(item) => item.name}
                showsVerticalScrollIndicator = {false}    
            />
            <Ionicons 
                onPress={()=> navigation.goBack()}
                name= "arrow-back-circle" 
                size={40} 
                color="white" 
                style={styles.iconContainer} 
            />
           { basket && (
           <Pressable onPress={() => navigation.navigate ("Basket")} style = { styles.button }>
                <Text style = { styles.buttonText}>
                    Open Basket ({ basketDishes.length })
                </Text>
            </Pressable>
                )}
        </View>
    )
}

export default RestaurantDetailsScreen;

