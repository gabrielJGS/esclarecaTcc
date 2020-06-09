import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'

import { Image, Alert, View, AsyncStorage, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import api from '../../services/api'
import { Card, CardItem, Left, Right, Title, Subtitle } from 'native-base'

import styles from './styles'
import * as Animatable from 'react-native-animatable'
import Feather from 'react-native-vector-icons/Feather';
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
            </View>
            <View style={{marginTop:40}}>
              <View style={{alignItems:"center"}}>
                <Text style={{fontSize:20, fontWeight:'bold'}}>Dúvidas</Text>
              </View>
              <Text style={{fontSize:17, fontWeight:'bold', paddingHorizontal:24}}>Enviadas</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal:24}}>
              <Card>
                  <CardItem button>
                    <Left>
                      <View style={{width:100, height:50}}>
                        <Text style={{fontSize:15, fontWeight:'bold'}}>Erro código</Text>
                        <Text style={{fontSize:12}}>Tags</Text>
                        <Text style={{marginLeft:60, marginTop:12, fontSize:9}}>08/06/2020</Text>
                      </View>
                    </Left>
                  </CardItem>
                </Card>
                <Card>
                  <CardItem button>
                    <Left>
                      <View style={{width:100, height:50}}>
                        <Text style={{fontSize:15, fontWeight:'bold'}}>Erro código</Text>
                        <Text style={{fontSize:12}}>Tags</Text>
                        <Text style={{marginLeft:60, marginTop:12, fontSize:9}}>08/06/2020</Text>
                      </View>
                    </Left>
                  </CardItem>
                </Card>
                <Card>
                  <CardItem button>
                    <Left>
                      <View style={{width:100, height:50}}>
                        <Text style={{fontSize:15, fontWeight:'bold'}}>Erro código</Text>
                        <Text style={{fontSize:12}}>Tags</Text>
                        <Text style={{marginLeft:60, marginTop:12, fontSize:9}}>08/06/2020</Text>
                      </View>
                    </Left>
                  </CardItem>
                </Card>
                <Card>
                  <CardItem button>
                    <Left>
                      <View style={{width:100, height:50}}>
                        <Text style={{fontSize:15, fontWeight:'bold'}}>Erro código</Text>
                        <Text style={{fontSize:12}}>Tags</Text>
                        <Text style={{marginLeft:60, marginTop:12, fontSize:9}}>08/06/2020</Text>
                      </View>
                    </Left>
                  </CardItem>
                </Card>
              </ScrollView>
              <Text style={{fontSize:17, fontWeight:'bold', marginHorizontal:24, marginTop:5}}>Favoritas</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal:24}}>
                <Card>
                  <CardItem button>
                    <Left>
                      <View style={{width:100, height:50}}>
                        <Text style={{fontSize:15, fontWeight:'bold'}}>Erro código</Text>
                        <Text style={{fontSize:12}}>Tags</Text>
                        <Text style={{marginLeft:60, marginTop:12, fontSize:9}}>08/06/2020</Text>
                      </View>
                    </Left>
                  </CardItem>
                </Card>
              </ScrollView>
              <View style={{alignItems:"center"}}>
                <Text style={{fontSize:20, fontWeight:'bold', marginTop:20}}>Conteúdos</Text>
              </View>
              <Text style={{fontSize:17, fontWeight:'bold', marginHorizontal:24}}>Enviados</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal:20}}>
              <Card>
                  <CardItem button>
                    <Left>
                      <View style={{width:100, height:50}}>
                        <Text style={{fontSize:15, fontWeight:'bold'}}>Erro código</Text>
                        <Text style={{fontSize:12}}>Tags</Text>
                        <Text style={{marginLeft:60, marginTop:12, fontSize:9}}>08/06/2020</Text>
                      </View>
                    </Left>
                  </CardItem>
                </Card>
              </ScrollView>
              <Text style={{fontSize:17, fontWeight:'bold', marginHorizontal:24, marginTop:5}}>Favoritos</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal:24}}>
              <Card>
                  <CardItem button>
                    <Left>
                      <View style={{width:100, height:50}}>
                        <Text style={{fontSize:15, fontWeight:'bold'}}>Erro código</Text>
                        <Text style={{fontSize:12}}>Tags</Text>
                        <Text style={{marginLeft:60, marginTop:12, fontSize:9}}>08/06/2020</Text>
                      </View>
                    </Left>
                  </CardItem>
                </Card>
              </ScrollView>
          </View>
        </View>
      </View>
    )
}