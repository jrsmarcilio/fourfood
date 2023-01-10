import React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import { api } from '../services/api';

import { TextField } from '../components/TextField';
import { LogoComponent } from '../components/LogoComponent';
import { save } from '../token/token';
import { getItem, setItem } from '../storage/Storage';

export default function LoginView({ navigation, route }) {
  const { setValue, handleSubmit } = useForm();
  getItem('profile').then((data) => {
    if (!data) setItem('profile', 'cliente');
  })

  const onSubmit = async (data) => {
    console.log("🚀 ~ file: LoginView.js:20 ~ data", data)
    if (!data || data.username === '' || data.password === '') {
      showMessage({ message: 'Campo login e senha são obrigatórios', type: 'danger' });
      return;
    }

    await api.post('/login/signin', data)
      .then((response) => {
        console.log("🚀 ~ file: LoginView.js:28 ~ response", response)
        save('token', response.data.token);
        changeRedirect('dashboard');
      })
      .catch((error) => {
        console.log("🚀 ~ file: LoginView.js:33 ~ error", error)
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
      navigation.navigate(view == 'register' ? 'CadastroEmpresaView' : 'HomeEmpresaView');
    })
  }

  return (
    <View style={styles.container}>

      <LogoComponent size={250} />

      <TextField label='E-mail' onChangeText={text => setValue('username', text)} />
      <TextField label='Senha' onChangeText={text => setValue('password', text)} secureTextEntry={true} />

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
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
    textAlign: 'center',
    flex: 1,
    paddingHorizontal: 20
  },
  image: {
    height: 300,
    width: 'auto',
    resizeMode: "center",
  },
  button: {
    backgroundColor: '#B84D4D',
    minWidth: 200,
    alignSelf: 'center',
    fontFamily: 'Poppins_400Regular',
    marginTop: 30

  }
})
