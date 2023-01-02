import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { useForm } from 'react-hook-form';
import { showMessage } from 'react-native-flash-message';

import { TextField } from '../components/TextField';
import { TextFieldMask } from '../components/TextFieldMask';
import { api } from '../services/api';

export default function CadastroClienteView({ navigation, route }) {
  const { register, getValues, setValue, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    if (!data.nome || !data.cpf || !data.email || !data.password || !data.fone) {
      showMessage({ message: 'Preencha os campos corretamente.', type: 'danger' });
      return;
    }

    if (!data.foneAlternativo) setValue('foneAlternativo', getValues('fone'));
    setValue('chaveEmpresa', '4food');

    await api.post('/cliente', data)
      .then((response) => {
        showMessage({ message: 'Cadastro realizado com sucesso', type: 'success' });
        navigation.navigate('LoginView', { email: response.data.email });
      })
      .catch((error) => {
        showMessage({ message: 'Existem campos preenchidos incorretos.', type: 'danger' });
      });
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Image
          source={require("../../assets/fourfood.png")}
          style={styles.image}
        />
        <Text style={styles.text}>CADASTRE-SE HOJE!</Text>
        <View style={{ flex: 1, paddingHorizontal: 20 }}>

          <TextField label='Nome' required onChangeText={text => setValue('nome', text)} />
          <TextFieldMask label='CPF' required mask='999.999.999-99' onChangeText={text => setValue('cpf', text)} />
          <TextField label="E-mail" required onChangeText={text => setValue('email', text)} />
          <TextField label="Senha" required onChangeText={text => setValue('password', text)} secureTextEntry={true} />
          <TextFieldMask label='Celular' required mask='(99)99999-9999' placeholder='99 9 9999 9999' onChangeText={text => setValue('fone', text)} />
          <TextFieldMask label='Telefone' mask='(99)9999-9999' placeholder='99 9999 9999' onChangeText={text => setValue('foneAlternativo', text)} />

          <Button onPress={handleSubmit(onSubmit)} title='Cadastrar' buttonStyle={styles.button} />
        </View>
        <View style={{ flex: 1 }}>
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
