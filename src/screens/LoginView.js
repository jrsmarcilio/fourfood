import React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import { api } from '../services/api';

import { TextField } from '../components/TextField';
import { save } from '../token/token';
import { getItem, setItem } from '../storage/Storage';

export default function LoginView({ navigation, route }) {
  const { setValue, handleSubmit } = useForm();
  getItem('profile').then((data) => {
    if (!data) setItem('profile', 'cliente');
  })

  getItem('cliente').then((data) => {
    if (data) {
      const res = JSON.parse(data);
      onSubmit(res);
    }
  })

  const onSubmit = async (data) => {
    if (!data || data.username === '' || data.password === '') {
      showMessage({ message: 'Campo login e senha são obrigatórios', type: 'danger' });
      return;
    }

    api.post('/login/signin', data)
      .then((response) => {
        save('token', response.data.token);
        setItem('cliente', JSON.stringify(data));
        changeRedirect('dashboard');
      })
      .catch((error) => {
        console.log(error);
        showMessage({
          message: 'Login ou senha incorretos',
          type: 'danger'
        });
      })
  }

  const changeRedirect = (view) => {
    getItem('profile').then((accountType) => {
      if (accountType === 'cliente') {
        navigation.navigate(view == 'register' ? 'CadastroClienteView' : 'DashBoardView');
        return;
      }
      // Se passou AccountType === Empresa
      navigation.navigate(view == 'register' ? 'CadastroEmpresaView' : 'HomeEmpresaView');
      // Condicionais ternários são legais, mas não abusem
      // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
    })
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>

      <Image
        source={require("../../assets/logo.png")}
        style={styles.image}
      />

      <TextField label='E-mail' onChangeText={text => setValue('username', text)} />
      <TextField label='Senha' onChangeText={text => setValue('password', text)} secureTextEntry={true}/>

      <Button
        title="Entrar"
        buttonStyle={styles.button}
        onPress={handleSubmit(onSubmit)}
      />

      <Button
        title="Cadastrar-se"
        buttonStyle={[styles.button, { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#000' }]}
        titleStyle={{ color: '#000' }}
        onPress={() => changeRedirect('register')}
      />

      <View style={{ flex: 1 }}>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    minHeight: 140,
    paddingBottom: 200
  },

  button: {
    backgroundColor: '#B84D4D',
    minWidth: 200,
    alignSelf: 'center',
    fontFamily: 'Poppins_400Regular',
    marginTop: 30

  }
})
