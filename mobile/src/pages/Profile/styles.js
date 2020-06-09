import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    header:{
        backgroundColor: "#365478",
        height:150,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:15,
        paddingHorizontal:32,
        borderBottomWidth:5,
        borderBottomColor:'#D8D9DB',
      },
      avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:80
      },
      name:{
        fontSize:22,
        color:"#FFFFFF",
        fontWeight:'600',
      },
      body:{
        marginTop:30,
      },
      bodyContent: {
        marginTop:20
      },
      name:{
        fontSize:28,
        color: "#696969",
        fontWeight: "600"
      },
      info:{
        fontSize:16,
        color: "#365478",
        marginTop:1
      },
      description:{
        fontSize:16,
        color: "#696969",
        marginTop:10,
        textAlign: 'center'
      },
      buttonContainer: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#365478",
      },
      detailsButton:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop:17
      },
      container:{
        flex:1
      },
      contentCard:{
        alignItems:"center"
      },
      contentTitle:{
        fontSize:20, 
        fontWeight:'bold'
      },
      contentTitle2:{
        fontSize:20, 
        fontWeight:'bold',
        marginTop:10
      },
      contentSubtitle:{
        fontSize:17, 
        fontWeight:'bold', 
        paddingHorizontal:24
      },
      Card:{
        width:100, 
        height:50
      },
      cardTitle:{
        fontSize:15, 
        fontWeight:'bold'
      },
      cardTags:{
        fontSize:12
      },
      cardDate:{
        marginLeft:60, 
        marginTop:12, 
        fontSize:9
      },
      modalView:{
        alignItems:'center',
        justifyContent:'center'
      },
      modalContent:{
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        position: 'absolute'
      },
      modalBody:{
        bottom: 0,
        position: 'absolute',
        height: '50%',
        backgroundColor: '#fff',
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingLeft: 25,
        paddingRight: 25,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
      },
      indicator:{
        width: 50,
        height: 5,
        backgroundColor: '#ccc',
        borderRadius: 50,
        alignSelf: 'center',
        marginTop: 8
      },
      input: {
        paddingHorizontal: 8,
        fontSize: hp('1.8%'),
        color: '#444',
        height: hp('4%'),
        borderRadius: 2,
    },
    modalSubtitle:{
      fontSize:16,
      color: "#365478",
      marginTop:5
    },
    button: {
      height: hp('5%'),
      width: wp('30%'),
      backgroundColor: '#365478',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius:15,
      flexDirection:'row',
      paddingHorizontal:20
  },
  buttonText: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: hp('2%'),
  },
  buttonView:{
    flexDirection:'row', 
    justifyContent:'space-between', 
    paddingHorizontal:36, 
    paddingVertical:12
  },
  modalPerfil:{
    alignItems:'center', 
    justifyContent:'center', 
    marginTop:16, 
    flexDirection:'row'
  },
  perfilTitle:{
    fontSize:20, 
    fontWeight:'bold', 
    color:'#444'
  },
  viewInput:{
    paddingVertical:10, 
    paddingHorizontal:16
  },

})