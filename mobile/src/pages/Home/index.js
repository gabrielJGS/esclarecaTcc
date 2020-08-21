import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native'
import { View, Text, TouchableOpacity, AsyncStorage, StatusBar, TextInput, Modal, TouchableWithoutFeedback } from 'react-native';
import { Feather } from '@expo/vector-icons'
import Posts from '../../Components/Posts'
import api from '../../services/api'
import styles from './styles'
import * as Animatable from 'react-native-animatable'

import { showError } from '../../common'

export default function Home() {
    const navigation = useNavigation()

    const [type, setType] = useState(false)
    const [posts, setPosts] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    //Pesquisa
    const [modalVisible, setModalVisible] = useState(false);//Janela de seleção
    const [searchFavorite, setSearchFavorite] = useState(false);
    const [searchSolved, setSearchSolved] = useState('');
    const [searchText, setSearchText] = useState('');

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


    // useEffect(() => {
    //     reload()
    //     async function reload() {
    //         await reloadPosts()
    //     }
    // }, [type])

    useEffect(() => {
        setSearchSolved(false);
        setSearchFavorite(false)
        loadPosts()
    }, [])

    const onLoadMore = useCallback(() => {
        loadPosts();
    })

    function showModal() {
        setModalVisible(!modalVisible)
    }

    async function loadPosts() {
        if (loading) {//Impede que uma busca aconteça enquanto uma requisição já foi feita
            return
        }
        const user_id = await AsyncStorage.getItem('user')//Fazer esse puto entrar no estado
        const getTotal = await api.head('/posts', { headers: { user_id, type, search_text: searchText, searchSolved, searchFavorite } })
        setTotal(getTotal.headers['x-total-count'])
        if (total > 0 && posts.length == total) {//Impede que faça a requisição caso a qtd máxima já tenha sido atingida
            return
        }

        setLoading(true)//Altera para o loading iniciado
        try {
            const response = await api.get('/posts', {
                headers: { user_id, type, search_text: searchText, searchSolved, searchFavorite },
                params: { page }
            })
            console.log(response.data)
            setPosts([...posts, ...response.data])
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
        setRefreshing(true)//Altera para o loading iniciado

        try {
            const response = await api.get('/posts', {
                headers: { user_id, type, search_text: searchText, searchSolved, searchFavorite },
                params: { page: 1 }
            })
            setPosts(response.data)
            if (response.data.length > 0) {
                setPage(2)
            }
        } catch (e) {
            showError(e)
        }
        setRefreshing(false)
    }
    
    return (
        //reidner 26/04
        <View style={styles.container}>

            <View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={showModal}
                >
                    <TouchableWithoutFeedback onPress={showModal}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalBody}>
                                <View style={styles.modalFilter}>
                                    <Text style={styles.filterTitle}>Filtrar Por:</Text>
                                </View>
                                <View style={styles.filterView}>
                                    <View style={styles.filterSub}>
                                        <TouchableOpacity style={styles.filterButton} onPress={() => setSearchFavorite(!searchFavorite)}>
                                            <Text style={[styles.filterText, { color: searchFavorite ? '#FFC300' : '#365478' }]}>Favoritos</Text>
                                            <Feather name="heart" size={12} color="#FFC300"></Feather>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.filterSub}>
                                        <TouchableOpacity style={styles.filterButton} onPress={() => setSearchSolved(!searchSolved)}>
                                            <Text style={[styles.filterText, { color: searchSolved ? '#FFC300' : '#365478' }]}>Esclarecidos </Text>
                                            <Feather name="check-circle" size={12} color="#FFC300"></Feather>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.filterExit}>
                                        <TouchableOpacity style={styles.filterButton} onPress={() => { setSearchSolved(false); setSearchFavorite(false) }}>
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
                <TouchableOpacity style={styles.detailsButton} onPress={showModal}>
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
                    value={searchText}
                    onChangeText={setSearchText}
                    multiline={true}
                    numberOfLines={2}
                    returnKeyType="done"
                />
                <TouchableOpacity onPress={reloadPosts}>
                    <Feather name="search" size={18} color="#FFC300" style={{ marginTop: 2 }} />
                </TouchableOpacity>
            </View>

            <Posts posts={posts} reloadPosts={reloadPosts} refreshing={refreshing} onEndReached={onLoadMore}
                searchSolved={searchSolved} searchFavorite={searchFavorite} loading={loading} navigation={navigation}
            />

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


            <TouchableOpacity style={styles.addButton} onPress={() => navigateToNewPost()}>
                <Animatable.View
                    animation="fadeIn">
                    <Feather name="plus" size={25} color="white"></Feather>
                </Animatable.View>
            </TouchableOpacity>
        </View >
    );
}
