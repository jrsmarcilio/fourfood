import { useFonts } from 'expo-font';
import { useForm } from 'react-hook-form';
import { Platform, ScrollView, StyleSheet, Text, View, TextInput } from 'react-native';
import { Button, Icon, Image, Input } from 'react-native-elements';
import { TextField } from '../components/TextField';
import { HeaderTitle } from '../components/HeaderTitle';


export default function CadastroEnderecoView() {
  const { setValue, handleSubmit } = useForm();

  const userId = 6; // Pegar Id do usuário logado

  const onSubmit = async (data) => {
    if (!data) {
      showMessage({ message: 'Preencha os campos corretamente.', type: 'danger' });
      return;
    }

    await api.post(`/enderecocliente/${userId}/endereco`, data)
      .then((response) => {
        showMessage({ message: 'Cadastro realizado com sucesso', type: 'success' });
        const { id: enderecoId, localizacao: descricao } = response.data;
        navigation.navigate('DashboardView', { enderecoId, descricao });
      })
      .catch((error) => {
        showMessage({ message: 'Existem campos preenchidos incorretos.', type: 'danger' });
      });
  }

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
  });
  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1, marginTop: Platform.OS === 'android' ? 30 : 0 }}>
      <ScrollView>
        <HeaderTitle title='Cadastrar endereço' componentName='DashBoardView' />

        <View style={{ flex: 1 }}>
          <TextField label='CEP' onChangeText={text => setValue(text)} />
          <TextField label='Número' onChangeText={text => setValue(text)} />
          <TextField label='Rua' onChangeText={text => setValue(text)} />
          <TextField label='Complemento' onChangeText={text => setValue(text)} />
          <TextField label='Bairro' onChangeText={text => setValue(text)} />
          <TextField label='Cidade' onChangeText={text => setValue(text)} />
          <TextField label='Estado' onChangeText={text => setValue(text)} />

          <Button title="Cadastrar" buttonStyle={styles.button} onPress={handleSubmit(onSubmit)} />
        </View>
        <View style={{ flex: 1 }}>

        </View>
      </ScrollView>
    </View >




  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#B84D4D',
    minWidth: 200,
    alignSelf: 'center',
    fontFamily: 'Poppins-Regular',
    marginTop: 30

  },
  image: {
    width: 106,
    height: 44,
  },
  input: {
    height: 40,
    fontSize: 16,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    borderRadius: 8
  },
})





