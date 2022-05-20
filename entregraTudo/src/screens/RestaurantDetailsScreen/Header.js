import { View, Text, Image, FlatList, StyleSheet} from 'react-native';
import styles from './styles';



const RestaurantHeader = ({restaurant}) => {
    return (
        <View style={styles.page}>
            <Image 
                source={{uri: restaurant.image}} 
                style={styles.image}
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

export default RestaurantHeader;

