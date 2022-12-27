import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image, Button } from 'react-native-elements';
import { useState } from 'react';
import { MaskedTextInput } from 'react-native-mask-text';


export default function ClienteView({ navigation, route }) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [celular, setCelular] = useState('');
  const [telefone, setTelefone] = useState('');

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Image
          source={require("../../assets/fourfood.png")}
          style={styles.image}
        />
        <Text style={styles.text}>CADASTRE-SE HOJE!</Text>
        <View style={{ flex: 1 }}>

          <Text style={styles.label}>Nome</Text>
          <MaskedTextInput
            onChangeText={nome => setNome(nome)}
            style={styles.input}
          />
          <Text style={styles.label}>CPF</Text>
          <MaskedTextInput
            mask='999.999.999-99'
            onChangeText={cpf => setCpf(cpf)}
            keyboardType='numeric'
            style={styles.input}
          />
          <Text style={styles.label}>Celular</Text>
          <MaskedTextInput
            mask='(99)99999-9999'
            placeholder='(99)99999-9999'
            onChangeText={celular => setCelular(celular)}
            keyboardType='numeric'
            style={styles.input}
          />
          <Text style={styles.label}>Telefone</Text>
          <MaskedTextInput
            mask='(99)9999-9999'
            onChangeText={telefone => setTelefone(telefone)}
            keyboardType='numeric'
            style={styles.input}
          />

          <Button
            title={'Cadastrar'}
            buttonStyle={styles.button}
            onPress={() => navigation.navigate('EmpresaView', {
              nome: nome,
              cpf: cpf,
              celular: celular,
              telefone: telefone
            })}
          />
        </View>

        <View style={{ flex: 1 }}>

        </View>
      </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#B84D4D',
    minWidth: 200,
    alignSelf: 'center',
  },
  image: {
    minHeight: 140,
    marginTop: 30,
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
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
