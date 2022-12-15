import { StyleSheet, Text, View } from 'react-native';
import { Image, Input, Button } from 'react-native-elements';
import { useFonts } from 'expo-font';


export default function ClienteView() {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
  });
  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("../../assets/oxefood.png")}
        style={styles.image}
      />
      <Text style={styles.text}>CADASTRE-SE HOJE!</Text>
      <View style={{ flex: 1 }}>
        <Input
          label='Nome'
          labelStyle={styles.label}
        />
        <Input
          label='CPF'
          labelStyle={styles.label}
        />
        <Input
          label='Celular'
          labelStyle={styles.label}
        />
        <Input
          label='Telefone'
          labelStyle={styles.label}
        />

        <Button
          title={'Continuar'}
          buttonStyle={styles.button}
        />
      </View>

      <View style={{ flex: 1 }}>

      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#B84D4D',
    minWidth: 200,
    alignSelf: 'center',
  },
  image: {
    minHeight: 140,
    marginTop: 30,
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: '#000',
  }
});
