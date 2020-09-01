import React from 'react';
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: '#365478',
    borderBottomWidth: 1,
    borderBottomColor: '#D8D9DB',
    height: 70,
    alignItems: 'center',
    height: hp('12%'),
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    //height: hp('10%'),
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
    width: hp('40%'),
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    maxHeight: 200,
    fontWeight: 'bold'
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
  Owner: {
    paddingLeft: 60,
    alignSelf: 'flex-end'
  },
  notOwner: {
    paddingRight: 60,
    alignSelf: 'flex-start'
  },
  Body: {
    marginTop: 5,
    flex: 1
  },
  BodyFlat: {
    flex: 0.9
  },
  postHeader: {
    width: hp('44%'),
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F2F3F4',
  },
  postDesc: {
    backgroundColor: '#FAFAFA',
    paddingRight: 24,
    paddingLeft: 24,
    paddingTop: 2,
    paddingBottom: 12,
    borderBottomLeftRadius:8,
    borderBottomRightRadius:8,
  },

  postTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10
  },
  Nomepost: {
    alignItems: 'flex-end',
    fontSize: 8,
    color: '#C8C8C8'
  },
  postTitle: {
    fontSize: 14,
    color: '#365478',
    fontWeight: 'bold',
    paddingLeft: 10
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    borderWidth: 1,
    borderColor: "#D8D9DB",
  },
  postDescricao: {
    fontSize: 15,
  },
});

export default styles;