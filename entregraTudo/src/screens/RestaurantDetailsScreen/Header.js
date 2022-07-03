import { View, Text, Image } from 'react-native';
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
            <Text style = {styles.subtitle}>  R$ {restaurant.deliveryFee.toFixed(2)} &#82286; 
                {restaurant.minDeliveryTime} - {restaurant.maxDeliveryTime}
                  Minutos
                
            </Text>
            <Text style = {styles.menuTitle} > Cardápio </Text>
            </View>
        </View>
    )
}

export default RestaurantHeader;

