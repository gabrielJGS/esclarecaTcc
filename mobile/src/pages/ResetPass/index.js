import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, KeyboardAvoidingView, AsyncStorage,TextInput} from 'react-native';
import { Feather } from '@expo/vector-icons'

import styles from './styles'
import { showError, showSucess } from '../../common'
import api from '../../services/api'
import { AuthContext } from '../../context'

export default function ResetPass({route,navigation}){
    const [email, setEmail] = useState(route.params.email)
    const [hash,setHash] = useState('');
    const [newPass, setNewPass] = useState('')
    const { singIn } = React.useContext(AuthContext);

    useEffect(() => {
    }, [])

    async function handleResetPass() {
        if(hash && newPass){
            try {
                const response = await api.post('/resetPass', {
                    email, hash, newPass
                });
                if(response.status == 200){
                    const response = await api.post('/signin', {
                        email: email, password: newPass
                    });
                    const login = await response.data;
                    try {
                        await AsyncStorage.setItem('user', login.id.toString());
                        await AsyncStorage.setItem('userName', login.name.toString());
                        await AsyncStorage.setItem('userTags', login.tags.toString());
                        showSucess(`Senha alterada com sucesso!`)
                        singIn();
                    } catch (x) {
                        showError(x)
                    }
                }
                else{

                }
            } catch (e) {
                showError("Código inválido, tente novamente.")
            }
        }
        else {
            showError("Digite os campos para prosseguir.")
        }
    }

    return(
        <KeyboardAvoidingView behavior="" style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress ={() => navigation.goBack()}>
                    <Feather name="chevron-left" size={20} color="#FFC300"></Feather>
                </TouchableOpacity>
                <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center'}}>
                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20, marginRight:5 }}>Esqueci a senha</Text>
                </View>
            </View>
            <View style={styles.forms}>
                <Text style={styles.label1}>Digite o código enviado no email:</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={hash}
                    onChangeText={setHash}
                    returnKeyType = { "next" }
                    onSubmitEditing={() => { this.secondTextInput.focus(); }}
                    blurOnSubmit={false}
                />
                <Text style={styles.label2}>Digite a nova senha:</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#999"
                    secureTextEntry={true}
                    password={true}
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={newPass}
                    onChangeText={setNewPass}
                    returnKeyType="done"
                    onSubmitEditing={() => { handleResetPass() }}
                    blurOnSubmit={false}
                    ref={(input) => { this.secondTextInput = input; }}
                />
                <TouchableOpacity style={{flexDirection:'row', alignItems:'center', justifyContent: 'space-between'}} onPress ={handleResetPass}>
                    <Text style={styles.label}>Salvar</Text>
                    <Feather name="chevron-right" size={20} style={{top:1,left:2}} color="#FFC300"></Feather>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}