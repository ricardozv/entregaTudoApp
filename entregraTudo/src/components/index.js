import { StyleSheet, Text, View, Image } from 'react-native';

const RestaurantItem = ({ restaurant }) => {
  return (
    <View style={styles.restaurantContainer}>
      <Image source={{uri: restaurant.image}}
      style={styles.image} 
      />
        <View style={styles.row}>
          <View>
            <Text style={styles.title}>{restaurant.name}</Text>
            <Text style={styles.subtitle}> 
            R$ {restaurant.deliveryFree} &#82286; {restaurant.minDelivery}-{restaurant.maxDelivery}Tempo de entrega </Text>
          </View>
            <View style = {styles.rating}>
              <Text>{restaurant.rating}</Text>
            </View>
        
        </View>
    </View>
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
      marginBottom: 5
  
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
    },

  });
  