import { StyleSheet, Text, View, Image } from 'react-native';

const RestaurantItem = () => {
  return (
    <View style={styles.restaurantContainer}>
      <Image source={{uri:"https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg"}}
      style={styles.image} 
      />
          <Text style={styles.title}> Burguer do Engenheiro </Text>
          <Text style={styles.subtitle}> R$ 20.00 Tempo de entrega 15 - 30 minutos </Text>
    
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
    }
  });
  