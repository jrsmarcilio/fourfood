import { View, Text, StyleSheet } from "react-native";
import { Image } from "react-native-elements";


export default function PedidoFinalizadoView({ navigation, route }) {

    //TODO: salvar dados do pedido no banco

    //timeout pra aguardar antes de redirecionar para dashboard
    setTimeout(() => {
        navigation.navigate('DashBoardView');
    }, 5000);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image
                source={require('../../assets/pedido_fin226x221.png')}
                style={{ width: 226, height: 221 }}
            />
            <Text style={styles.text}>Pedido realizado!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Sarabun_700Bold',
        fontSize: 18,
        lineHeight: 26,
        fontStyle: 'normal',
        textAlign: 'center',
        marginTop: 20,
    },
});