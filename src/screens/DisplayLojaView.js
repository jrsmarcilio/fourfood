import { StyleSheet, Text, View, Platform, ScrollView } from 'react-native';
import { Icon, Image, ListItem, Avatar, Header, Button, BottomSheet, Overlay } from 'react-native-elements';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { getValueFor } from '../token/token';
import moment from 'moment';
import axios from 'axios';

export default function DisplayLojaView({ navigation, route }) {
    const { idLoja } = route.params;
    const [token, setToken] = useState('');
    const [loja, setLoja] = useState('');
    const [produtos, setProdutos] = useState([]);
    const [valorTotal, setValorTotal] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const isFocused = useIsFocused();
    const [list, setList] = useState([
        {
            produto: 'Item 01',
            img_url: 'https://i.ibb.co/SBCQVkZ/pizza600x607.png',
            valor: 20,
            quantidade: 0
        },
        {
            produto: 'Item 02',
            img_url: 'https://i.ibb.co/M90z0WH/pizza600x582.png',
            valor: 40,
            quantidade: 0
        },
        {
            produto: 'Item 03',
            img_url: 'https://i.ibb.co/vkrnTG8/carne600x400.png',
            valor: 10,
            quantidade: 0
        },
    ]);

    function addQtd(index, opt) {
        let valor = 0;

        const oldlist = list.map((item, i) => {

            if (i === index) {
                if (opt == 'del' && item.quantidade == 0) {
                    item.quantidade = opt === 'add' ? item.quantidade : item.quantidade;
                } else {
                    item.quantidade = opt === 'add' ? item.quantidade + 1 : item.quantidade - 1;
                }


            }
            valor += item.valor * item.quantidade;
            return item;
        })

        setValorTotal(valor);
        setList(oldlist);

    }


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
        //getLoja();
        //getProdutos();
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

    const OverlayComponent = (props) => {
        const dias = [
            'DOM',
            'SEG',
            'TER',
            'QUA',
            'QUI',
            'SEX',
            'SAB',
        ]

        const date = new Date();
        const toggleOverlay = () => {
            setIsVisible(!isVisible);
        };

        return (
            <View>
                <Overlay isVisible={isVisible} onBackdropPress={toggleOverlay} overlayStyle={styles.overlayStyle}>
                    <Text style={styles.confEntregaTxt}>Confirme a entrega</Text>
                    <ListItem bottomDivider underlayColor={'#d9dcde'} containerStyle={styles.listItemContainer}>
                        <View style={{}}>
                            <Text style={styles.textData}><Text style={{ color: '#B84D4D' }}>{`${dias[date.getDay()]}`}</Text> {`\n${date.getDate()}`}</Text>
                        </View>
                        <ListItem.Content>
                            <ListItem.Title style={styles.titleText}>Entrega hoje</ListItem.Title>
                            <ListItem.Subtitle style={styles.subtTitleText}>Hoje: 37-47 min</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                    <ListItem bottomDivider underlayColor={'#d9dcde'} containerStyle={styles.listItemContainer}>
                        <View style={{}}>
                            <Image
                                source={require('../../assets/map_icon60x60.png')}
                                style={{ width: 75, height: 75 }}
                            />
                        </View>
                        <ListItem.Content>
                            <ListItem.Title style={styles.titleText}>Rua Padre Cromácio Leão, 76A</ListItem.Title>
                            <ListItem.Subtitle style={styles.subtTitleText}>Primeiro Andar</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                    <ListItem bottomDivider underlayColor={'#d9dcde'} containerStyle={styles.listItemContainer}>
                        <View style={{}}>
                            <Image
                                source={require('../../assets/master.png')}
                                style={{ width: 75, height: 47 }}
                            />
                        </View>
                        <ListItem.Content>
                            <ListItem.Title style={styles.titleText}>Pagamento pelo app</ListItem.Title>
                            <ListItem.Subtitle style={styles.subtTitleText}>Mastercard ****0000</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                    <Button
                        title={'Confirmar e fazer pedido'}
                        buttonStyle={styles.buttonStyle}
                        onPress={() => alert('implementar ação')}
                    />
                    <Button
                        title={'Alterar dados'}
                        titleStyle={{ color: '#B84D4D' }}
                        buttonStyle={{ backgroundColor: '#fff' }}
                        containerStyle={{ marginTop: 10 }}
                        onPress={() => alert('implementar ação')}
                    />
                </Overlay>
            </View>
        );
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
                    {/* {
                        produtos.map((produto, i) => (
                            <ItemLoja titulo={produto.titulo} tempoEntrega={produto.tempoEntrega} valorUnitario={produto.valorUnitario} img_url={produto.codigo} id={produto.id} key={i} />
                        ))
                    } */}
                    {
                        list.map((l, i) => (
                            <ListItem key={i} bottomDivider>
                                <Avatar source={{ uri: l.img_url }} rounded />
                                <ListItem.Content>
                                    <ListItem.Title>{l.produto}</ListItem.Title>
                                    <ListItem.Subtitle>R$ {l.valor.toFixed(2)}</ListItem.Subtitle>
                                    <View style={styles.viewBtn}>
                                        <Button
                                            buttonStyle={styles.buttonStyle}
                                            titleStyle={styles.text}
                                            title={'-'}
                                            onPress={() => addQtd(i, 'del')}
                                        />
                                        <Text style={styles.text}>{l.quantidade}</Text>
                                        <Button
                                            buttonStyle={styles.buttonStyle}
                                            titleStyle={styles.text}
                                            title={'+'}
                                            onPress={() => addQtd(i, 'add')}
                                        />
                                    </View>
                                </ListItem.Content>
                            </ListItem>
                        ))

                    }
                </View>
                <View style={{ marginLeft: 10, marginRight: 10 }}>
                    <Text style={styles.totalText}>TOTAL R$ {valorTotal.toFixed(2)}</Text>
                    <Button
                        title={'Continuar'}
                        buttonStyle={styles.buttonStyle}
                        disabled={valorTotal === 0 ? true : false}
                        onPress={() => {
                            setIsVisible(!isVisible);
                        }}
                    />
                </View>
            </ScrollView>
            <OverlayComponent />
        </View>

    );
}

const styles = StyleSheet.create({
    totalText: {
        textAlign: 'right',
        fontFamily: 'Poppins_400Regular',
        fontSize: 18,
    },
    viewBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
        padding: 8,
    },
    buttonStyle: {
        backgroundColor: '#B84D4D'
    },
    image: {
        width: 106,
        height: 44,
    },
    text: {
        fontFamily: 'Poppins_400Regular',
        textAlign: 'center',
        width: 25,
    },
    titleText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
        color: '#000',
    },
    subtTitleText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
        color: '#6B6B6B',
    },
    listItemContainer: {
        backgroundColor: 'transparent',
        marginBottom: 5,
    },
    overlayStyle: {
        minWidth: 350,
        minHeight: 350,
    },
    confEntregaTxt: {
        alignSelf: 'center',
        fontFamily: 'Sarabun_700Bold',
        fontSize: 20,
    },
    textData: {
        textAlign: 'center',
        fontFamily: 'Sarabun_700Bold',
        borderWidth: 2,
        borderRadius: 5,
        padding: 15,
        borderColor: '#B84D4D',
    }
});
