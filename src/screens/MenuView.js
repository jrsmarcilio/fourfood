import { StyleSheet, Text, View, Platform} from 'react-native';
import { Switch, Icon, Button } from 'react-native-elements';
import { useState } from 'react';
import { setItem, getItem } from '../storage/Storage';

export default function MenuView({ navigation, route }) {
    const [switchValue, setSwitchValue] = useState(true);
    const [painelAtivo, setPainelAtivo] = useState('cliente');
    //setItem('profile', 'cliente');
    getItem('profile').then((data) => {
        if (!data) console.log('nao tem dados');
    })

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <Icon
                    name='chevron-left'
                    type='font-awesome'
                    size={20}
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
                />
                <Text style={styles.text}>Painel padrão: <Text>{painelAtivo}</Text></Text>
                <Switch
                    style={{ alignSelf: 'center' }}
                    value={switchValue}
                    onChange={() => {
                        painelAtivo === 'cliente' ? setPainelAtivo('empresa') : setPainelAtivo('cliente');
                        setSwitchValue(!switchValue);
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
