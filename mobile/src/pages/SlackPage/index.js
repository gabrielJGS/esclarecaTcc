import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, AsyncStorage, Alert, TextInput, FlatList, ActivityIndicator, Image } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'

import { showError, showSucess } from '../../common'
import api from '../../services/api'

import styles from './styles'

export default function SlackPage({ route, navigation }) {
    const [user, setUser] = useState(null)
    const [slack, setSlack] = useState(route.params.slack)
    const [messages, setMessages] = useState()
    const [messageText, setMessageText] = useState('')

    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        reloadMessages()
        loadUser()
        async function loadUser() {
            setUser(await AsyncStorage.getItem('user'))
        }
    }, [])

    function navigateToProfile(userId) {
        navigation.navigate('Profile', {
            userId
        })
    }
    
    async function handlePostMessage() {
        if (messageText.trim() !== '') {
            try {
                const user_id = await AsyncStorage.getItem('user');
                const response = await api.post(`/slacks/${slack._id}`, {
                    slack_msg: messageText,
                }, {
                    headers: { user_id },
                })

                if (response.status == 204) {
                    showSucess("Comentário cadastrado com sucesso")
                    setMessageText('')
                    await reloadMessages()
                } else {
                    showError("Ocorreu um erro")
                }
            }
            catch (e) {
                showError(e)
            }
        }
    }

    async function loadMessages() {
        if (loading) {//Impede que uma busca aconteça enquanto uma requisição já foi feita
            return
        }

        if (total > 0 && messages.length == total) {//Impede que faça a requisição caso a qtd máxima já tenha sido atingida
            return
        }

        setLoading(true)//Altera para o loading iniciado
        try {
            const user_id = await AsyncStorage.getItem('user');
            const response = await api.get(`/slacks/${slack._id}`,
                {
                    headers: { user_id },
                    params: { page }
                })

            setMessages([...messages, ...response.data])
            if (response.data.length > 0) {
                setPage(page + 1)
                setTotal(response.headers['x-total-count'])
            }
        } catch (e) {
            showError(e)
        }
        setLoading(false)//Conclui o load
    }

    async function reloadMessages() {
        if (refreshing) {//Impede que uma busca aconteça enquanto uma requisição já foi feita
            return
        }

        setRefreshing(true)//Altera para o loading iniciado

        try {
            const user_id = await AsyncStorage.getItem('user')
            const response = await api.get(`/slacks/${slack._id}`, {
                headers: { user_id },
                params: { page: 1 }
            })
            setMessages(response.data)
            if (response.status == 200) {
                setPage(2)
                setTotal(response.headers['x-total-count'])
            }
        } catch (e) {
            showError(e)
        }
        setRefreshing(false)
    }

    async function handleDeleteMessage(slack_msg) {
        const user_id = await AsyncStorage.getItem('user')//Fazer esse puto entrar no estado
        try {
            const response = await api.delete(`/slacks/${slack._id}/${slack_msg}`, {
                headers: { user_id }
            })

            if (response.status == 204) {
                await reloadMessages()
            }
        } catch (e) {
            showError(e)
        }

    }

    renderFooter = () => {
        if (!loading || !refreshing) return null;
        return (
            <View style={styles.loading}>
                <ActivityIndicator />
            </View>
        );
    };

    function handleDate(data) {
        var day = new Date(data);
        var today = new Date();
        var d = new String(data);
        let text = new String();

        var horas = Math.abs(day - today) / 36e5;
        var horasArrend = Math.round(horas)

        if (horasArrend > 24) {
            text = "" + d.substring(8, 10) + "/" + d.substring(5, 7) + "/" + d.substring(0, 4)
        }
        else if (horasArrend < 1) {
            text = "Há menos de 1 hora"
        }
        else {
            text = "Há " + horasArrend + " horas atrás"
        }

        return text
    }

    return (
        user == null ? renderFooter :
            < View style={styles.container} >
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="md-arrow-back" size={24} color="#FFC300"></Ionicons>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20, marginRight: 5 }}>{slack.nome + " - " + slack.tag}</Text>
                        <Feather name="slack" size={18} color="#FFC300" style={{ marginTop: 2 }} />
                    </View>
                </View>

                <View style={styles.Body}>
                    <View style={styles.BodyFlat}>
                        <FlatList
                            data={messages}
                            // style={styles.commentsList}
                            keyExtractor={message => String(message._id)}
                            onEndReached={loadMessages}
                            onEndReachedThreshold={0.2}
                            showsVerticalScrollIndicator={false}
                            refreshing={refreshing}
                            onRefresh={reloadMessages}
                            ListFooterComponent={renderFooter}
                            renderItem={({ item: message }) => (
                                <View style={message.user[0]._id == user ? styles.Owner : styles.notOwner}>
                                    <Animatable.View
                                        style={styles.post}
                                        animation="fadeInDown"
                                        duration={1000}
                                    >
                                        <View style={styles.postHeader}>
                                            {message.user[0].url ?
                                                <Image style={styles.avatar} source={{ uri: message.user[0].url ? `${message.user[0].url}?${new Date().getTime()}` : 'https://www.colegiodepadua.com.br/img/user.png' }} />
                                                : <Feather name="camera" size={30} color='#D8D9DB' />}
                                            <TouchableOpacity onPress={() => navigateToProfile(message.user[0]._id)}>
                                                <Text style={styles.postTitle}>{message.user ? message.user[0].name : ''}</Text>
                                            </TouchableOpacity>
                                            <Text style={styles.Nomepost}>{handleDate(message.postedIn)}</Text>
                                            {user != null && (user == slack.user[0]._id || user == message.user[0]._id) ?
                                                <>

                                                    <TouchableOpacity onPress={() =>
                                                        handleDeleteMessage(message._id)
                                                        // Alert.alert(
                                                        //     'Excluir',
                                                        //     'Deseja excluir sua mensagem?',
                                                        //     [
                                                        //         { text: 'Não', onPress: () => { return null } },
                                                        //         {
                                                        //             text: 'Sim', onPress: () => { }
                                                        //         },
                                                        //     ],
                                                        //     { cancelable: false }
                                                        // )
                                                    }
                                                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}
                                                    >
                                                        <Feather name="trash-2" size={15} color='#E73751' />
                                                    </TouchableOpacity>
                                                </>
                                                :
                                                <>
                                                </>
                                            }
                                        </View>
                                        <View style={styles.postDesc}>
                                            <Text style={styles.postDescricao}>{message.message}</Text>
                                        </View>
                                    </Animatable.View>
                                </View>
                            )}>
                        </FlatList>
                    </View>
                </View>

                <Animatable.View
                    style={styles.footer}
                    animation="fadeInUp"
                    duration={900}>
                    <TextInput
                        value={messageText}
                        onChangeText={setMessageText}
                        placeholder="Escreva uma resposta..."
                        placeholderTextColor="#365478"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        multiline
                        numberOfLines={2}
                        style={styles.InputT}
                    />
                    <TouchableOpacity onPress={handlePostMessage}>
                        <Feather name="send" size={20} color='#FFC300'></Feather>
                    </TouchableOpacity>
                </Animatable.View>
            </View >
    )
}