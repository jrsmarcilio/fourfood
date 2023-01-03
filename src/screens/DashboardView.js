import { StyleSheet, Text, View, Platform, ScrollView } from 'react-native';
import { Image, Input, ListItem, Avatar, Icon } from 'react-native-elements';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function DashBoardView({ navigation, route }) {
    const countries = ["Rua Campos do Jordão, 162", "Rua Aldeia Velha, 200", "Av. Norte, 2450", "Av. Recife, SN"];
    const dataStoreList = [
        { 'nome': 'Loja 1', 'categoria': 'Restaurante', 'tempo_entrega': '37-47', 'taxa_entrega': 10.99 },
        { 'nome': 'Loja 2', 'categoria': 'Mercado', 'tempo_entrega': '45-55', 'taxa_entrega': 7.99 },
        { 'nome': 'Loja 3', 'categoria': 'Farmácia', 'tempo_entrega': '55-65', 'taxa_entrega': 15.99 },
        { 'nome': 'Loja 4', 'categoria': 'Restaurante', 'tempo_entrega': '20-30', 'taxa_entrega': 5.99 },
        { 'nome': 'Loja 5', 'categoria': 'Restaurante', 'tempo_entrega': '10-15', 'taxa_entrega': 5.89 },
    ];

    const StoreItem = (props) => {
        return (
            <ListItem bottomDivider containerStyle={styles.listItemContainer} >
                <Avatar
                    size="medium"
                    rounded
                    title="LJ"
                    titleStyle={{ color: '#fff', fontFamily: 'Poppins_400Regular' }}
                    containerStyle={{ backgroundColor: 'rgba(181, 92, 92, 0.5)' }}
                />
                <ListItem.Content>
                    <ListItem.Title style={styles.listItemText}>{props.nome}</ListItem.Title>
                    <ListItem.Subtitle style={styles.listItemText}>{props.categoria}</ListItem.Subtitle>
                    <ListItem.Subtitle style={[styles.listItemText, { color: '#8B8D2F' }]}>{props.tempo_entrega} min</ListItem.Subtitle>
                    <ListItem.Subtitle style={[styles.listItemText, { position: 'absolute', right: 70, bottom: 0, color: '#13741D' }]}>R$ {props.taxa_entrega}</ListItem.Subtitle>
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
                <View style={{ flex: 0.3, flexDirection: 'row', marginTop: Platform.OS === 'android' ? 20 : 0 }}>
                    <Image
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
                        buttonStyle={{ backgroundColor: 'rgba(0,0,0,0.0)' }}
                    />
                    {/* <Avatar
                        rounded
                        source={require('../../assets/profile_image100x100.png')}
                        containerStyle={{ right: 10, top: 8 }}
                        size='medium'
                    /> */}
                </View>
                <View style={{ flex: 0.4 }}>
                    <Input
                        rightIcon={{ type: 'font-awesome', name: 'search' }}
                        containerStyle={{ width: 236, alignSelf: 'center' }}
                    />
                    <Text style={styles.text}>Bem vindo, user!</Text>

                </View>
                <View style={{ flex: 0.3, marginTop: 20 }}>
                    <Text style={styles.text}>Categorias</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={require('../../assets/burger.png')}
                                style={styles.carouselImage}
                            />
                            <Image
                                source={require('../../assets/pizzareal2.png')}
                                style={styles.carouselImage}
                            />
                            <Image
                                source={require('../../assets/saladareal.png')}
                                style={styles.carouselImage}
                            />
                            <Image
                                source={require('../../assets/bebidareal.png')}
                                style={styles.carouselImage}
                            />
                            <Image
                                source={require('../../assets/padariareal.png')}
                                style={styles.carouselImage}
                            />

                        </View>
                    </ScrollView>
                </View>
                <View style={{ flex: 0.4, marginTop: 20 }}>
                    <Text style={styles.text}>Destaques</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={require('../../assets/79x69.png')}
                                style={styles.carouselImage}
                            />
                            <Image
                                source={require('../../assets/79x69.png')}
                                style={styles.carouselImage}
                            />
                            <Image
                                source={require('../../assets/79x69.png')}
                                style={styles.carouselImage}
                            />
                            <Image
                                source={require('../../assets/79x69.png')}
                                style={styles.carouselImage}
                            />
                            <Image
                                source={require('../../assets/79x69.png')}
                                style={styles.carouselImage}
                            />
                        </View>
                    </ScrollView>
                </View>
                <View style={{ flex: 1, marginTop: 20 }}>
                    <Text style={styles.text}>Lojas disponíveis</Text>
                    {
                        dataStoreList.map((store, i) => (
                            <StoreItem nome={store.nome} categoria={store.categoria} tempo_entrega={store.tempo_entrega} taxa_entrega={store.taxa_entrega} key={i} />
                        ))
                    }
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <Image
                        source={require('../../assets/home_icon.png')}
                        style={{ width: 55, height: 55 }}

                    />
                    <Image
                        source={require('../../assets/lista_icon.png')}
                        style={{ width: 55, height: 55 }}
                    />
                    <Image
                        source={require('../../assets/profile_image100x100.png')}
                        style={{ width: 50, height: 50 }}
                    />
                </View>
            </ScrollView>
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
    image: {
        width: 106,
        height: 44,
    },
    dropDowntext: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 10,
    },
    dropdown: {
        width: 165,
        borderWidth: 0,
        backgroundColor: 'rgba(0,0,0,0.0)',
    },
    container: {
        width: 165,
        backgroundColor: 'rgba(0,0,0,0.0)',
    },
    button: {
        backgroundColor: '#B84D4D',
        minWidth: 200,
        alignSelf: 'center',
    },
    carouselImage: {
        width: 79,
        height: 69,
        marginLeft: 20,
        marginRight: 20,
    },
    text: {
        fontFamily: 'Sarabun_700Bold',
        fontSize: 18,
        lineHeight: 26,
        textAlign: 'center',
    },
    label: {
        fontWeight: '400',
        fontFamily: 'Poppins_400Regular',
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
