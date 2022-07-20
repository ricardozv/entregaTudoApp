import { StatusBar } from 'expo-status-bar';
import orders from './assets/data/orders.json';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import awsconfig from './src/aws-exports';

Amplify.configure({ 
  ...awsconfig, 
Analytics: {
  disabled: true
},});

const order = orders[0]

 function App() {
  return (
    <NavigationContainer>
              <Navigation/>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

export default withAuthenticator(App);
