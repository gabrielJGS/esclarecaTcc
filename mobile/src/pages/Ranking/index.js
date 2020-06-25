import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity,Switch,AsyncStorage,Alert,Linking } from 'react-native';
import { Feather, Ionicons,SimpleLineIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer';

import styles from './styles'

export default function Ranking(){
    const navigation = useNavigation()

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress ={() => navigation.openDrawer()}>
                    <Feather name="menu" size={20} color="#FFC300"></Feather>
                </TouchableOpacity>
                <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center'}}>
                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20, marginRight:5 }}>Ranking</Text>
                    <SimpleLineIcons name="game-controller" size={18} color="#FFC300" style={{marginTop:2}} />
                </View>
            </View>
            <View style={{alignItems:'center', top:30, flexDirection:'row', justifyContent:'center'}}>
                <Feather name="trending-up" size={18} color="#5CBA58"/>
                <Text style={{fontWeight:'bold',fontSize:22, color:'#2E4053'}}> Maiores Participações</Text>
            </View>
            <View style={{marginHorizontal:40,top:60,flex:1, paddingBottom:20}}>
                <View style={{flexDirection:'row', alignItems:"center", justifyContent:'space-between', paddingBottom:15}}>
                    <View style={{flexDirection:'row', alignItems:"center", justifyContent:'space-between'}}>
                        <Feather name="award" size={17} color="#F5B7B1"/>
                        <Text style={{fontWeight:'bold',fontSize:19, color:'#566573', marginLeft:4}}>Reidner Rocha</Text>
                    </View>
                    <View>
                        <Text style={{fontWeight:'bold',fontSize:19, color:'#F1948A'}}>1500 <Text style={{fontWeight:'bold',fontSize:19, color:'#566573'}}>Pontos</Text></Text>
                    </View>
                </View>
                <View style={{flexDirection:'row', alignItems:"center", justifyContent:'space-between', paddingBottom:15}}>
                    <View style={{flexDirection:'row', alignItems:"center", justifyContent:'space-between'}}>
                        <Feather name="award" size={17} color="#F5B7B1"/>
                        <Text style={{fontWeight:'bold',fontSize:19, color:'#566573', marginLeft:4}}>Reidner Rocha</Text>
                    </View>
                    <View>
                        <Text style={{fontWeight:'bold',fontSize:19, color:'#F1948A'}}>1500 <Text style={{fontWeight:'bold',fontSize:19, color:'#566573'}}>Pontos</Text></Text>
                    </View>
                </View>
            </View>
        </View>
    )
}