
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

export default function HeaderTitle(props) {
  const navigation = useNavigation();

  const [titleComponent, setTitleComponent] = useState();
  const [componentName, setComponentName] = useState();

  useEffect(() => {
    setTitleComponent(props.title);
    setComponentName(props.componentName ? props.componentName : 'DashBoardView');
  }, [props]);

  return (
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 16 }} key={titleComponent}>
      <Icon name='chevron-left' type='font-awesome' onPress={() => navigation.navigate(componentName)} />
      <Text>{titleComponent}</Text>
    </View>
  );
}

export { HeaderTitle };
