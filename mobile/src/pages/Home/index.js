import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native'
import { FlatList, View, Text, TouchableOpacity, AsyncStorage, StatusBar, TextInput, ActivityIndicator, Modal, TouchableWithoutFeedback } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons'

//import { Icon, Button } from 'native-base'

import api from '../../services/api'

import styles from './styles'
import * as Animatable from 'react-native-animatable'
//import { SearchBar } from 'react-native-elements'

import { showError } from '../../common'

export default function Home() {
    const navigation = useNavigation()
    const [posts, setPosts] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [search, setSearch] = useState('');
    const [type, setType] = useState(false)

    function navigateToNewPost() {
        navigation.navigate('NewPost', {
            type
        })
    }
    function navigateToDoubts() {
        setType(false)
        reloadPosts()
    }
    function navigateToContent() {
        setType(true)
        reloadPosts()
    }
    function navigateToPost(post) {
        navigation.navigate('PostPage', {
            post
        })
    }
    function navigateToProfile(userId) {
        navigation.navigate('Profile', {
            userId
        })
    }
    async function handleLike(postId) {
        const user_id = await AsyncStorage.getItem('user')//Fazer esse puto entrar no estado
        try {
            const response = await api.post(`/posts/${postId}/like`, {
            }, {
                headers: { user_id }
            })
            await reloadPosts()
        } catch (e) {
            showError(e)
        }
    }
    async function loadPosts() {
        if (loading) {//Impede que uma busca aconteça enquanto uma requisição já foi feita
            return
        }
        const user_id = await AsyncStorage.getItem('user')//Fazer esse puto entrar no estado
        const getTotal = await api.head('/posts', { headers: { user_id, type } })
        setTotal(getTotal.headers['x-total-count'])
        if (total > 0 && posts.length == total) {//Impede que faça a requisição caso a qtd máxima já tenha sido atingida
            return
        }

        setLoading(true)//Altera para o loading iniciado
        try {
            const response = await api.get('/posts', {
                headers: { user_id, type },
                params: { page }
            })
            //setPosts(response.data)
            setPosts([...posts, ...response.data])
            //setTotal(response.headers['x-total-count'])
            if (response.data.length > 0) {
                setPage(page + 1)
            }
        } catch (e) {
            showError(e)
        }
        setLoading(false)//Conclui o load
    }
    async function reloadPosts() {
        if (refreshing) {//Impede que uma busca aconteça enquanto uma requisição já foi feita
            return
        }
        const user_id = await AsyncStorage.getItem('user')//Fazer esse puto entrar no estado
        // const getTotal = await api.head('/posts', { headers: { user_id, type } })
        // setTotal(getTotal.headers['x-total-count'])
        // if (total > 0 && posts.length == total) {//Impede que faça a requisição caso a qtd máxima já tenha sido atingida
        //     return
        // }
        setRefreshing(true)//Altera para o loading iniciado

        try {
            const response = await api.get('/posts', {
                headers: { user_id, type },
                params: { page: 1 }
            })
            //setPosts(response.data)
            setPosts(response.data)
            //setTotal(response.headers['x-total-count'])
            if (response.data.length > 0) {
                setPage(2)
            }
        } catch (e) {
            showError(e)
        }
        setRefreshing(false)
    }

    renderFooter = () => {
        if (!loading) return null;
        return (
            <View style={styles.loading}>
                <ActivityIndicator />
            </View>
        );
    };
    
    useEffect(() => {
        loadPosts()
    }, [])

    useEffect(() => {
        reload()
        async function reload(){
            await reloadPosts()
        }
    }, [type])

    const onLoadMore = useCallback(() => {
        loadPosts();
    })

    const [modalVisible, setModalVisible] = useState(false);
    function handleModal() {
        setModalVisible(!modalVisible)
    }

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

    function handleTitle(title) {
        var titulo = new String(title);
        var tam = new Number(titulo.length)
        let text = new String();

        if (tam > 20) {
            text = titulo.substring(0, 20) + "..."
        }
        else {
            text = titulo
        }

        return text
    }

    return (
        //reidner 26/04
        <View style={styles.container}>

            <View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={handleModal}
                >
                    <TouchableWithoutFeedback onPress={handleModal}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalBody}>
                                <View style={styles.modalFilter}>
                                    <Text style={styles.filterTitle}>Filtrar Por:</Text>
                                </View>
                                <View style={styles.filterView}>
                                    <View style={styles.filterSub}>
                                        <TouchableOpacity style={styles.filterButton}>
                                            <Text style={styles.filterText}>Data</Text>
                                            <Feather name="calendar" size={12} color="#FFC300"></Feather>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.filterSub}>
                                        <TouchableOpacity style={styles.filterButton}>
                                            <Text style={styles.filterText}>Favoritos</Text>
                                            <Feather name="heart" size={12} color="#FFC300"></Feather>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.filterSub}>
                                        <TouchableOpacity style={styles.filterButton}>
                                            <Text style={styles.filterText}>Esclarecidos</Text>
                                            <Feather name="check-circle" size={12} color="#FFC300"></Feather>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.filterExit}>
                                        <TouchableOpacity style={styles.filterButton}>
                                            <Text style={styles.filterText}>Sem filtro </Text>
                                            <Feather name="x-circle" size={12} color="#E73751"></Feather>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>

            <StatusBar barStyle="light-content" translucent={false} backgroundColor={'#365478'} />
            <View style={styles.header}>
                <TouchableOpacity style={styles.detailsButton} onPress={() => navigation.openDrawer()}>
                    <Feather name="menu" size={20} color="#FFC300"></Feather>
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', color: "white", fontSize: 25 }}>{type == false ? 'Dúvidas' : 'Conteúdos'}</Text>
                <TouchableOpacity style={styles.detailsButton} onPress={handleModal}>
                    <Feather name="filter" size={20} color="#FFC300"></Feather>
                </TouchableOpacity>
            </View>

            <View style={styles.Search}>
                <TextInput
                    style={styles.input}
                    placeholder="Pesquise o assunto desejado..."
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    //value={title}
                    //onChangeText={setTitle}
                    numberOfLines={2}
                    returnKeyType="done"
                />
                <TouchableOpacity>
                    <Feather name="search" size={18} color="#FFC300" style={{ marginTop: 2 }} />
                </TouchableOpacity>
            </View>

            <View style={styles.Body}>
                <View style={styles.BodyFlat}>
                    <Text>{loading}</Text>
                    <FlatList
                        data={posts}
                        style={styles.postsList}
                        keyExtractor={post => String(post._id)}
                        refreshing={refreshing}
                        onRefresh={reloadPosts}
                        // onTouchStart={reloadPosts}
                        onEndReached={onLoadMore}
                        onEndReachedThreshold={0.2}
                        ListFooterComponent={renderFooter}
                        showsVerticalScrollIndicator={false}//OBS:Trocar para false ao finalizar testes!!!!
                        renderItem={({ item: post }) => (
                            <Animatable.View
                                style={styles.post}
                                animation="fadeInDown"
                                duration={1000}>
                                <View style={styles.postHeader}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <View style={styles.postTitulo}>
                                            <Feather name="camera" size={30} color='#D8D9DB'></Feather>
                                            <Text style={styles.postTitle}>{handleTitle(post.title)}</Text>
                                        </View>
                                        <View style={{ alignItems: 'flex-end' }}>
                                            <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={() => navigateToProfile(post.user[0]._id)}>
                                                <Text style={styles.Nomepost}>{post.user[0].name}</Text>
                                                <Text style={styles.Nomepost}>{handleDate(post.postedIn)}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={styles.headerTags}>
                                        <Text style={styles.postTag}>{post.tags.toString()}</Text>
                                        <TouchableOpacity style={styles.Ver} onPress={() => navigateToPost(post)}>
                                            <Feather name="chevron-right" size={25} color='#FFC300'></Feather>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.postDesc}>
                                    <Text style={styles.postDescricao}>{post.desc}</Text>
                                </View>
                                <View style={{ paddingHorizontal: 25, paddingBottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => handleLike(post._id)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <FontAwesome name={post.didILiked == true ? "heart" : "heart-o"} style={{ color: 'red', fontSize: 12 }} />
                                            <Text style={{ marginLeft: 3, fontSize: 12, color: 'gray' }}>{post.likes.length}</Text>
                                        </TouchableOpacity>
                                        <FontAwesome name="commenting-o" style={{ color: '#D8D9DB', fontSize: 12, marginLeft: 15 }} />
                                        <Text style={{ marginLeft: 3, fontSize: 12, color: 'gray' }}>{post.commentsCount}</Text>
                                    </View>
                                    {post.closed ? <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 13, color: '#7DCEA0', fontWeight: '800' }}>Dúvida finalizada</Text>
                                        <Feather name="check-circle" size={15} color='#7DCEA0' style={{ marginLeft: 5 }}></Feather>
                                    </View> : null}

                                </View>
                            </Animatable.View>
                        )}>
                    </FlatList>
                </View>

                <Animatable.View
                    style={styles.footer}
                    animation="fadeInUp"
                    duration={900}>
                    <TouchableOpacity style={styles.detailsBar} onPress={navigateToDoubts}>
                        <Text style={[styles.detailsButtonText, { color: type == false ? "#FFC300" : "white" }]}>Dúvidas</Text>
                        <Feather name="edit-3" size={16} color={type == false ? "#FFC300" : "white"}></Feather>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.detailsBar} onPress={navigateToContent}>
                        <Text style={[styles.detailsButtonText, { color: type == true ? "#FFC300" : "white" }]}>Conteúdos</Text>
                        <Feather name="book-open" size={16} color={type == true ? "#FFC300" : "white"}></Feather>
                    </TouchableOpacity>
                </Animatable.View>
            </View>

            <TouchableOpacity style={styles.addButton} onPress={() => navigateToNewPost()}>
                <Animatable.View
                    animation="fadeIn">
                    <Feather name="plus" size={25} color="white"></Feather>
                </Animatable.View>
            </TouchableOpacity>
        </View>
    );
}
