import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList } from 'react-native';
import HomeScreen from "./src/screens/HomeScreen";
import RestaurantDetailsPage from './src/screens/RestaurantDetailsScreen';
import DishListItem from './src/components/DishListItem';
import DishDetailsScreen from './src/screens/DishDetailsScreen';
import Basket from './src/screens/Basket';


export default function App() {
  return (
    <View style={styles.container}>
      {/* <HomeScreen /> */}
      {/* <DishListItem /> */}
       {/* <RestaurantDetailsPage /> */} 
       {/* <DishDetailsScreen /> */}
       <Basket />
      <StatusBar style="white" />
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    //padding:10,
    //paddingVertical: 30
  }

});
