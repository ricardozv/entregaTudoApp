import { StyleSheet, FlatList } from 'react-native';
import RestaurantItem from "../../../src/components";
import restaurants from "../../../assets/data/restaurants.json";

export default function App() {
  return (
      <FlatList 
        data = {restaurants} 
        renderItem={({item})=> <RestaurantItem restaurant={item} /> } 
        showsVerticalScrollIndicator = {false}
      />
     
  );
}

const styles = StyleSheet.create({});


