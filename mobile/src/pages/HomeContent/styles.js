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
      paddingHorizontal:30,
      backgroundColor:'#365478',
      borderBottomWidth:1,
      borderBottomColor:'#D8D9DB',
      height:hp('13%'),
      alignItems:'center',
      paddingTop: hp('2%')
  },

  headerText: {
    fontSize: 18,
    color: 'white',
  },
  headerTextBold: {
    fontWeight: 'bold'
  },
  postsList: {
    marginTop: 32,
  },
  post: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  postTitle: {
    fontSize: 16,
    color: '#41414d',
    fontWeight: 'bold'
  },
  postTag:{
    fontSize: 12,
    marginBottom: 12,
    color: '#737380'
  },
  postDescricao: {
    fontSize: 14,
  },
  detailsButton:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  detailsButtonText:{
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  footer:{
    position: 'absolute', 
    left: hp('2%'), 
    right: hp('2%'), 
    bottom: hp('2%'),
    height:hp('6%'),
    backgroundColor:'#365478',
    paddingVertical:10,
    paddingHorizontal:60,
    borderBottomRightRadius:30,
    borderBottomLeftRadius:30,
    borderTopLeftRadius:8,
    borderTopRightRadius:8,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  detailsBar:{
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  detailsButtonTextHome:{
    color: '#FFC300',
    fontSize: 18,
    fontWeight: 'bold'
  },
})