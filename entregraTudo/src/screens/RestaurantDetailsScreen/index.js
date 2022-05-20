import { View, FlatList, StyleSheet} from 'react-native';
import DishListItem from '../../components/DishListItem';
import {Ionicons } from "@expo/vector-icons";
import restaurants from '../../../assets/data/restaurants.json';
import Header  from './Header';
import styles from './styles';

const restaurant = restaurants[0];

const RestaurantDetailsScreen = () => {
    return (
        <View style={styles.page}>
           
            <FlatList
                ListHeaderComponent={() => <Header restaurant = {restaurant} />}
                data = {restaurant.dishes}
                renderItem = {({ item }) => <DishListItem dish = {item} />}
            />
                        <Ionicons 
                name= "arrow-back-circle" 
                size={38} 
                color="white" 
                style={styles.iconContainer} 
                />
        </View>
    )
}

export default RestaurantDetailsScreen;

