import { View, Text, Image, FlatList, StyleSheet} from 'react-native';
import {Ionicons } from "@expo/vector-icons";
import restaurants from '../../../assets/data/restaurants.json'

const restaurant = restaurants[0];

const RestaurantDetailsPage = () => {
    return (
        <View style={styles.page}>
            <Image 
                source={{uri: restaurant.image}} 
                style={styles.image}
                 />
            
            <Ionicons 
                name= "arrow-back-circle" 
                size={38} 
                color="white" 
                style={styles.iconContainer} 
            />
        
            <View style={styles.container}>
            <Text style = {styles.title}>{restaurant.name}</Text>
            <Text style = {styles.subtitle}> R$ {restaurant.deliveryFree} &#82286; 
                {restaurant.minDelivery}-{restaurant.maxDelivery}
                Tempo de entrega 
            </Text>
            </View>
        </View>
    )
}

export default RestaurantDetailsPage;

const styles = StyleSheet.create ({
    page:{
        flex:1
    },
    iconContainer:{
        position: 'absolute',
        top: 40,
        left: 10,
        borderRadius: 50,

    },
    image: {
        width:'100%',
        aspectRatio: 5 / 3
    },
    title:{
        fontSize: 35,
        fontWeight:"600",
        marginVertical: 10,
        margin: 10
    },
    subtitle: {
        color: "grey",
        fontSize: 16
    }, 
    container: {
        margin: 10
    },

});

