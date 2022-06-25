import { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import DishListItem from '../../components/DishListItem';
import {Ionicons } from "@expo/vector-icons";
import Header  from './Header';
import styles from './styles';
import { useRoute, useNavigation } from "@react-navigation/native";
import { DataStore } from 'aws-amplify';
import { Restaurant } from '../../models';


const RestaurantDetailsScreen = () => {
    const [restaurant, setRestaurant] = useState(null);
    const route = useRoute();
    const navigation = useNavigation();
    const id = route.params?.id;

    useEffect(() => {
        DataStore.query(Restaurant, id).then(setRestaurant);
    },[])

    if (!restaurant) {
        return (< ActivityIndicator size={"large"} color="gray"/>)
    }
    
    return (
        <View style={styles.page}>
           
            <FlatList
                ListHeaderComponent={() => <Header restaurant = {restaurant} />}
                data = {restaurant.dishes}
                renderItem = {({ item }) => <DishListItem dish = {item} />}
                keyExtractor = {(item) => item.name}    
            />

            <Ionicons 
                onPress={()=> navigation.goBack()}
                name= "arrow-back-circle" 
                size={40} 
                color="white" 
                style={styles.iconContainer} 
            />
        </View>
    )
}

export default RestaurantDetailsScreen;

