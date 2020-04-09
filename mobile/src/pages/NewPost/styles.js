import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
      margin: 30,
    },
  
    label: {
      fontWeight: 'bold',
      color: '#444',
      marginBottom: 8,
    },
  
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      paddingHorizontal: 20,
      fontSize: 16,
      color: '#444',
      height: 44,
      marginBottom: 20,
      borderRadius: 2
    },
  
    button: {
      height: 42,
      backgroundColor: '#123660',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 2,
    },
  
    cancelButton: {
      backgroundColor: '#D9D9D9',
      marginTop: 10
    },
  
    buttonText: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });