import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Image, Input, Button } from 'react-native-elements';
import { useFonts } from 'expo-font';
import { useState } from 'react';
import { MaskedTextInput } from 'react-native-mask-text';


export default function EmpresaView({ navigation, route }) {
    const { nome, cpf, celular, telefone } = route.params;
    const [nomeEmpresa, setNomeEmpresa] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [email, setEmail] = useState('');
    const [telefoneEmpresa, setTelefoneEmpresa] = useState('');
    const [site, setSite] = useState('');
    const [fontsLoaded] = useFonts({
        'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    });
    if (!fontsLoaded) return null;

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <Image
                    source={require("../../assets/oxefood.png")}
                    style={styles.image}
                />
                <Text style={styles.text}>CADASTRE UMA EMPRESA</Text>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Nome</Text>
                    <MaskedTextInput
                        onChangeText={nomeEmpresa => setNomeEmpresa(nomeEmpresa)}
                        style={styles.input}
                    />
                    <Text style={styles.label}>CNPJ</Text>
                    <MaskedTextInput
                        mask='99.999.999/9999-99'
                        onChangeText={cnpj => setCnpj(cnpj)}
                        style={styles.input}
                        keyboardType='numeric'
                    />
                    <Text style={styles.label}>E-mail</Text>
                    <MaskedTextInput
                        onChangeText={email => setEmail(email)}
                        style={styles.input}
                        keyboardType='email-address'
                    />
                    <Text style={styles.label}>Telefone</Text>
                    <MaskedTextInput
                        mask='(99)9999-9999'
                        onChangeText={telefoneEmpresa => setTelefoneEmpresa(telefoneEmpresa)}
                        style={styles.input}
                        keyboardType='numeric'
                    />
                    <Text style={styles.label}>Site</Text>
                    <MaskedTextInput
                        onChangeText={site => setSite(site)}
                        style={styles.input}
                        keyboardType='url'
                    />
                    <Button
                        title={'Continuar'}
                        buttonStyle={styles.button}
                        onPress={() => navigation.navigate('DashboardView')}
                    />
                </View>

                <View style={{ flex: 1, marginBottom: 20 }}>

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
