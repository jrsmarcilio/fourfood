import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image, Button, Input, Icon } from 'react-native-elements';
import { useFonts } from 'expo-font';
import { useState } from 'react';
import { FontAwesome } from 'react-native-vector-icons/FontAwesome';

export default function CadastroEnderecoView() {
    const [nomeDaRua, setNomeDaRua] = useState('');
    const [complemento, setComplemento] = useState('');
    const [numero, setNumero] = useState('');
    const [cep, setCep] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');

    const [fontsLoaded] = useFonts({
        'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    });
    if (!fontsLoaded) return null;

    return (
        <View style={{ flex: 1, marginTop: Platform.OS === 'android' ? 30 : 0 }}>
            <ScrollView>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginBottom: 10 }}>
                    <Icon
                        name='chevron-left'
                        type='font-awesome'
                    />

                    <Text>Cadastrar endereço</Text>
                    <Image
                        source={require('../../assets/fourfood_dashboard.png')}
                        style={styles.image}
                    />

                </View>
                <View style={{ flex: 1 }}>
                    <Input
                        label='Nome da Rua'
                        value={nomeDaRua}
                        onChangeText={nomeDaRua => setNomeDaRua(nomeDaRua)}
                    />
                    <Input
                        label='Complemento'
                        value={complemento}
                        onChangeText={complemento => setComplemento(complemento)}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Input
                            label='Número'
                            value={numero}
                            onChangeText={numero => setNumero(numero)}
                            containerStyle={{ width: 150 }}
                        />
                        <Input
                            label='CEP'
                            value={cep}
                            onChangeText={complemento => setCep(cep)}
                            containerStyle={{ width: 210 }}
                        />
                    </View>

                    <Input
                        label='Bairro'
                        value={bairro}


                        onChangeText={bairro => setBairro(bairro)}
                    />
                    <Input
                        label='Cidade'
                        value={cidade}


                        onChangeText={cidade => setCidade(cidade)}
                    />
                    <Input
                        label='Estado'
                        value={estado}


                        onChangeText={estado => setEstado(estado)}
                    />
                    <Button
                        title="Cadastrar"
                        buttonStyle={styles.button}
                        onPress={() => navigation.navigate('DashboardView')}
                    />

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
    }
})





