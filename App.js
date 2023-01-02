import { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import FlashMessage from 'react-native-flash-message';

import { Poppins_400Regular } from '@expo-google-fonts/poppins';
import { Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Sarabun_700Bold, useFonts } from '@expo-google-fonts/sarabun';

import CadastroClienteView from './src/screens/CadastroClienteView';
import CadastroEmpresaView from './src/screens/CadastroEmpresaView';
import ProdutoView from './src/screens/CadastroProdutosView';
import DashBoardView from './src/screens/DashboardView';
import EscolherPerfilView from './src/screens/EscolherPerfilView';
import HomeEmpresaView from './src/screens/HomeEmpresaView';
import LoginView from './src/screens/LoginView';

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
        <Stack.Screen name='ProdutoView' component={ProdutoView}/>
        <Stack.Screen name='EscolherPerfilView' component={EscolherPerfilView} />
        <Stack.Screen name='LoginView' component={LoginView} />
        <Stack.Screen name='CadastroClienteView' component={CadastroClienteView} />
        <Stack.Screen name='CadastroEmpresaView' component={CadastroEmpresaView} />
        <Stack.Screen name='DashBoardView' component={DashBoardView} />
        <Stack.Screen name='HomeEmpresaView' component={HomeEmpresaView} />
      </Stack.Navigator>
      <FlashMessage position={'bottom'} />
    </NavigationContainer>
  );
}
