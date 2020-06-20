import React from 'react';
import {StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height:hp('12%'),
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
  Owner:{
    paddingLeft:60,
  },
  noOwner:{
    paddingRight:60,
  },
  Body: {
    marginTop: 10,
    flex: 1
  },
  BodyFlat: {
    flex: 0.9
  },
  postHeader: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingRight: 24,
    paddingLeft: 24,
    paddingTop: 5,
    paddingBottom: 5
  },
  postDesc: {
    backgroundColor: '#FAFAFA',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingRight: 24,
    paddingLeft: 24,
    paddingTop: 2,
    paddingBottom: 12,
  },

  postTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2
  },
  Nomepost: {
    fontSize: 10,
    color: '#C8C8C8'
  },
  postTitle: {
    fontSize: 16,
    color: '#365478',
    fontWeight: 'bold',
    paddingLeft: 10
  },
  postDescricao: {
    fontSize: 15,
  },
});

export default styles;