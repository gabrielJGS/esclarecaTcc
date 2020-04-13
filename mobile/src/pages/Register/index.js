import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'

import { Image, View, AsyncStorage, KeyboardAvoidingView, Text, Platform, TextInput, TouchableOpacity, StatusBar } from "react-native";
import api from '../../services/api'

import logo from '../../assets/logo.png'; // Nessa página poderia usar uma logo maior
import styles from './styles'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Register() {
    const navigation = useNavigation()

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [tags, setTags] = useState('');

    //Inserir tratamento para caso tente inserir vazio
    async function handleSubmit() {
        const response = await api.post('/signup', {
            email, nome, senha, tags
        });
        const { id } = response.data;
        await AsyncStorage.setItem('user', id.toString());
        navigation.goBack()
    }
    function handleCancel() {
        navigation.goBack()
    }
    return (
        <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
            <StatusBar barStyle="light-content" translucent={false} backgroundColor={'#365478'}/>
            <View style={styles.header}>
                
                <View style={styles.OvalShapeView} >
                <Animatable.Image
                    animation="bounceIn"
                    duration={1500}
                    source={logo}
                    style={styles.img}
                    resizeMode="stretch"
                />
                </View>
            </View>
            <TouchableOpacity style={styles.circle}>
                <Icon
                    name="camera" size={40}
                    style={styles.images}
                />
            </TouchableOpacity>
            <Animatable.View
            style={styles.form}
            animation="bounceInUp">
                <Text style={styles.label1}>NOME *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Insira seu nome"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={nome}
                    onChangeText={setNome}
                />
                <Text style={styles.label}>E-MAIL *</Text>
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
                <Text style={styles.label}>TAGS *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Seus interesses separados por ' , '"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={tags}
                    onChangeText={setTags}
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Registre-se</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCancel} style={styles.buttonCancel}>
                    <Text style={[styles.buttonText, { color: '#123660' }]}>Voltar</Text>
                </TouchableOpacity>
            </Animatable.View>
        </KeyboardAvoidingView>
    )
}