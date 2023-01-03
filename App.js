import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Sarabun_700Bold, useFonts } from '@expo-google-fonts/sarabun';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';
import { Roboto_500Medium } from '@expo-google-fonts/roboto';
import LoginView from './src/screens/LoginView';
import CadastroClienteView from './src/screens/CadastroClienteView';
import CadastroEmpresaView from './src/screens/CadastroEmpresaView';
import FlashMessage from 'react-native-flash-message';
import DashBoardView from './src/screens/DashboardView';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import EscolherPerfilView from './src/screens/EscolherPerfilView';
import HomeEmpresaView from './src/screens/HomeEmpresaView';
import MenuView from './src/screens/MenuView';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Sarabun_700Bold,
    Roboto_500Medium,
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
        <Stack.Screen name='MenuView' component={MenuView} />
        <Stack.Screen name='EscolherPerfilView' component={EscolherPerfilView} />
        {/* <Stack.Screen name='LoginView' component={LoginView} /> */}
        <Stack.Screen name='CadastroClienteView' component={CadastroClienteView} />
        <Stack.Screen name='CadastroEmpresaView' component={CadastroEmpresaView} />
        <Stack.Screen name='DashBoardView' component={DashBoardView} />
        <Stack.Screen name='HomeEmpresaView' component={HomeEmpresaView} />
      </Stack.Navigator>
      <FlashMessage position={'bottom'} />
    </NavigationContainer>
  );
}
