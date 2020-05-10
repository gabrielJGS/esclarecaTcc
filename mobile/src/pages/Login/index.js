import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'

import { Image, View, AsyncStorage, KeyboardAvoidingView, Text, Platform, TextInput, TouchableOpacity, StatusBar } from "react-native";
import api from '../../services/api'

import logo from '../../assets/logo.png'; // Nessa página poderia usar uma logo maior
import styles from './styles'
import * as Animatable from 'react-native-animatable'

import {AuthContext} from '../../context'

export default function Login() {
    const navigation = useNavigation()
    const {singIn} = React.useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('Home');
            }
        })
    }, [])
    //Inserir tratamento para caso tente inserir vazio
    async function handleSubmit() {
        if(email != '' && senha != ''){
            const response = await api.post('/login', {
                email, senha
            });
            const { id } = response.data;
            await AsyncStorage.setItem('user', id.toString());
            singIn();
        }
        else {
            alert('Preencha os campos.');
        }
    }

    async function handleForgetPassword() {
        const response = await api.post('/forget', {
            email
        });
        const { id } = response.data;
        await AsyncStorage.setItem('user', id.toString());
        navigation.navigate('Home');
    }

    async function navigateToRegister() {
        navigation.navigate('Register');
    }

    return (
        <KeyboardAvoidingView behavior={Platform.select({
            ios: 'padding',
            android: null,
        })} style={styles.container}>
            <StatusBar barStyle="light-content" translucent={false} backgroundColor={'#365478'} />
            <View style={styles.header}>
                <Animatable.Image
                    animation="bounceIn"
                    duration={1500}
                    source={logo}
                    style={styles.img}
                    resizeMode="stretch"
                />
            </View>
            <Animatable.View
                style={styles.form}
                animation="fadeInUpBig">
                <Text style={styles.text}>Entre com sua conta</Text>
                <Text style={styles.label}>E-MAIL</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Seu e-mail"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={styles.label}>SENHA</Text>
                <TextInput
                    style={styles.input2}
                    placeholder="Sua senha"
                    placeholderTextColor="#999"
                    secureTextEntry={true}
                    password={true}
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={senha}
                    onChangeText={setSenha}
                    returnKeyType="done"
                />
                <TouchableOpacity onPress={handleForgetPassword} style={{ marginBottom: 0 }}>
                    <Text style={{ color: '#e8423f' }}>Esqueci a senha</Text>
                </TouchableOpacity>

                <View style={styles.btn}>
                    <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={navigateToRegister} style={styles.button2}>
                        <Text style={styles.buttonText2}>Cadastre-se</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </KeyboardAvoidingView>
    )
}