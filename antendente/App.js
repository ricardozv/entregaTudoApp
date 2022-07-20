import { StatusBar } from 'expo-status-bar';
import orders from './assets/data/orders.json';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation';

const order = orders[0]

export default function App() {
  return (
    <NavigationContainer>
              <Navigation/>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}


