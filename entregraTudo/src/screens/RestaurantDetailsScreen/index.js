import { View, FlatList} from 'react-native';
import DishListItem from '../../components/DishListItem';
import {Ionicons } from "@expo/vector-icons";
import restaurants from '../../../assets/data/restaurants.json';
import Header  from './Header';
import styles from './styles';
import { useRoute, useNavigation } from "@react-navigation/native";

const restaurant = restaurants[0];

const RestaurantDetailsScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();

    const id = route.params?.id;
    

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

