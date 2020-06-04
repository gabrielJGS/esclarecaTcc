import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 32,
    backgroundColor: '#365478',
    height: hp('10%'),
    alignItems: 'center',
    paddingTop: hp('2%'),
  },

  headerPost: {
    backgroundColor: '#365478',
    borderBottomRightRadius: 10
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
    backgroundColor: '#FAFAFA',
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
    paddingLeft: 10
  },
  postTag: {
    fontSize: 12,
    color: '#737380'
  },
  postDescricao: {
    fontSize: 15,
  },
  detailsButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  detailsButtonText: {
    color: 'white',
    fontSize: hp('2.2%'),
    fontWeight: 'bold'
  },
  detailsBar: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  detailsButtonTextHome: {
    color: '#FFC300',
    fontSize: hp('2.2%'),
    fontWeight: 'bold'
  },
  Search: {
    marginTop: 5
  },
  Barheight: {
    height: hp('5%')
  },
  Body: {
    marginTop: 5,
    flex: 1
  },
  BodyFlat: {
    flex: 0.9
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

  postHeader: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingRight: 24,
    paddingLeft: 24,
    paddingTop: 10,
    paddingBottom: 8
  },

  postDesc: {
    backgroundColor: '#FAFAFA',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingRight: 24,
    paddingLeft: 24,
    paddingTop: 10,
    paddingBottom: 12,
  },

  postTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2
  },

  headerTags: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  Ver: {
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  Nomepost: {
    fontSize: 10,
    color: '#C8C8C8'
  },

  DuvidaTitle: {
    fontWeight: 'bold',
    color: "white",
    fontSize: 25
  },
  DuvidaCorpo: {
    flexDirection: 'row',
    paddingHorizontal: 32,
    paddingBottom: 10
  },
  CorpoTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: hp('10%'),
    backgroundColor: '#365478',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },

  InputT: {
    color: '#365478',
    width: hp('50%'),
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    maxHeight: 200,
    fontWeight: 'bold'
  },
})