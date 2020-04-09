import React, { Component, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import { FlatList, View, Text, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { Feather } from '@expo/vector-icons'

import api from '../../services/api'

import logoImg from '../../assets/logo.png'
import styles from './styles'

export default function Home() {
    const navigation = useNavigation()
    const [posts, setPosts] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    function navigateToNewPost() {
        navigation.navigate('NewPost')
    }
    function logoutUser() {
        AsyncStorage.clear()
        navigation.goBack()
    }
    async function loadPosts() {
        const user_id = await AsyncStorage.getItem('user')//Fazer esse puto entrar no estado
        if (loading) {//Impede que uma busca aconteça enquanto uma requisição já foi feita
            return
        }
        // if (total > 0 && posts.length == total) {//Impede que faça a requisição caso a qtd máxima já tenha sido atingida
        //     return
        // }
        setLoading(true)//Altera para o loading iniciado
        const response = await api.get('posts', {
            headers: { user_id },
            params: { page }
        })
        //setPosts(response.data)
        setPosts([...posts, ...response.data])
        setTotal(response.headers['x-total-count'])
        setPage(page + 1)
        setLoading(false)//Conclui o load
        console.log('requisicao')
    }

    useEffect(() => {
        loadPosts()
    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}></Image>
                <View style={{ flexDirection: 'column' }}>
                    <TouchableOpacity style={[styles.detailsButton, { marginBottom: 25 }]} onPress={() => logoutUser()}>
                        <Text style={styles.detailsButtonText}>Sair </Text>
                        <Feather name="log-out" size={16} color="#fdee00"></Feather>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToNewPost()}>
                        <Text style={styles.detailsButtonText}>Novo post </Text>
                        <Feather name="plus" size={16} color="#fdee00"></Feather>
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={posts}
                style={styles.postsList}
                keyExtractor={post => String(post.id)}
                onTouchStart={loadPosts}
                onEndReached={loadPosts}
                onEndReachedThreshold={0.2}
                renderItem={({ item: post }) => (
                    <View style={styles.post}>
                        <Text style={styles.postTitle}>{post.titulo}</Text>
                        <Text style={styles.postTag}>{post.tag}</Text>
                        <Text style={styles.postDescricao}>{post.descricao}</Text>
                    </View>
                )}>
            </FlatList>
        </View>
    );
}
