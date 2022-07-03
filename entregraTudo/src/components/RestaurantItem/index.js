import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DEFAULT_IMAGE = 
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg"

const RestaurantItem = ({ restaurant }) => {
  const navigation = useNavigation();

  const onPress = ( ) => {
    navigation.navigate("Restaurant", {id: restaurant.id});
  }

  return (

    <Pressable onPress = {onPress} style={styles.restaurantContainer}>
      <Image 
      source={{ 
        uri: restaurant.image.startsWith('http') 
        ? restaurant.image 
        : DEFAULT_IMAGE
      }}
      style={styles.image} 
      />
        <View style={styles.row}>
          <View>
            <Text style={styles.title}>
              {restaurant.name}
            </Text>
            <Text style={styles.subtitle}> 
              R$ {restaurant.deliveryFee.toFixed(2)} &#82286; 
              {restaurant.minDeliveryTime} - {restaurant.maxDeliveryTime} 
              Tempo de entrega 
            </Text>
          </View>
            <View style = {styles.rating}>
              <Text>{restaurant.rating.toFixed(1)}</Text>
            </View>
        </View>
    </Pressable>
  )
}

export default RestaurantItem;

const styles = StyleSheet.create({
    restaurantContainer: {
      width: '100%',
      marginVertical: 10
    },
    image: {
      width: '100%',
      aspectRatio: 5 / 3,
      marginBottom: 5,
      borderRadius: 15
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical:5
    },
    subtitle: {
      color:'gray',
    },
    row: {
      flexDirection:'row'
    },
    rating:{
      marginLeft:"auto",
      backgroundColor: '#fff000',
      width: 30,
      height: 30,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 30,
      padding: 5
    }

  });
  