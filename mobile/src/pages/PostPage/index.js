import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native'
import { FlatList, View, Text, TouchableOpacity, AsyncStorage, StatusBar, BackHandler, TextInput, Switch } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons'

import api from '../../services/api'

import styles from './styles'
import * as Animatable from 'react-native-animatable'

import { showError, showSucess } from '../../common'

export default function PostPage({ route, navigation }) {
    const [commentText, setCommentText] = useState('')
    const [comments, setComments] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [userIsPostOwner, setUserIsPostOwner] = useState(false)

    //switch
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const post = route.params.post

    useEffect(() => {
        loadComments()
    }, [])

    useEffect(() => {
        handleID()
        async function handleID() {
            const user_id = await AsyncStorage.getItem('user');
            if (user_id === post.user._id) {
                setUserIsPostOwner(true);
            }
        }
    }, [])


    function navigateToHome() {
        navigation.navigate('Home')
    }

    async function handlePostComment() {
        if (commentText.trim() == '') {
            showError("Digite um comentário válido")
        } else {
            const user_id = await AsyncStorage.getItem('user');
            try {
                const comm = await api.post(`/posts/${post._id}`, {
                    user: user_id, message: commentText
                })
                if (comm.status == 204) {
                    showSucess("Comentário cadastrado com sucesso")
                    setCommentText('')
                } else {
                    showError("Ocorreu um erro")
                }
            }
            catch (e) {
                showError(e)
            }
        }
    }
    async function loadComments() {
        if (loading) {//Impede que uma busca aconteça enquanto uma requisição já foi feita
            return
        }
        // if (total > 0 && comments.length == total) {//Impede que faça a requisição caso a qtd máxima já tenha sido atingida
        //     return
        // }
        setLoading(true)//Altera para o loading iniciado
        try {
            const response = await api.get(`/posts/${post._id}`)
            //const response = await api.get(`/posts/5ec88a62d7634b14384c66e9`)
            setComments(response.data)
            //setComments([...comments, ...response.data])
            setTotal(response.headers['x-total-count'])
            setPage(page + 1)
        } catch (e) {
            showError(e)
        }
        setLoading(false)//Conclui o load
    }

    return (
        //reidner 26/04
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent={false} backgroundColor={'#365478'} />
            <View style={styles.headerPost}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToHome()}>
                        <Feather name="arrow-left" size={20} color="#FFC300"></Feather>
                    </TouchableOpacity>
                    <Text style={styles.DuvidaTitle}>{post.title}</Text>
                    <Text></Text>
                </View>
                <View style={styles.DuvidaCorpo}>
                    <Feather name="camera" size={30} color='white'></Feather>
                    <View style={{ paddingLeft: 30 }}>
                        <Text style={styles.CorpoTitle}>{post.user.name}</Text>
                        <Text style={styles.Nomepost}>{post.tags.toString()}</Text>
                        <Text style={{ marginTop: 10, fontSize: 15, color: 'white' }}>{post.desc}</Text>

                        <View style={{ flexDirection: 'row', paddingTop: 20, alignItems: 'flex-end' }}>
                            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Anexos</Text>
                            <View style={{ paddingLeft: 10 }}>
                                <Feather name="file" size={20} color='#FFC300'></Feather>
                            </View>
                            <View style={{ paddingLeft: 10 }}>
                                <Feather name="file" size={20} color='#FFC300'></Feather>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 32, paddingBottom: 8 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity>
                            <FontAwesome name="heart-o" style={{ color: '#FFC300', fontSize: 12 }} />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 3, fontSize: 12, color: '#C8C8C8' }}>15</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {post.close ?
                            <>
                                <Text style={{ color: '#7DCEA0', fontWeight: 'bold', paddingRight: 5 }}>Esclarecido</Text>
                                <Feather name="check-circle" size={20} color='#7DCEA0'></Feather>
                            </>
                            :
                            <>
                                <Text style={{ color: '#E73751', fontWeight: 'bold', paddingRight: 5 }}>Esclarecido</Text>
                                <Feather name="x-circle" size={20} color='#E73751'></Feather>
                            </>
                        }
                    </View>
                </View>
            </View>

            <View style={styles.Body}>
                <View style={styles.BodyFlat}>
                    <FlatList
                        data={comments}
                        // style={styles.commentsList}
                        keyExtractor={comment => String(comment._id)}
                        onTouchStart={loadComments}
                        onEndReached={loadComments}
                        onEndReachedThreshold={0.2}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item: comment }) => (
                            <Animatable.View
                                style={styles.post}
                                animation="fadeInDown"
                                duration={1000}>
                                <View style={styles.postHeader}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <View style={styles.postTitulo}>
                                            <Feather name="camera" size={30} color='#D8D9DB'></Feather>
                                            <Text style={styles.postTitle}>{comment.user.name}</Text>
                                        </View>
                                        <Text style={styles.Nomepost}>Há 5 horas</Text>
                                    </View>
                                </View>
                                <View style={styles.postDesc}>
                                    <Text style={styles.postDescricao}>{comment.message}</Text>
                                </View>
                                <View style={{ marginLeft: 25, paddingBottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <TouchableOpacity>
                                            <FontAwesome name="heart-o" style={{ color: 'red', fontSize: 12 }} />
                                        </TouchableOpacity>
                                        <Text style={{ marginLeft: 3, fontSize: 12, color: 'gray' }}>15</Text>
                                    </View>
                                    {userIsPostOwner ?
                                        <>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingRight: 10 }}>
                                                <Text style={{ color: '#7DCEA0', fontSize: 12, paddingRight: 2 }}>Esclarecido</Text>
                                                <Switch
                                                    trackColor={{ false: "#D8D9DB", true: "#7DCEA0" }}
                                                    thumbColor={isEnabled ? "#7DCEA0" : "#f4f3f4"}
                                                    ios_backgroundColor="#3e3e3e"
                                                    onValueChange={toggleSwitch}
                                                    value={isEnabled}
                                                />
                                            </View>
                                        </>
                                        :
                                        <>
                                        </>
                                    }
                                </View>
                            </Animatable.View>
                        )}>
                    </FlatList>
                </View>

                <Animatable.View
                    style={styles.footer}
                    animation="fadeInUp"
                    duration={900}>
                    <TextInput
                        value={commentText}
                        onChangeText={setCommentText}
                        placeholder="Escreva uma resposta..."
                        placeholderTextColor="#365478"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        multiline
                        numberOfLines={10}
                        style={styles.InputT}
                    />
                    <TouchableOpacity onPress={handlePostComment}>
                        <Feather name="send" size={20} color='#FFC300'></Feather>
                    </TouchableOpacity>
                </Animatable.View>
            </View>
        </View>
    );
}
