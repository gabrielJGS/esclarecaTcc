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
    height: '38%',
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
  modalPerfil:{
    alignItems:'center', 
    justifyContent:'center', 
    marginTop:hp('1.5%'), 
    flexDirection:'row'
  },
  perfilTitle:{
    fontSize:hp('2.2%'), 
    fontWeight:'bold', 
    color:'#444'
  },
});

export default styles;