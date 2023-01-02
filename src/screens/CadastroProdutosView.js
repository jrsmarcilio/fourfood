import React, { useState } from "react";
import { StyleSheet, Text, View, Switch } from 'react-native';
import { Image, Input, Button } from 'react-native-elements';
import { useFonts } from 'expo-font';
import DropDownPicker from 'react-native-dropdown-picker';

export default function ProdutoView() {

    const [isEnabled, setIsEnabled] = useState(false);
    
    const [fontsLoaded] = useFonts({
      'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    });
    if (!fontsLoaded) return null;
    
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
      <View style={{ flex: 1 }}>
        <Image
          source={require("../../assets/fourfood.png")}
          style={styles.image}
        />
        <Text style={styles.text}>CADASTRE SEUS PRODUTOS</Text>
        <View style={{ flex: 1 }}>
            <DropDownPicker
                style={styles.dropdown}
                items={[
                    {label: 'Doces', value: 'doces', selected: true},
                    {label: 'Pizza', value: 'pizza'},
                    {label: 'Hambúrgueres', value: 'hamburguer'},
                ]}
                defaultIndex={0}
                containerStyle={{height: 40}}
                onChangeItem={item => console.log(item.label, item.value)}
           />   

          <Input
            label='Título'
            labelStyle={styles.label}
          />
          <Input
            label='Descrição:'
            labelStyle={styles.label}
          />
          <Input
            label='Valor Unitário:'
            labelStyle={styles.label}
          />
          <Input
            label='Tempo de entrega:'
            labelStyle={styles.label}
          />

           <Switch
                label='Destaque?'
                labelStyle={styles.label}

                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
          />

          <Button
            title={'Continuar'}
            buttonStyle={styles.button}
          />
        </View>
  
        <View style={{ flex: 1 }}>
  
        </View>
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
    dropdown: {
        marginHorizontal: 10,
        width: "100%",
        marginBottom: 15,
    },
    label: {
      fontWeight: '400',
      fontFamily: 'Poppins-Regular',
      fontSize: 16,
      lineHeight: 20,
      color: '#000',
    }
  });
