import { Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';

const TextFieldMask = ({ mask, label, required, keyboardType, theme = 'light', ...inputProps }) => (
  <Fragment>
    {
      required ? (
        <View style={styles.labelContainer}>
          <Text style={{ ...styles.label, ...styles[theme] }}>{label}</Text>
          <Text style={styles.errorMessage}>*</Text>
        </View>
      ) :
        <Text style={{ ...styles.label, ...styles[theme] }}>{label}</Text>
    }
    <MaskedTextInput
      mask={mask}
      placeholder={mask}
      keyboardType={keyboardType ? keyboardType : 'numeric'}
      style={{ ...styles.input, ...styles[theme] }}
      {...inputProps}
    />
  </Fragment>
)

export { TextFieldMask }

const styles = StyleSheet.create({
  input: {
    height: 40,
    fontSize: 16,
    backgroundColor: '#ECECEC',
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  label: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 4,
    marginTop: 8
  },
  borderError: {
    borderWidth: 1,
    borderColor: 'rgba(200,0,50,1)'
  },
  errorMessage: {
    fontSize: 12,
    color: 'rgba(200,0,50,1)',
    textAlign: 'center',
    marginTop: 5,
    marginLeft: 5
  },
  labelContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  light: {
    color: '#020202',
  },
  dark: {
    color: '#f2f2f2',
  }
});