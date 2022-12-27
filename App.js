import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Sarabun_700Bold, useFonts } from '@expo-google-fonts/sarabun';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';
import LoginView from './src/screens/LoginView';
import ClienteView from './src/screens/CadastroClienteView';
import EmpresaView from './src/screens/CadastroEmpresaView';
import FlashMessage from 'react-native-flash-message';
import DashBoardView from './src/screens/DashboardView';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Sarabun_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  
  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='LoginView' component={LoginView} />
        <Stack.Screen name='ClienteView' component={ClienteView} />
        <Stack.Screen name='EmpresaView' component={EmpresaView} />
        <Stack.Screen name='DashBoardView' component={DashBoardView} />
      </Stack.Navigator>
      <FlashMessage position={'bottom'} />
    </NavigationContainer>
  );
}
