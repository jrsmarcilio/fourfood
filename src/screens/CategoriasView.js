import { StyleSheet, Text, View, Platform, ScrollView } from 'react-native';
import { Icon, Image, ListItem, Avatar, Header } from 'react-native-elements';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { getValueFor } from '../token/token';
import axios from 'axios';
import BottonNavigation from '../components/BottonNavigation';

export default function CategoriasView({ navigation, route }) {
    const [token, setToken] = useState('');
    const [categorias, setCategorias] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        getValueFor('token').then((data) => {
            if (data) setToken(data);
            return;
        })
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        async function getCategorias() {
            const result = await axios.get(`https://fourfood-api.herokuapp.com/api/categoriaempresa`, config)
                .then((data) => {
                    setCategorias(data.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        getCategorias();
    }, [isFocused])

    const CategoriaComponent = (props) => {
        return (
            <ListItem bottomDivider underlayColor={'#d9dcde'} containerStyle={styles.listItemContainer} onPress={() => {
                navigation.navigate('ListaLojaCategoriaView', { id: props.id, categoria: props.descricao });
            }}>
                <ListItem.Content>
                    <ListItem.Title style={styles.listItemText}>{props.descricao}</ListItem.Title>
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
                <View style={{ flex: 0.7, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                    {
                        categorias.map((categoria, i) => (
                            <CategoriaComponent descricao={categoria.descricao} id={categoria.id} key={i} />
                        ))
                    }
                </View>
            </ScrollView>
            <BottonNavigation />
        </View>

    );
}

const styles = StyleSheet.create({
    image: {
        width: 106,
        height: 44,
    },
    header: {
        flex: 0.1,
        flexDirection: 'row',
        marginTop: Platform.OS === 'android' ? 20 : 0,
        alignItems: 'center',
        marginLeft: 5,
        justifyContent: 'space-between'
    },
    button: {
        backgroundColor: '#B84D4D',
        minWidth: 200,
        alignSelf: 'center',
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
        color: '#fff',
        alignSelf: 'center'
    },
    listItemContainer: {
        backgroundColor: '#B84D4D',
        marginBottom: 5,
        width: 160,
    },
});
