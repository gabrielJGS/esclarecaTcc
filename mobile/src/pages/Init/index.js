import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'

import { Image, View, AsyncStorage, KeyboardAvoidingView, Text, Platform, TextInput, TouchableOpacity, StatusBar } from "react-native";
import api from '../../services/api'

import logo from '../../assets/logo.png'; // Nessa página poderia usar uma logo maior
import styles from './styles'
import * as Animatable from 'react-native-animatable'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

export default function Init(){
    const navigation = useNavigation()
    
    async function navigateToLogin() {
        navigation.navigate('Login');
    }

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('Home');
            }
        })
    }, [])

    return(
        <View style={styles.Container}>
            <StatusBar barStyle="light-content" translucent={false} backgroundColor={'#365478'} />
            <View style={styles.Header}>
                <Animatable.Image
                    animation="fadeInUpBig"
                    duration={1500}
                    source={logo}
                    style={styles.Logotype}
                    resizeMode="stretch"
                />
            </View>
            <Animatable.View 
                style={styles.Footer}
                animation="fadeInUpBig">
                <Text style={styles.Title}>Entre e faça parte dos nossos grupos de estudos!</Text>
                <Text style={styles.Texto}>Faça o login com sua conta</Text>
                <View style={styles.Button}>
                    <TouchableOpacity onPress={navigateToLogin} style={styles.Register}>
                            <Text style={styles.Inicie}>Entre já</Text>
                            <MaterialIcons name="navigate-next" color="#FFC300" size={25}></MaterialIcons>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    )
}