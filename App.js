import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ClienteView from './src/screens/CadastroClienteView';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='ClienteView' component={ClienteView}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
