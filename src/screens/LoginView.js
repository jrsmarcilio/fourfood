import { StyleSheet, Text, View } from 'react-native';
import { Image, Button } from 'react-native-elements';
import { useFonts } from 'expo-font';


export default function LoginView({navigation}) {
    const [fontsLoaded] = useFonts({
        'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    });
    if (!fontsLoaded) return null;

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>

            </View>
            <Image
                source={require("../../assets/logo.png")}
                style={styles.image}
            />
            <Button
                title="Cadastre-se"
                buttonStyle={styles.button}
                onPress={()=>navigation.navigate('ClienteView')}
            />

            <Button
                title="Outras opções"
                buttonStyle={[styles.button, { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#000' }]}
                titleStyle={{ color: '#000' }}
            />

            <View style={{ flex: 1 }}>

            </View>
        </View>
    )


}

const styles = StyleSheet.create({
    image: {
        minHeight: 140,
    },

    button: {
        backgroundColor: '#B84D4D',
        minWidth: 200,
        alignSelf: 'center',
        fontFamily: 'Poppins-Regular',
        marginTop: 30

    },
})
