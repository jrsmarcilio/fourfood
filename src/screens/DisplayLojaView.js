import { StyleSheet, Text, View, Platform, ScrollView } from 'react-native';
import { Icon, Image, ListItem, Avatar, Header } from 'react-native-elements';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { getValueFor } from '../token/token';
import axios from 'axios';

export default function DisplayLojaView({ navigation, route }) {
    const { idLoja } = route.params;
    const [token, setToken] = useState('');
    const [loja, setLoja] = useState('');
    const [produtos, setProdutos] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        getValueFor('token').then((data) => {
            if (data) setToken(data);
            return;
        })
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        async function getLoja() {
            const result = await axios.get(`https://fourfood-api.herokuapp.com/api/empresa/${idLoja}`, config)
                .then((data) => {
                    setLoja(data.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        async function getProdutos() {
            const result = await axios.get(`https://fourfood-api.herokuapp.com/api/produto/porempresa/${idLoja}`, config)
                .then((data) => {
                    setProdutos(data.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        getLoja();
        getProdutos();
    }, [isFocused])

    const ItemLoja = (props) => {
        return (
            <ListItem bottomDivider underlayColor={'#d9dcde'} containerStyle={styles.listItemContainer} onPress={() => {
                alert(props.id)
            }}>
                <Avatar
                    size="medium"
                    rounded
                    containerStyle={{ backgroundColor: 'rgba(181, 92, 92, 0.5)' }}
                    source={{
                        uri: props.img_url
                    }}
                />
                <ListItem.Content>
                    <ListItem.Title style={styles.listItemText}>{props.titulo}</ListItem.Title>
                    <ListItem.Subtitle style={styles.listItemText}>{props.descricao}</ListItem.Subtitle>
                    <ListItem.Subtitle style={[styles.listItemText, { color: '#8B8D2F' }]}>{props.tempoEntrega} min</ListItem.Subtitle>
                    <ListItem.Subtitle style={[styles.listItemText, { position: 'absolute', right: 70, bottom: 0, color: '#13741D' }]}>R$ {props.valorUnitario}</ListItem.Subtitle>
                    <ListItem.Subtitle style={{ position: 'absolute', right: 20, color: '#13741D' }}>
                        <Icon
                            name='heart'
                            type='font-awesome'
                            color={'#f44336'}
                        />
                    </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Header
                        backgroundColor={'transparent'}
                        leftComponent={{
                            icon: 'chevron-left', color: '#000', iconStyle: { color: '#000' }, size: 35, onPress: () => {
                                navigation.goBack();
                            }
                        }}
                        centerComponent={<Image source={require('../../assets/fourfood_dashboard.png')} style={styles.image} />}
                    />
                </View>
                <View style={{ flex: 0.7, justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            source={require('../../assets/loja.png')}
                            style={{ width: 128, height: 128, alignSelf: 'center' }}
                        />
                        <Text style={styles.text}>{loja.nomeFantasia}</Text>
                    </View>
                </View>
                <View>
                    {
                        produtos.map((produto, i) => (
                            <ItemLoja titulo={produto.titulo} tempoEntrega={produto.tempoEntrega} valorUnitario={produto.valorUnitario} img_url={produto.codigo} id={produto.id} key={i} />
                        ))
                    }
                </View>
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    image: {
        width: 106,
        height: 44,
    },
    text: {
        fontFamily: 'Sarabun_700Bold',
        fontSize: 20,
        lineHeight: 26,
        fontStyle: 'normal',
        textAlign: 'center',
    },
    listItemText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
        color: '#1A1A1A',
    },
    listItemContainer: {
        backgroundColor: 'rgba(196, 196, 196, 0.31)',
        marginBottom: 5,
    },
});
