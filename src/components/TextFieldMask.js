import { Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';

const TextFieldMask = ({ mask, label, keyboardType, ...inputProps }) => (
  <Fragment>
    <Text style={styles.label}>{label}</Text>
    <MaskedTextInput
      mask={mask}
      keyboardType={keyboardType ? keyboardType : 'numeric'}
      style={styles.input}
      {...inputProps}
    />
  </Fragment>
)

export { TextFieldMask }

const styles = StyleSheet.create({
  input: {
    height: 40,
    fontSize: 16,
    backgroundColor: '#fff',
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
    marginTop: 5
  }
});