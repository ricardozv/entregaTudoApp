import { StatusBar } from 'expo-status-bar';
import orders from './assets/data/orders.json';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import awsconfig from './src/aws-exports';
import AuthContextProvider from './src/contexts/AuthContext';
import OrderContextProvider from './src/contexts/OrderConext';

Amplify.configure({ 
  ...awsconfig, 
Analytics: {
  disabled: true
},});

const order = orders[0]

 function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <OrderContextProvider>
            <Navigation/>
        </OrderContextProvider>
      </AuthContextProvider>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

export default withAuthenticator(App);
