import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'

import { Image, View, AsyncStorage, KeyboardAvoidingView, Text, Platform, TextInput, TouchableOpacity } from "react-native";
import api from '../../services/api'

import logo from '../../assets/logo.png'; // Nessa página poderia usar uma logo maior
import styles from './styles'

export default function Login() {
    const navigation = useNavigation()

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
        const response = await api.post('/login', {
            email, senha
        });
        const { id } = response.data;
        await AsyncStorage.setItem('user', id.toString());
        navigation.navigate('Home');
    }
    async function navigateToRegister() {
        navigation.navigate('Register');
    }
    return (
        <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
            <Image source={logo} />
            <View style={styles.form}>
                <Text style={styles.label}>SEU E-MAIL *</Text>
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
                <Text style={styles.label}>SENHA *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Sua senha"
                    placeholderTextColor="#999"
                    secureTextEntry={true}
                    password={true}
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={senha}
                    onChangeText={setSenha}
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToRegister} style={{ marginTop: 10 }}>
                    <Text style={{ color: '#fdee00' }}>Não possui conta? Registre-se aqui</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}