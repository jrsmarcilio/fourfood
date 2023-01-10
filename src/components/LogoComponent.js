import { StyleSheet } from 'react-native';
import { Image } from 'react-native-elements';

function LogoComponent({ size }) {
  return (
    <Image
      source={require("../../assets/logo.png")}
      style={{ ...styles.image, height: size }}
    />

  );
}

export { LogoComponent }

const styles = StyleSheet.create({
  image: {
    width: 'auto',
    resizeMode: "center",
  }
})
