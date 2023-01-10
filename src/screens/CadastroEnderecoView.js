import { useFonts } from 'expo-font';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import { HeaderTitle } from '../components/HeaderTitle';
import { TextField } from '../components/TextField';
import { TextFieldMask } from '../components/TextFieldMask';
import { api, brasilApi } from '../services/api';

export default function CadastroEnderecoView() {
  const { setValue, getValues, handleSubmit, reset } = useForm();
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

  const handleChangeCep = async () => {
    console.log(getValues)
    if (getValues('cep').length === 9) {
      await brasilApi.get(`/cep/v2/${getValues('cep').split('-').join('')}`)
        .then((response) => {
          const { state, city, neighborhood, street } = response.data;
          const data = {
            rua: street,
            bairro: neighborhood,
            cidade: city,
            estado: state,
          }
          reset(data);
        })
        .catch((error) => {
          showMessage({ message: 'CEP inválido.', type: 'danger' });
        });
    } else {
      showMessage({ message: 'Preencha o CEP corretamente.', type: 'danger' });
    }
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

          <TextFieldMask mask="99999-999" defaultValue={getValues('cep')} label='CEP' onChangeText={text => setValue('cep', text)} />
          <View style={{ marginTop: 12 }}>
            <Button title="Procurar endereço" onPress={handleChangeCep} />
          </View>
          <TextField defaultValue={getValues('numero')} label='Número' onChangeText={text => setValue('cep', text)} />
          <TextField defaultValue={getValues('rua')} label='Rua' onChangeText={text => setValue('rua', text)} />
          <TextField defaultValue={getValues('complemento')} label='Complemento' onChangeText={text => setValue('complemento', text)} />
          <TextField defaultValue={getValues('bairro')} label='Bairro' onChangeText={text => setValue('bairro', text)} />
          <TextField defaultValue={getValues('cidade')} label='Cidade' onChangeText={text => setValue('cidade', text)} />
          <TextField defaultValue={getValues('estado')} label='Estado' onChangeText={text => setValue('estado', text)} />

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
});
