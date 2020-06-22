import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    header:{
        backgroundColor: "#365478",
        height:hp('16%'),
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:15,
        paddingHorizontal:32,
        borderBottomWidth:5,
        borderBottomColor:'#D8D9DB',
      },
      avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "white",
        alignSelf:'center',
        position: 'absolute',
        marginTop:hp('10%')
      },
      body:{
        marginTop:hp('1.5%'),
        paddingBottom:5
      },
      body2:{
        paddingBottom:20,
        alignItems:"center"
      },
      bodyContent: {
        marginTop:hp('1%')
      },
      name:{
        fontSize:hp('3%'),
        color: "#696969",
        fontWeight: 'bold'
      },
      info:{
        fontSize:hp('1.8%'),
        color: "#FFC300",
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
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center',
      },
      contentTitle:{
        fontSize:hp('2.2%'), 
        fontWeight:'bold'
      },
      contentTitle2:{
        fontSize:hp('2.2%'),
        fontWeight:'bold',
        marginTop:hp('1%')
      },
      contentSubtitle:{
        fontSize:hp('1.8%'), 
        fontWeight:'bold', 
        paddingHorizontal:24,
      },
      Card:{
        width:wp('22%'), 
        height:hp('5.5%'),
      },
      cardTitle:{
        fontSize:hp('1.6%'), 
        fontWeight:'bold',
        color:'#365478'
      },
      cardTags:{
        fontSize:hp('1.2')
      },
      cardDate:{
        marginLeft:wp('11%'), 
        marginTop:hp('1.5%'), 
        fontSize:hp('1%')
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
        fontSize: hp('1.6%'),
        color: '#444',
        height: hp('4%'),
        borderRadius: 2,
    },
    modalSubtitle:{
      fontSize:hp('1.8%'),
      color: "#365478",
      marginTop:3
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
    paddingVertical:hp('1.8%')
  },
  modalPerfil:{
    alignItems:'center', 
    justifyContent:'space-between', 
    marginTop:hp('1.5%'), 
    flexDirection:'row'
  },
  perfilTitle:{
    fontSize:hp('2.2%'), 
    fontWeight:'bold', 
    color:'#444'
  },
  viewInput:{
    paddingVertical:hp('1%'), 
    paddingHorizontal:16
  },
  perfilName:{
    alignItems:'center', 
    marginTop:hp('4.8%'),
    justifyContent:'center'
  }

})