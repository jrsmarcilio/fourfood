import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginView from './src/screens/LoginView';
import ClienteView from './src/screens/CadastroClienteView';
import EmpresaView from './src/screens/CadastroEmpresaView';
import FlashMessage from 'react-native-flash-message';
import DashBoardView from './src/screens/DashboardView';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='LoginView' component={LoginView} />
        <Stack.Screen name='ClienteView' component={ClienteView} />
        <Stack.Screen name='EmpresaView' component={EmpresaView} />
        <Stack.Screen name="DashBoardView" component={DashBoardView} />
      </Stack.Navigator>
      <FlashMessage position={'bottom'} />
    </NavigationContainer>
  );
}
