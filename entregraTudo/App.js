import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from "aws-amplify-react-native";
import RootNavigator from './src/navigation';
import config from './src/aws-exports';
import AuthContextProvider from './src/components/Contexts/AuthContext';

Amplify.configure({...config,
Analytics:{
  disabled: true
}});

function App() {
  return (
    <NavigationContainer>
     
      <AuthContextProvider>
      <StatusBar style="auto" />
        <RootNavigator />
      </AuthContextProvider>
      
    </NavigationContainer>
  );
};

export default withAuthenticator(App);


