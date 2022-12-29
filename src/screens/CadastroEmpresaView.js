import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';

import { TextField } from '../components/TextField';
import { TextFieldMask } from '../components/TextFieldMask';
import { api } from '../services/api';

export default function CadastroEmpresaView({ navigation, route }) {
  const { register, getValues, setValue, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    if (!data.inscricaoEstadual || !data.cnpj || !data.nomeFantasia || !data.nomeEmpresarial || !data.email || !data.password || !data.fone) {
      showMessage({ message: 'Preencha os campos corretamente.', type: 'danger' });
      return;
    }

    setValue('chave', '4food');
    setValue('perfil', 'EMPRESA_ADMIN');

    api.post('/empresa', data)
      .then((response) => {
        showMessage({ message: 'Cadastro realizado com sucesso', type: 'success' });
        navigation.navigate('LoginView', { email: response.data.email });
      })
      .catch((error) => {
        showMessage({ message: 'Existem campos preenchidos incorretos.', type: 'danger' });
      });
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <ScrollView>
        <Image
          source={require("../../assets/fourfood.png")}
          style={styles.image}
        />
        <Text style={styles.text}>CADASTRE UMA EMPRESA</Text>
        <View style={{ flex: 1 }}>
          <TextField required label='Nome Fantasia' onChangeText={text => setValue('nomeFantasia', text)} />
          <TextField required label='Nome Empresarial' onChangeText={text => setValue('nomeEmpresarial', text)} />
          <TextFieldMask required label='Inscrição Estadual' mask='999.999.999.999' onChangeText={text => setValue('inscricaoEstadual', text)} />
          <TextFieldMask required label='CNPJ' mask='99.999.999/9999-99' onChangeText={text => setValue('cnpj', text)} />
          <TextField required label='E-mail' placeholder="fourfood@mail.com" onChangeText={text => setValue('email', text)} />
          <TextField required label='Senha' onChangeText={text => setValue('password', text)} />
          <TextFieldMask required label='Celular' mask='99 9 9999 9999' onChangeText={text => setValue('fone', text)} />
          <TextFieldMask label='Telefone' mask='99 9999 9999' onChangeText={text => setValue('foneAlternativo', text)} />
          <TextFieldMask label="Site" onChangeText={text => setValue('site', text)} keyboardType='url' />

          <Button
            title='Continuar'
            buttonStyle={styles.button}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
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
    minWidth: '100%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 30,
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
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    lineHeight: 20,
    color: '#000',
    marginLeft: 8,
    marginRight: 8,
  },
  input: {
    borderBottomWidth: 1,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 20,
  }
});
