import { View, Text, Image, FlatList, StyleSheet} from 'react-native';
import styles from './styles';

const DEFAULT_IMAGE = 
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg"


const RestaurantHeader = ({restaurant}) => {
    return (
        <View style={styles.page}>
            <Image 
                source={{
                    uri: restaurant.image.startsWith('http') 
                    ? restaurant.image 
                    : DEFAULT_IMAGE
                }} 
                style={styles.image}
            />
                 
            <View style={styles.container}>
            <Text style = {styles.title}>{restaurant.name}</Text>
            <Text style = {styles.subtitle}> R$ {restaurant.deliveryFree} &#82286; 
                {restaurant.minDelivery}-{restaurant.maxDelivery}
                Tempo de entrega 
            </Text>
            <Text style = {styles.menuTitle} >Menu</Text>
            </View>
        </View>
    )
}

export default RestaurantHeader;

