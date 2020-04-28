import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
      flex:1,
    },
    
    header:{
      flexDirection:'row',
      justifyContent:'space-between',
      paddingVertical:12,
      paddingHorizontal:32,
      backgroundColor:'#365478',
      borderBottomWidth:1,
      borderBottomColor:'#D8D9DB',
      height:70,
      alignItems:'center'
    },
    
    inputContainer:{
      margin:32,
      flexDirection:'row',
    },

    anexo:{
      alignItems:'flex-end',
      marginHorizontal:32,
    },
    
    avatar:{
      marginRight:16
    },

    label: {
      fontWeight: 'bold',
      color: '#444',
      marginBottom: 5,
      fontSize:18
    },
  
    input: {
      borderBottomWidth: 1,
      borderColor: '#ddd',
      paddingHorizontal: 20,
      fontSize: 16,
      color: '#444',
      height: 44,
      marginBottom: 30,
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