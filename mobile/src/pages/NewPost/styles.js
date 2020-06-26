import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


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
      alignItems:'center',
      height:hp('9%'),
    },
    
    inputContainer:{
      paddingHorizontal:32,
      paddingTop:10,
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
      color: '#365478',
      marginBottom: 5,
      fontSize:18
    },
  
    input: {
      borderBottomWidth: 1,
      borderColor: '#ddd',
      paddingHorizontal: 20,
      fontSize: 15,
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