import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    header:{
        backgroundColor: "#365478",
        height:hp('16%'),
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:10,
        paddingHorizontal:32,
        borderBottomWidth:5,
        borderBottomColor:'#D8D9DB',
      },
      circle: {
        width: 120,height: 120,borderRadius: 120 / 2,
        alignSelf:'center',
        position: 'absolute',
        marginTop:hp('9%')
      },
      avatar: {
        width: 120,height: 120,borderRadius: 120 / 2,borderWidth:3,borderColor:"#D8D9DB",
        alignSelf:'center',
        position: 'absolute',
      },
      body:{
        marginTop:hp('2%'),
        paddingBottom:5
      },
      body2:{
        paddingBottom:20,
        paddingHorizontal:22,
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
        flex:1,
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
  },
  footer:{
    top:8,
    paddingVertical:8,
    marginHorizontal:30,
    backgroundColor:'#365478',
    paddingHorizontal:hp('8.5%'),
    borderBottomRightRadius:hp('1.5%'),
    borderBottomLeftRadius:hp('1.5%'),
    borderTopLeftRadius:hp('4%'),
    borderTopRightRadius:hp('4%'),
    flexDirection:'row',
    justifyContent:'space-between',
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  detailsBar:{
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  detailsButtonText:{
    fontSize: hp('2.2%'),
    fontWeight: 'bold'
  },
  postsList: {
    marginTop: 5,
    paddingHorizontal: 10,
  },
  post: {
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 5,
    shadowColor: 'rgb(0, 0, 0)',
            shadowOffset: {
              width: 3,
              height: 3,
            },
            shadowOpacity: 0.8,
            shadowRadius: 5,
            elevation: 3,
  },
  postTitle: {
    fontSize: 16,
    color: '#365478',
    fontWeight: 'bold',
  },
  postTag:{
    fontSize: 12,
    color: '#737380'
  },
  postDescricao: {
    fontSize: 15,
  },
  postHeader:{
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    paddingRight:24,
    paddingLeft:24,
    paddingTop:10,
    paddingBottom:8
  },

  postDesc:{
    backgroundColor: 'white',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius:8,
    paddingRight:24,
    paddingLeft:24,
    paddingTop:10,
    paddingBottom:12,
  },

  postTitulo:{
    flexDirection:'row',
    alignItems:'center',
    marginBottom:2
  },
  Nomepost:{
    fontSize:10,
    color:'#C8C8C8'
  },
  headerTags:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  Ver:{
    paddingRight:20,
    flexDirection:'row', 
    alignItems:'center',
    justifyContent:'center'
  },
})