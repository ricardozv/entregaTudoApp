import { useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import orders from './assets/data/orders.json';
import OrderItem from './src/components/OrderItem';
import OrdersScreen from './src/screens/OrdersScreen';

const order = orders[0]

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
     {/* <FlatList 
        data ={orders}
        renderItem={({item})=> 
        <OrderItem order={item} />} 
        /> */}
        <OrdersScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
