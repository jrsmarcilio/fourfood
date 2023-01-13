import { StyleSheet, Text, View, Platform } from 'react-native';
import { Switch, Icon, Button, Header } from 'react-native-elements';
import { useState } from 'react';
import { setItem, getItem } from '../storage/Storage';

export default function MenuView({ navigation, route }) {
    const [switchValue, setSwitchValue] = useState(true);
    const [painelAtivo, setPainelAtivo] = useState('');
    getItem('profile').then((data) => {
        if (data && data === 'cliente') {
            setPainelAtivo(data);
            setSwitchValue(true);
        } else {
            setPainelAtivo(data);
            setSwitchValue(false);
        }
    })

    return (
        <View style={{ flex: 1 }}>
            <View>
                <Header
                    backgroundColor={'transparent'}
                    leftComponent={{
                        icon: 'chevron-left', color: '#000', iconStyle: { color: '#000' }, size: 35, onPress: () => {
                            getItem('profile').then((data) => {
                                if (data === 'cliente') navigation.goBack();
                                else navigation.navigate('HomeEmpresaView');
                            })
                        }
                    }}
                />
            </View>
            <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
                <Button
                    buttonStyle={styles.button}
                    icon={
                        <Icon
                            name="user"
                            type='font-awesome'
                            size={20}
                            color="white"
                        />
                    }
                    title=" Meus dados"
                />
                <Button
                    buttonStyle={styles.button}
                    icon={
                        <Icon
                            name="shopping-basket"
                            type='font-awesome'
                            size={20}
                            color="white"
                        />
                    }
                    title=" Minhas lojas"
                />
                <Button
                    buttonStyle={styles.button}
                    icon={
                        <Icon
                            name="plus"
                            type='font-awesome'
                            size={20}
                            color="white"
                        />
                    }
                    title=" Cadastrar produto"
                    onPress={() => navigation.navigate('ProdutoView')}
                />
                <Button
                    buttonStyle={styles.button}

                    icon={
                        <Icon
                            name="sign-out"
                            type='font-awesome'
                            size={20}
                            color="white"
                        />
                    }
                    iconRight={true}
                    title="Logout "
                    onPress={() => navigation.navigate('LoginView')}
                />
                <Text style={styles.text}>Painel padrão: {painelAtivo}</Text>
                <Switch
                    style={{ alignSelf: 'center' }}
                    value={switchValue}
                    onChange={() => {
                        getItem('profile').then((data) => {
                            if (data === 'cliente') {
                                setItem('profile', 'empresa');
                                setSwitchValue(false);
                                navigation.navigate('HomeEmpresaView');
                            } else {
                                setItem('profile', 'cliente');
                                setSwitchValue(true);
                                navigation.navigate('DashBoardView');
                            }
                        })
                    }}

                />
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    header: {
        flex: 0.1, flexDirection: 'row',
        marginTop: Platform.OS === 'android' ? 20 : 0,
        alignItems: 'center',
        left: 10,
    },
    button: {
        backgroundColor: '#B84D4D',
        minWidth: 200,
        alignSelf: 'center',
    },
    text: {
        fontFamily: 'Sarabun_700Bold',
        fontSize: 18,
        lineHeight: 26,
        fontStyle: 'normal',
        textAlign: 'center',
    },
});
