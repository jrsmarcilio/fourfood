import { StyleSheet, Text, View } from 'react-native';
import { Image, Button, Input } from 'react-native-elements';
import { useFonts } from 'expo-font';
import React, { useState } from 'react';


export default function LoginView({ navigation, route }) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [fontsLoaded] = useFonts({
        'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    });
    if (!fontsLoaded) return null;

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
                onPress={() => navigation.navigate('ClienteView')}
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
        fontFamily: 'Poppins-Regular',
        marginTop: 30

    },
})
