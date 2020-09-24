import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'

import { Image, View, AsyncStorage, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, StatusBar, ScrollView } from "react-native";
import api from '../../services/api'

import logo from '../../assets/logo.png'; // Nessa página poderia usar uma logo maior
import styles from './styles'
import * as Animatable from 'react-native-animatable'
import { Feather } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import UserPermission from '../../UserPermissions';
import { AuthContext } from '../../context'

import { showError, showSucess } from '../../common'

export default function Register() {
    const navigation = useNavigation()
    const { singIn } = React.useContext(AuthContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [tags, setTags] = useState('');
    //const [file, setFile] = useState(null);
    const [avatar, setAvatar] = useState('https://www.colegiodepadua.com.br/img/user.png');
    //const [isUploadingImage, setIsUploadingImage] = useState(false)
    //const [visible, setVisible] = useState(false);

    //Inserir tratamento para caso tente inserir vazio
    async function handleSubmit() {
        try {
            const response = await api.post('/signup', {
                name, email, password, tags
            })

            if (response.status == 204) {
                showSucess("Usuário cadastrado com sucesso")
                //navigation.goBack()
                try {
                    const response = await api.post('/signin', {
                        email, password: password
                    });
                    const user = response.data;
                    try {
                        await AsyncStorage.setItem('user', user.id.toString());
                        await AsyncStorage.setItem('userName', user.name.toString());
                        await AsyncStorage.setItem('userTags', user.tags.toString());
                        if (avatar != 'https://www.colegiodepadua.com.br/img/user.png') {
                            try {
                                handleSubmitPhoto(user.id)
                            }
                            catch (k) {
                                showError(x)
                            }
                        }
                        singIn();
                    } catch (x) {
                        showError(x)
                    }
                } catch (e) {
                    showError("Error:\n" + e)
                }
            } else {
                showError("Erro")
            }

        } catch (e) {
            showError(e)
        }
    }

    async function handlePickUpdate() {
        UserPermission.getCameraPermission()

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 4]
        })

        if (!result.cancelled) {
            setAvatar(result)
            //setIsUploadingImage(true)
        }
    }

    async function handleSubmitPhoto(idUser) {
        let localUri = avatar.uri;
        let filename = localUri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        try {
            const data = new FormData();
            data.append('file', { uri: localUri, name: filename, type })
            const response = await api.post(`/users/${idUser}/photo`, data)
            if (response.status == 201) {
                //showSucess("Foto alterada com sucesso")
                //setIsUploadingImage(false)
                //await loadUser(userId)
            } else {
                showError(response)
            }
        }
        catch (e) {
            showError(e)
        }
    }

    return (
        <KeyboardAvoidingView behavior="" style={styles.container}>
            <StatusBar barStyle="light-content" translucent={false} backgroundColor={'#365478'} />
            <View style={styles.header}>
                <TouchableOpacity onPress ={() => navigation.goBack()}>
                    <Feather name="chevron-left" size={20} color="#FFC300"></Feather>
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20, marginRight:5 }}>Registre-se</Text>
            </View>
            <View style={styles.forms}>
                <TouchableOpacity style={styles.circle} onPress={() => handlePickUpdate()}>
                    <Image style={{ width: 120, height: 120, borderRadius: 120 / 2, borderWidth: 3, borderColor: "#FFF" }}
                        source={{ uri: avatar == 'https://www.colegiodepadua.com.br/img/user.png' ? avatar : avatar.uri }} />
                </TouchableOpacity>
            
                <ScrollView style={{top:20}}>
                    <Animatable.View
                        style={styles.form}
                        animation="fadeIn">
                        <Text style={styles.label1}>Nome</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Insira seu nome"
                            placeholderTextColor="#999"
                            autoCapitalize="words"
                            autoCorrect={false}
                            value={name}
                            onChangeText={setName}
                            returnKeyType="done"
                        />
                        <Text style={styles.label}>E-mail</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Seu e-mail"
                            placeholderTextColor="#999"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={email}
                            onChangeText={setEmail}
                            returnKeyType="done"
                        />
                        <Text style={styles.label}>Senha</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Sua senha"
                            placeholderTextColor="#999"
                            secureTextEntry={true}
                            password={true}
                            autoCapitalize="words"
                            autoCorrect={false}
                            value={password}
                            onChangeText={setPassword}
                            returnKeyType="done"
                        />
                        <Text style={styles.label}>Tags <Text style={{color:'#999', fontSize:12, fontWeight:'normal'}}>(assuntos do seu interesse)</Text></Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Seus interesses separados por ' , '"
                            placeholderTextColor="#999"
                            autoCapitalize="words"
                            autoCorrect={false}
                            value={tags}
                            onChangeText={setTags}
                            returnKeyType="go"
                        />
                        <View style={{alignItems:'center', marginRight:5}}>
                            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                                <Text style={styles.buttonText}>Registrar</Text>
                            </TouchableOpacity>
                        </View>
                    </Animatable.View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    )
}