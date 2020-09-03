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
  detailsButton:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  detailsButtonText:{
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
  Search:{
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop:15,
    marginHorizontal:10,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingLeft:20,
    paddingRight:10,
  },
  Barheight:{
    height: hp('5%')
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


  Ver:{
    paddingRight:20,
    flexDirection:'row', 
    alignItems:'center',
    justifyContent:'center'
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
    backgroundColor: '#fff',
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
  modalPesquisaBody:{
    right:20,
    top:126,
    width:92,
    position: 'absolute',
    backgroundColor: '#fff',
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
    backgroundColor:'#C8C8C8', 
    borderTopLeftRadius:5, 
    borderTopRightRadius:5, 
    justifyContent:'center', 
    alignItems:'center'
  },
  filterTitle:{
    marginLeft: 3,
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
    fontSize:14, 
    fontWeight:'bold'
  },
  filterExit:{
    marginTop:1,
    paddingVertical:3,
    borderTopWidth:1,
    alignItems:'center',
    borderTopColor:'#C8C8C8'
  },
  input: {
    paddingHorizontal: 8,
    fontSize: hp('1.6%'),
    color: '#444',
    height: hp('4%'),
    borderRadius: 2,
    maxHeight: 200,
    }
})