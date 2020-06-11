import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection:'row',
    justifyContent:'space-between',
    paddingVertical:15,
    paddingHorizontal:32,
    backgroundColor:'#365478',
    borderBottomWidth:1,
    borderBottomColor:'#D8D9DB',
    height:hp('10%'),
    alignItems:'center',
    paddingTop: hp('2%'),
  },

  headerText: {
    fontSize: 18,
    color: 'white',
  },
  headerTextBold: {
    fontWeight: 'bold'
  },
  postsList: {
    marginTop: 5,
    paddingHorizontal: 8,
  },
  post: {
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
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
    paddingLeft:10
  },
  postTag:{
    fontSize: 12,
    color: '#737380'
  },
  postDescricao: {
    fontSize: 15,
  },
  detailsButton:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  detailsButtonText:{
    color: 'white',
    fontSize: hp('2.2%'),
    fontWeight: 'bold'
  },
  footer:{
    position: 'absolute', 
    left: hp('2%'), 
    right: hp('2%'), 
    bottom: hp('2%'),
    height:hp('6%'),
    backgroundColor:'#365478',
    alignItems:'center',
    paddingHorizontal:hp('8.5%'),
    borderBottomRightRadius:hp('4%'),
    borderBottomLeftRadius:hp('4%'),
    borderTopLeftRadius:hp('1.5%'),
    borderTopRightRadius:hp('1.5%'),
    flexDirection:'row',
    justifyContent:'space-between',
    flex:0.1,
    shadowColor: 'rgb(0, 0, 0)',
            shadowOffset: {
              width: 3,
              height: 3,
            },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 3,
  },
  detailsBar:{
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  detailsButtonTextHome:{
    color: '#FFC300',
    fontSize: hp('2.2%'),
    fontWeight: 'bold'
  },
  Search:{
    marginTop:5
  },
  Barheight:{
    height: hp('5%')
  },
  Body:{
    flex:1
  },
  BodyFlat:{
    flex:0.9
  },
  addButton: {
    position: 'absolute',
    right: hp('2%'),
    bottom: hp('9%'),
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#566F8E',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgb(0, 0, 0)',
            shadowOffset: {
              width: 3,
              height: 3,
            },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 3,
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
  Nomepost:{
    fontSize:10,
    color:'#C8C8C8'
  },

  modalContent:{
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  modalBody:{
    right:33,
    top:55,
    position: 'absolute',
    height: 120,
    backgroundColor: '#fff',
    width: 95,
    borderRadius:5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  modalFilter:{
    height:28, 
    backgroundColor:'#C8C8C8', 
    borderTopLeftRadius:5, 
    borderTopRightRadius:5, 
    justifyContent:'center', 
    alignItems:'center'
  },
  filterTitle:{
    color:'black', 
    fontWeight:'bold',
    fontSize:16
  },
  filterView:{
    paddingHorizontal:5
  },
  filterSub:{
    paddingVertical:3
  },
  filterButton:{
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center'
  },
  filterText:{
    color:'black', 
    fontSize:14, 
    color:'#365478', 
    fontWeight:'bold'
  },
  filterExit:{
    marginTop:1,
    paddingVertical:3,
    borderTopWidth:1,
    alignItems:'center',
    borderTopColor:'#C8C8C8'
  },

})