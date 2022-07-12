import { useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import orders from './assets/data/orders.json';
import OrdersScreen from './src/screens/OrdersScreen';
import OrderDelivery from './src/screens/OrderDelivery';

const order = orders[0]

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
     
       {/* <OrdersScreen /> */}
        <OrderDelivery /> 
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
