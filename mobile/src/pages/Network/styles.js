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
    height:hp('10%'),
  },
  Search:{
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop:10,
    marginHorizontal:10,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingLeft:20,
    paddingRight:10,
  },
  input: {
    paddingHorizontal: 8,
    fontSize: hp('1.6%'),
    color: '#444',
    height: hp('4%'),
    borderRadius: 2,
    maxHeight: 200,
    },
  post: {
    borderRadius: 8,
    backgroundColor: '#fff',
    marginTop:12,
    marginBottom: 5,
    marginHorizontal:12,
    shadowColor: 'rgb(0, 0, 0)',
            shadowOffset: {
              width: 3,
              height: 3,
            },
            shadowOpacity: 0.8,
            shadowRadius: 5,
            elevation: 3,
  },
  postHeader:{
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    paddingHorizontal:16,
    paddingTop:5,
    paddingBottom:5
  },
  avatar: {
    width: 45, height: 45, borderRadius: 45 / 2, borderWidth: 1, borderColor: "#D8D9DB",
  },
  postTag: {
    fontSize: 12,
    color: '#737380'
  },
});

export default styles;