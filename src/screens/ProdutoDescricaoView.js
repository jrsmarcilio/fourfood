import { StyleSheet, Text, View, Platform } from 'react-native';
import { Icon, Button} from 'react-native-elements';
import { useState } from 'react';
import { setItem, getItem } from '../storage/Storage';
import { TextField } from '../components/TextField';

export default function ProdutoDescricaoView({ navigation, route }) {
    const [painelAtivo, setPainelAtivo] = useState('');
    getItem('produto').then((data) => {
        if (data && data === 'cliente') {
            setPainelAtivo(data);
            setSwitchValue(true);
        } else {
            setPainelAtivo(data);
            setSwitchValue(false);
        }
    })
    return(
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <Icon
                    name='chevron-left'
                    type='font-awesome'
                    size={20}
                    onPress={() => {
                        getItem('profile').then((data) => {
                            if (data === 'cliente') navigation.goBack();
                            else navigation.navigate('PerfilEmpresaView');
                        })
                    }}
                />
            </View>
            <View style={{ flex: 1 }}>
                <Image
                    source={{ uri: props.img_url }}
                    style={styles.image}
                    PlaceholderContent={<ActivityIndicator />}
                />
                <Text style={styles.text}>Bolo de nutela com ninho</Text>
                <Text style={styles.text}>Esse é o queridinho da casa! Bolo no pote com bastante recheio de leite ninho e duas camadas de nutela.</Text>
                <Text style={styles.text}>R$ 8,99</Text>
                <Text style={styles.text}>37-47 min | Entrega: R$ 5,00</Text>
                
            </View>
            <View style={{ flex: 1 }}>
              <ListItem bottomDivider underlayColor={'#d9dcde'} containerStyle={styles.listItemContainer} onPress={() => {
                navigation.navigate('DisplayLojaView', { idLoja: props.id })
              }}>
              <Text style={styles.text}>Adicionais:</Text>
              <ListItem.Content>
                <ListItem.Title style={styles.listItemText}>Granulado colorido</ListItem.Title>
                <ListItem.Subtitle style={[styles.listItemText, { position: 'absolute', right: 70, bottom: 0, color: '#13741D' }]}>R$ 1,50</ListItem.Subtitle>
                <Icon
                  name='circle'
                  type='font-awesome'
                  color={'#f44336'}
                />
                </ListItem.Content>
                <ListItem.Content>
                <ListItem.Title style={styles.listItemText}>Jujuba</ListItem.Title>
                <ListItem.Subtitle style={[styles.listItemText, { position: 'absolute', right: 70, bottom: 0, color: '#13741D' }]}>R$ 2,00</ListItem.Subtitle>
                <Icon
                  name='circle'
                  type='font-awesome'
                  color={'#f44336'}
                />
                </ListItem.Content>
              </ListItem>
             
            </View>    
            <View>
            <Button
              buttonStyle={styles.button}
              title="-"
            />
            <TextField>  </TextField>
            <Button
              buttonStyle={styles.button}
              title="+"
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
                title="Adicionar     R$10,99"
                />
            </View>
          </View>
    )

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
    image: {
        width: 106,
        height: 44,
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