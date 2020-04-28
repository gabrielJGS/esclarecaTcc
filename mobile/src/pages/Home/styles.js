import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection:'row',
      justifyContent:'space-between',
      paddingVertical:12,
      paddingHorizontal:30,
      backgroundColor:'#365478',
      borderBottomWidth:1,
      borderBottomColor:'#D8D9DB',
      height:110,
      alignItems:'center'
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
  }
})