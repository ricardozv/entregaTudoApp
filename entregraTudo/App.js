import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from "aws-amplify-react-native";
import RootNavigator from './src/navigation';
import config from './src/aws-exports';
import AuthContextProvider from './src/components/Contexts/AuthContext';
import BasketContextProvider from './src/components/Contexts/BasketContext';
import OrderContextProvider from './src/components/Contexts/OrderContext';

Amplify.configure({...config,
Analytics:{
  disabled: true
}});

function App() {
  return (
      <NavigationContainer>
            <AuthContextProvider>
                  <BasketContextProvider>
                      <OrderContextProvider>
                          <RootNavigator />
                      </OrderContextProvider>
                  </BasketContextProvider> 
            </AuthContextProvider>
        <StatusBar style="auto" />
      </NavigationContainer>
  );
};

export default withAuthenticator(App);


