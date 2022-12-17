import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ClienteView from './src/screens/CadastroClienteView';
import EmpresaView from './src/screens/CadastroEmpresaView';
import FlashMessage from 'react-native-flash-message';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='ClienteView' component={ClienteView}/>
        <Stack.Screen name='EmpresaView' component={EmpresaView}/>
      </Stack.Navigator>
      <FlashMessage position={'bottom'}/>
    </NavigationContainer>
  );
}
