import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList } from 'react-native';
import HomeScreen from "./src/screens/HomeScreen";
import RestaurantDetailsPage from './src/screens/RestaurantDetailsScreen';
export default function App() {
  return (
    <View style={styles.container}>
      {/* <HomeScreen /> */}
      <RestaurantDetailsPage />
      <StatusBar style="black" />
     
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
