
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { Avatar } from 'react-native-elements';

export default function BottonNavigation(props) {
    const navigation = useNavigation();

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Avatar
                size={'medium'}
                rounded
                icon={{ name: 'home', color: '#000' }}
                onPress={() => navigation.navigate('DashBoardView')}
            />
            <Avatar
                size={'medium'}
                rounded
                icon={{ name: 'search', color: '#000' }}
                onPress={() => navigation.navigate('CategoriasView')}
            />
            <Avatar
                size={'medium'}
                rounded
                icon={{ name: 'receipt', color: '#000' }}
            />
            <Avatar
                size={'medium'}
                rounded
                icon={{ name: 'person', color: '#000' }}
                onPress={() => navigation.navigate('MenuView')}
            />
        </View>
    );
}

export { BottonNavigation };
