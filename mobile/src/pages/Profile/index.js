import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'

import { Image, Alert, View, AsyncStorage, KeyboardAvoidingView, Text, Platform, TextInput, TouchableOpacity, StatusBar } from "react-native";
import api from '../../services/api'

import logo from '../../assets/logo.png'; // Nessa página poderia usar uma logo maior
import styles from './styles'
import * as Animatable from 'react-native-animatable'
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {AuthContext} from '../../context'

export default function Profile(){
  const navigation = useNavigation()
  const {singOut} = React.useContext(AuthContext);
  
  function logoutUser() {
    AsyncStorage.clear()
    singOut();
  }

    return(
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.detailsButton} onPress ={ ( ) => navigation.openDrawer()}>
                <Feather name="menu" size={20} color="#FFC300"></Feather>
            </TouchableOpacity>
            <Text></Text>
            <TouchableOpacity style={styles.detailsButton} onPress={()=>
                    Alert.alert(
                      'Sair',
                      'Deseja Sair?',
                      [
                        {text: 'Cancelar', onPress: () => {return null}},
                        {text: 'Sair', onPress: () => {
                          logoutUser();
                        }},
                      ],
                      { cancelable: false }
                    )}
            >
                <Feather name="log-out" size={20} color="#FFC300"></Feather>
            </TouchableOpacity>
          </View>
          <Image style={styles.avatar} source={{uri: 'https://scontent.fstu3-1.fna.fbcdn.net/v/t1.0-9/p960x960/87283876_1614904885331971_5523389541076959232_o.jpg?_nc_cat=102&_nc_sid=85a577&_nc_ohc=FY3G_XQYr4YAX_jln8U&_nc_ht=scontent.fstu3-1.fna&_nc_tp=6&oh=6892c35abdfc7a8e7f4786b477890cfc&oe=5EDAE0E2'}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>Reidner Rocha</Text>
              <Text style={styles.info}>Tags</Text>
              <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>
              
              <TouchableOpacity style={styles.buttonContainer}>
                <Text>Opcion 1</Text>  
              </TouchableOpacity>              
              <TouchableOpacity style={styles.buttonContainer}>
                <Text>Opcion 2</Text> 
              </TouchableOpacity>
            </View>
        </View>
      </View>
    )
}