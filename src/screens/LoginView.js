import { StyleSheet, View } from 'react-native';
import { Image, Button, Input } from 'react-native-elements';
import React, { useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';
import { save, getValueFor } from '../token/token';

export default function LoginView({ navigation, route }) {
    const { accountType } = route.params;
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={{ flex: 1 }}>

            <Image
                source={require("../../assets/logo.png")}
                style={styles.image}
            />

            <Input
                label='Login'
                value={login}
                onChangeText={login => setLogin(login)}
            />

            <Input
                label='Senha'
                value={password}
                onChangeText={password => setPassword(password)}
                secureTextEntry={true}
            />


            <Button
                title="Logar"
                buttonStyle={styles.button}
                onPress={() => {
                    if (!login.trim() || !password.trim()) {
                        showMessage({
                            message: 'Campo login e senha são obrigatórios',
                            type: 'danger'
                        });
                        return;
                    }
                    axios.post('https://fourfood-api.herokuapp.com/api/login/signin', {
                        password: password,
                        username: login
                    })
                        .then((response) => {
                            save('token', response.data.token);
                            if (accountType === 'cliente') {
                                navigation.navigate('DashBoardView');
                            } else if (accountType === 'empresa') {
                                navigation.navigate('HomeEmpresaView');
                            }
                        })
                        .catch((error) => {
                            showMessage({
                                message: 'Login ou senha incorretos',
                                type: 'danger'
                            });
                        })
                }}
            />

            <Button
                title="Cadastrar-se"
                buttonStyle={[styles.button, { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#000' }]}
                titleStyle={{ color: '#000' }}
                onPress={() => navigation.navigate('ClienteView')}
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
