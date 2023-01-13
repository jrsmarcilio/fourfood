import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { ListItem, Avatar, Icon, Header } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { getValueFor } from '../token/token';
import BottonNavigation from '../components/BottonNavigation';

export default function ListaLojaCategoriaView({ navigation, route }) {
    const { id, categoria } = route.params;
    const [lojas, setLojas] = useState([]);
    const [token, setToken] = useState('');
    const isFocused = useIsFocused();

    useEffect(() => {
        async function getLojas() {
            getValueFor('token').then((data) => {
                if (data) setToken(data);
                return;
            })
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const result = await axios.get(`https://fourfood-api.herokuapp.com/api/empresa/porcategoria/${id}`, config)
                .then((data) => {
                    setLojas(data.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        getLojas();
    }, [isFocused]);

    const StoreItem = (props) => {
        return (
            <ListItem bottomDivider underlayColor={'#d9dcde'} containerStyle={styles.listItemContainer} onPress={() => {
                navigation.navigate('DisplayLojaView', { idLoja: props.id })
            }}>
                <Avatar
                    size="medium"
                    rounded
                    title="LJ"
                    titleStyle={{ color: '#fff', fontFamily: 'Poppins_400Regular' }}
                    containerStyle={{ backgroundColor: 'rgba(181, 92, 92, 0.5)' }}
                />
                <ListItem.Content>
                    <ListItem.Title style={styles.listItemText}>{props.nome}</ListItem.Title>
                    <ListItem.Subtitle style={styles.listItemText}>N/D</ListItem.Subtitle>
                    <ListItem.Subtitle style={[styles.listItemText, { color: '#8B8D2F' }]}>37-47 min</ListItem.Subtitle>
                    <ListItem.Subtitle style={[styles.listItemText, { position: 'absolute', right: 70, bottom: 0, color: '#13741D' }]}>R$ 5,00</ListItem.Subtitle>
                    <ListItem.Subtitle style={{ position: 'absolute', right: 20, color: '#13741D' }}>
                        <Icon
                            name='heart'
                            type='font-awesome'
                            color={'#f44336'}
                        />
                    </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 0.3, flexDirection: 'row' }}>
                    <Header
                        backgroundColor={'transparent'}
                        leftComponent={{
                            icon: 'chevron-left', color: '#000', iconStyle: { color: '#000' }, size: 35, onPress: () => {
                                navigation.goBack();
                            }
                        }}
                        centerComponent={<Text style={styles.text}>{categoria}</Text>}
                    />
                    {/* <Image
                        source={require('../../assets/fourfood_dashboard.png')}
                        style={styles.image}
                    />
                    <SelectDropdown
                        data={countries}
                        defaultButtonText='Adicionar endereço'
                        dropdownIconPosition='right'
                        renderDropdownIcon={isOpened => {
                            return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                        }}
                        buttonTextStyle={styles.dropDowntext}
                        rowTextStyle={styles.dropDowntext}
                        buttonStyle={{ backgroundColor: 'transparent' }}
                    /> */}
                </View>
                <View style={{ flex: 0.4 }}>
                    {/* <Input
                        rightIcon={{ type: 'font-awesome', name: 'search' }}
                        containerStyle={{ width: 236, alignSelf: 'center' }}
                    /> */}
                    {/* <Text style={styles.text}>Bem vindo, user!</Text> */}

                </View>
                <View style={{ flex: 1 }}>
                    {
                        lojas.map((store, i) => (
                            <StoreItem nome={store.nomeFantasia} categoria={store.categoria} tempo_entrega={store.tempo_entrega} taxa_entrega={store.taxa_entrega} key={i} id={store.id} />
                        ))
                    }
                </View>

            </ScrollView>
            <BottonNavigation />
        </View>

    );
}

const styles = StyleSheet.create({
    listItemText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
        color: '#1A1A1A',
    },
    listItemContainer: {
        backgroundColor: 'rgba(196, 196, 196, 0.31)',
        marginBottom: 5,
    },
    text: {
        fontFamily: 'Sarabun_700Bold',
        fontSize: 20,
        lineHeight: 26,
        textAlign: 'center',
    },
});
