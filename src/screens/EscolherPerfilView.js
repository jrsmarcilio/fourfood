import { View, StyleSheet, Text } from "react-native";
import { Image } from "react-native-elements";

export default function EscolherPerfilView({ navigation, route }) {
    const AccountType = {
        Cliente: 'cliente',
        Empresa: 'empresa'
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={[styles.container, { justifyContent: 'center' }]}>
                <Text style={styles.text}>Sou...</Text>
            </View>
            <View style={styles.container}>
                <Image
                    source={require("../../assets/perfil_cliente100x130.png")}
                    style={styles.image}
                    onPress={() => navigation.navigate('LoginView', {
                        accountType: AccountType.Cliente,
                    })}
                />
                <Image
                    source={require("../../assets/perfil_empresa100x130.png")}
                    style={styles.image}
                    onPress={() => navigation.navigate('LoginView', {
                        accountType: AccountType.Empresa,
                    })}
                />

            </View>
            <View style={{ flex: 1 }}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        alignSelf: 'center',
        fontFamily: 'Sarabun_700Bold',
        fontSize: 20,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    image: {
        width: 100,
        height: 130,
    }
});