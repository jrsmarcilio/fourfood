import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useState } from 'react';
import { Image, Divider, Button, ListItem } from "react-native-elements";

export default function HomeEmpresaView({ navigation, route }) {
    const produtos = [
        'https://cdn2.iconfinder.com/data/icons/international-food/64/ramen-256.png',
        'https://cdn2.iconfinder.com/data/icons/food-1136/512/pizza-food-cheese-recipe-homemade-256.png',
        'https://cdn3.iconfinder.com/data/icons/world-cuisine-astute-vol-1/512/Burger_Cheeseburger-256.png',
        'https://cdn3.iconfinder.com/data/icons/street-food-and-food-trucker-1/64/meat-ball-food-sausage-barbecue-256.png',
        'https://cdn3.iconfinder.com/data/icons/street-food-and-food-trucker-1/64/instant-noodles-food-cup-precooked-256.png',
        'https://cdn3.iconfinder.com/data/icons/food-set-3/91/Food_C216-256.png',
    ];

    const pedidos = [
        {
            'nome': 'Bolo de nutela com ninho',
            'adicional': 'Adicional de jujuba',
            'tipo_pagamento': 'Cartão de crédito',
        },
        {
            'nome': 'Copo da felicidade',
            'adicional': 'Sem adicional',
            'tipo_pagamento': 'Dinheiro',
        },
        {
            'nome': 'Pizza portuguesa',
            'adicional': 'Sem adicional',
            'tipo_pagamento': 'Cartão de crédito',
        },
        {
            'nome': 'Açaí',
            'adicional': 'Sem adicional',
            'tipo_pagamento': 'Dinheiro',
        },
    ]

    const ProdutoEmpresa = (props) => {
        return (
            <Image
                source={{ uri: props.img_url }}
                style={styles.carouselImage}
                PlaceholderContent={<ActivityIndicator />}
            />
        )
    }

    const PedidosEmpresa = (props) => {
        const [buttonTitle, setButtonTitle] = useState('Enviar');
        const [buttoStyle, setButtonStyle] = useState(styles.buttonPedido);
        const [isPressed, setIsPressed] = useState(false);

        return (
            <ListItem bottomDivider containerStyle={styles.listItemContainer} >
                <ListItem.Content>
                    <ListItem.Title style={styles.listItemText}>{props.nome}</ListItem.Title>
                    <ListItem.Subtitle style={[styles.listItemText, { color: '#6B6B6B' }]}>{props.adicional}</ListItem.Subtitle>
                    <ListItem.Subtitle style={[styles.listItemText, { color: '#8B8D2F' }]}>{props.tipo_pagamento}</ListItem.Subtitle>
                    <ListItem.Subtitle style={[styles.listItemText, { color: '#B84D4D' }]}>Ver localização</ListItem.Subtitle>
                    <ListItem.Subtitle style={{ position: 'absolute', right: -5, color: '#13741D' }}>
                        <Button
                            title={buttonTitle}
                            titleStyle={[styles.buttonTitle]}
                            buttonStyle={buttoStyle}
                            onPress={() => {
                                if (!isPressed) {
                                    setButtonStyle(styles.buttonPedidoPressed);
                                    setButtonTitle('A caminho');
                                    setIsPressed(true);
                                } else {
                                    setButtonStyle(styles.buttonPedido);
                                    setButtonTitle('Enviar');
                                    setIsPressed(false);
                                }

                            }}
                        />
                    </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
    }

    return (
        <View style={{ flex: 1 }}>{/* View principal */}
            <View style={{ flex: 0.10, flexDirection: 'row', marginTop: Platform.OS === 'android' ? 20 : 0, justifyContent: 'space-between' }}>{/* view para header */}
                <Image
                    source={require('../../assets/fourfood_dashboard.png')}
                    style={styles.image}
                />

                <Button
                    title={'Sair'}
                    titleStyle={styles.buttonTitle}
                    buttonStyle={styles.button}
                    onPress={() => navigation.navigate('EscolherPerfilView')}
                />
            </View>
            <View style={{ flex: 0.3 }}>{/* View para meus produtos */}
                <Text style={styles.text}>Meus Produtos</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        {
                            produtos.map((produto, i) => (
                                <ProdutoEmpresa img_url={produto} key={i} />
                            ))
                        }
                    </View>
                </ScrollView>
                <View style={{ alignItems: 'center' }}>
                    {/* alterar onPress para tela de cadastro de produto */}
                    <Button
                        title={'Cadastrar novos produtos'}
                        titleStyle={styles.buttonTitle}
                        buttonStyle={[styles.button, { height: 40, marginRight: 0, width: 240 }]}
                        onPress={() => alert('navegar para tela de cadastro de produto')}
                        
                    />
                </View>
            </View>
            <View style={{ flex: 0.525 }}>{/* View para meus pedidos */}
                <Text style={styles.text}>Pedidos</Text>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={{ flex: 1 }}>

                        {
                            pedidos.map((pedido, i) => (
                                <PedidosEmpresa nome={pedido.nome} adicional={pedido.adicional} tipo_pagamento={pedido.tipo_pagamento} key={i} />
                            ))
                        }
                    </View>

                </ScrollView>
                <Divider orientation="horizontal" color="grey" />
            </View>
            
            <View style={{ flex: 0.075, flexDirection: 'row', justifyContent: 'space-evenly' }}>{/* View para footer menu */}
                <Image
                    source={require('../../assets/home_icon.png')}
                    style={{ width: 55}}

                />
                <Image
                    source={require('../../assets/lista_icon.png')}
                    style={{ width: 55}}
                />
                <Image
                    source={require('../../assets/add_product_icon.png')}
                    style={{ width: 55}}
                />
                
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    buttonPedido: {
        height: 30,
        borderRadius: 4,
        width: 110,
        backgroundColor: '#B84D4D',
    },
    buttonPedidoPressed: {
        height: 30,
        borderRadius: 4,
        width: 110,
        backgroundColor: '#6B6B6B',
    },
    buttonTitle: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 14,
        lineHeight: 13,
    },
    listItemText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 13,
        color: '#1A1A1A',
    },
    listItemContainer: {
        backgroundColor: '#C4C4C4',
        marginBottom: 5,
        left: 5,
        marginRight: 10
    },
    image: {
        width: 106,
        height: 44,
    },
    button: {
        backgroundColor: '#B84D4D',
        minWidth: 110,
        height: 30,
        marginRight: 14,
        marginTop: 14,
        borderRadius: 4,
    },
    carouselImage: {
        width: 79,
        height: 69,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 20
    },
    text: {
        fontFamily: 'Sarabun_700Bold',
        fontSize: 20,
        lineHeight: 26,
        textAlign: 'center',
    }
});