import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, TouchableOpacity, AsyncStorage, StatusBar, TextInput, ScrollView, ActivityIndicator, Alert, Image } from 'react-native';
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
    const [refreshing, setRefreshing] = useState(false)
    const [userIsPostOwner, setUserIsPostOwner] = useState(false)
    const [post, setPost] = useState(route.params.post)
    const [activeUser, setActiveUser] = useState('')
    const [press, setPress] = useState(false)

    useEffect(() => {
        handleID()
        loadComments()
        async function handleID() {

            const user_id = await AsyncStorage.getItem('user');
            setActiveUser(user_id);
            if (user_id === post.user[0]._id) {
                setUserIsPostOwner(true);
            }
        }
    }, [press])

    // useEffect(() => {
    //     reloadPage()
    // }, [press])

    function navigateToHome() {
        navigation.navigate('Home')
    }

    function navigateToProfile(userId) {
        navigation.navigate('Profile', {
            userId
        })
    }

    async function handlePostComment() {
        if (commentText.trim() == '') {
            showError("Digite um comentário válido")
        } else {
            const user_id = await AsyncStorage.getItem('user');
            try {
                const response = await api.post(`/posts/${post._id}`, {
                    message: commentText,
                }, {
                    headers: { user: user_id },
                })

                if (response.status == 204) {
                    showSucess("Comentário cadastrado com sucesso")
                    setCommentText('')
                    setPress(previousState => !previousState)
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
        const getTotal = await api.head(`/posts/${post._id}`)
        setTotal(getTotal.headers['x-total-count'])
        if (total > 0 && comments.length == total) {//Impede que faça a requisição caso a qtd máxima já tenha sido atingida
            return
        }

        setLoading(true)//Altera para o loading iniciado
        try {
            const user_id = await AsyncStorage.getItem('user');
            const response = await api.get(`/posts/${post._id}`,
                {
                    headers: { user_id },
                    params: { page }
                })
            setComments([...comments, ...response.data])
            if (response.data.length > 0) {
                setPage(page + 1)
            }
        } catch (e) {
            showError(e)
        }
        setLoading(false)//Conclui o load
    }
    async function reloadPost(user_id) {
        try {
            const response = await api.get(`/post/${post._id}`, {
                headers: { user_id }
            })
            setPost(response.data[0])

        } catch (e) {
            console.log(e)
        }

    }
    async function reloadPage() {
        if (refreshing) {//Impede que uma busca aconteça enquanto uma requisição já foi feita
            return
        }
        const user_id = await AsyncStorage.getItem('user');
        await reloadPost(user_id)

        setRefreshing(true)//Altera para o loading iniciado

        try {
            const response = await api.get(`/posts/${post._id}`,
                {
                    headers: { user_id },
                    params: { page: 1 }
                })
            setComments(response.data)
            if (response.data.length > 0) {
                setPage(2)
            }
        } catch (e) {
            showError(e)
        }
        setRefreshing(false)
    }
    async function handleDeletePost() {
        const user_id = await AsyncStorage.getItem('user')//Fazer esse puto entrar no estado
        try {
            const response = await api.delete(`/posts/${post._id}`, {
                headers: { user_id }
            })
            navigateToHome()
        } catch (e) {
            showError(e)
        }
    }

    async function handleLikePost() {
        const user_id = await AsyncStorage.getItem('user')//Fazer esse puto entrar no estado
        try {
            const response = await api.post(`/posts/${post._id}/like`, {
            }, {
                headers: { user_id }
            })
            await reloadPage()
        } catch (e) {
            showError(e)
        }
    }

    async function handleLikeComment(commId) {
        const user_id = await AsyncStorage.getItem('user')//Fazer esse puto entrar no estado
        try {
            const response = await api.post(`/posts/${post._id}/${commId}/like`, {
            }, {
                headers: { user_id }
            })

        } catch (e) {
            showError(e)
        }
        await reloadPage()
    }

    async function handleDeleteComment(commId) {
        const user_id = await AsyncStorage.getItem('user')//Fazer esse puto entrar no estado
        try {
            const response = await api.delete(`/posts/${post._id}/${commId}`, {
                headers: { user_id }
            })

        } catch (e) {
            showError(e)
        }
        await reloadPage()
    }

    async function handleSolvePost(commId) {
        if (userIsPostOwner) {
            const user_id = await AsyncStorage.getItem('user')//Fazer esse puto entrar no estado
            try {
                const response = await api.post(`/posts/${post._id}/${commId}/solve`, {}, {
                    headers: { user_id }
                })
                if (response.status == 200) {
                    showError("Publicação já solucionado por outro comentário")
                }
            } catch (e) {
                showError(e)
            }
            await reloadPage()
        }
    }
    renderFooter = () => {
        if (!loading) return null;
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
        //reidner 26/04
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent={false} backgroundColor={'#365478'} />
            <View style={styles.headerPost}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToHome()}>
                        <Feather name="arrow-left" size={20} color="#FFC300"></Feather>
                    </TouchableOpacity>
                    <Text style={styles.DuvidaTitle}>{post.title}</Text>
                </View>
                <View style={styles.DuvidaCorpo}>
                    <TouchableOpacity onPress={() => navigateToProfile(post.user[0]._id)}>
                        <Image style={styles.avatar} source={{ uri: post.user[0].url ? `${post.user[0].url}?${new Date().getTime()}` : 'https://www.colegiodepadua.com.br/img/user.png' }} />
                    </TouchableOpacity>
                    <View style={{ paddingLeft: 10 }}>
                        <TouchableOpacity onPress={() => navigateToProfile(post.user[0]._id)}>
                            <Text style={styles.CorpoTitle}>{post.user[0].name}</Text>
                            <Text style={styles.Nomepost}>{post.tags.toString()}</Text>
                        </TouchableOpacity>
                        <ScrollView>
                        <Text selectable={true} selectionColor='#FFC300' style={{fontSize: 15, color: 'white', paddingRight: 40, maxHeight:300 }}>{post.desc}</Text>
                        </ScrollView>
                        <View style={{ flexDirection: 'row', paddingTop: 10, alignItems: 'flex-end' }}>
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
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={handleLikePost} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <FontAwesome name={post.didILiked == true ? "heart" : "heart-o"} style={{ color: '#FFC300', fontSize: 15 }} />
                            <Text style={{ marginLeft: 3, fontSize: 12, color: '#C8C8C8' }}>{post.likes.length}</Text>
                        </TouchableOpacity>
                        {userIsPostOwner ?
                            <>
                                <TouchableOpacity onPress={handleDeletePost}
                                    // Alert.alert(
                                    //     'Excluir',
                                    //     'Deseja excluir sua dúvida?',
                                    //     [
                                    //         { text: 'Não', onPress: () => { return null } },
                                    //         {
                                    //             text: 'Sim', onPress: () => { }
                                    //         },
                                    //     ],
                                    //     { cancelable: false }
                                    // )}
                                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}
                                >
                                    <Feather name="trash-2" size={15} color='#E73751'></Feather>
                                </TouchableOpacity>
                            </>
                            :
                            <>
                                <TouchableOpacity onPress={() =>
                                    Alert.alert(
                                        'Reportar',
                                        'Deseja reportar essa dúvida por possuir conteúdo ofensivo ou inapropriado?',
                                        [
                                            { text: 'Não', onPress: () => { return null } },
                                            {
                                                text: 'Sim', onPress: () => { Alert.alert('Equipe Esclareça', 'Obrigado pelo seu feedback!') }
                                            },
                                        ],
                                        { cancelable: false }
                                    )}
                                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}
                                >
                                    <Feather name="alert-octagon" size={15} color='#FF5733'></Feather>
                                </TouchableOpacity>
                            </>
                        }
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {
                            post.solved ?
                                <>
                                    <Text style={{ color: '#7DCEA0', fontWeight: 'bold', paddingRight: 5 }}>Esclarecido</Text>
                                    <Feather name="check-circle" size={20} color='#7DCEA0'></Feather>
                                </>
                                :
                                post.type === false ?
                                    <>
                                        <Text style={{ color: '#E73751', fontWeight: 'bold', paddingRight: 5 }}>Esclarecido</Text>
                                        <Feather name="x-circle" size={20} color='#E73751'></Feather>
                                    </>
                                    : <Text />
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
                        onEndReached={loadComments}
                        onEndReachedThreshold={0.2}
                        showsVerticalScrollIndicator={false}
                        refreshing={refreshing}
                        onRefresh={reloadPage}
                        ListFooterComponent={renderFooter}
                        removeClippedSubviews={false}
                        renderItem={({ item: comment }) => (
                            <Animatable.View
                                style={styles.post}
                                animation="fadeInDown"
                                duration={1000}>
                                <View style={styles.postHeader}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <TouchableOpacity style={styles.postTitulo} onPress={() => navigateToProfile(comment.user[0]._id)}>
                                            <Image style={styles.avatar} source={{ uri: comment.user[0].url ? `${comment.user[0].url}?${new Date().getTime()}` : 'https://www.colegiodepadua.com.br/img/user.png' }} />
                                            <Text style={styles.postTitle}>{comment.user[0].name}</Text>
                                        </TouchableOpacity>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text style={styles.Nomepost}>{handleDate(comment.postedIn)}</Text>
                                            {comment.user[0]._id === activeUser || userIsPostOwner ?
                                                <>
                                                    <TouchableOpacity onPress={() => handleDeleteComment(comment._id)}
                                                        // Alert.alert(
                                                        //     'Excluir',
                                                        //     'Deseja excluir sua Resposta?',
                                                        //     [
                                                        //         { text: 'Não', onPress: () => console.log("teste") },
                                                        //         {
                                                        //             text: 'Sim', onPress: console.log("teste")
                                                        //         },
                                                        //     ],
                                                        //     { cancelable: false }
                                                        // )}
                                                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}
                                                    >
                                                        <Feather name="trash-2" size={15} color='#E73751'></Feather>
                                                    </TouchableOpacity>
                                                </>
                                                :
                                                <>
                                                </>
                                            }
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.postDesc}>
                                    <Text style={styles.postDescricao} selectable={true} selectionColor='#FFC300'>{comment.message}</Text>
                                </View>
                                <View style={{ marginLeft: 25, paddingBottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <TouchableOpacity onPress={() => handleLikeComment(comment._id)}>
                                            <FontAwesome name={comment.didILiked == true ? "heart" : "heart-o"} style={{ color: 'red', fontSize: 12 }} />
                                        </TouchableOpacity>
                                        <Text style={{ marginLeft: 3, fontSize: 12, color: 'gray' }}>{comment.likes.length}</Text>
                                    </View>
                                    {post.type === false && (userIsPostOwner || comment.solvedPost) ?
                                        <>
                                            <TouchableOpacity onPress={() => handleSolvePost(comment._id)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingRight: 15 }}>
                                                <Text style={{ color: '#7DCEA0', fontSize: 12, paddingRight: 2 }}>Esclareceu sua dúvida? </Text>
                                                <Feather name={comment.solvedPost == true ? "check-circle" : "circle"} size={15} color='#7DCEA0'></Feather>
                                            </TouchableOpacity>
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
                        multiline={true}
                        numberOfLines={2}
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
