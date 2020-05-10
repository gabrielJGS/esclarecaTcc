import React, { Component, useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native'
import { FlatList, View, Text, TouchableOpacity, AsyncStorage, StatusBar, BackHandler } from 'react-native';
import { Feather, Ionicons,FontAwesome } from '@expo/vector-icons'
import {Icon,Button} from 'native-base'

import api from '../../services/api'

import logoImg from '../../assets/logo.png'
import styles from './styles'
import * as Animatable from 'react-native-animatable'
import { SearchBar } from 'react-native-elements'

export default function Home() {
    const navigation = useNavigation()
    const [posts, setPosts] = useState([])  
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    function navigateToNewPost() {
        navigation.navigate('NewPost')
    }
    function navigateToContent() {
        navigation.navigate('HomeContent')
    }
    function navigateToProfile() {
        navigation.navigate('Profile')
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
    }

    useEffect(() => {
        loadPosts()
    }, [])
    
    const onLoadMore = useCallback(() => {
        loadPosts();
      })

    return (
        //reidner 26/04
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent={false} backgroundColor={'#365478'} />
            <View style={styles.header}>
                <TouchableOpacity style={styles.detailsButton} onPress ={ ( ) => navigation.openDrawer()}>
                    <Feather name="menu" size={20} color="#FFC300"></Feather>
                </TouchableOpacity>
                <Text style={{fontWeight:'bold', color:"white", fontSize:25}}>Dúvidas</Text>
                <Text></Text>
            </View>

            <View style={styles.Search}>
                <SearchBar
                    round
                    platform="ios"
                    cancelButtonTitle="Cancelar"
                    placeholder='Pesquise o assunto de interesse...'
                    containerStyle={styles.Barheight}
                    inputStyle={{fontSize:15}}
                />
            </View>

            <View style={styles.Body}>
                <View style={styles.BodyFlat}>
                    <FlatList
                        data={posts}
                        style={styles.postsList}
                        keyExtractor={post => String(post.id)}
                        onTouchStart={loadPosts}
                        onEndReached={loadPosts}
                        onEndReachedThreshold={0.2}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item: post }) => (
                            <Animatable.View 
                            style={styles.post}
                            animation="fadeInDown"
                            duration={1000}>
                                <View style={styles.postHeader}>
                                    <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
                                        <View style={styles.postTitulo}>
                                            <Feather name="camera" size={30} color='#D8D9DB'></Feather>
                                            <Text style={styles.postTitle}>{post.titulo}</Text>
                                        </View>
                                        <Text style={styles.Nomepost}>Usuário Teste</Text>
                                    </View>
                                    <View style={styles.headerTags}>
                                        <Text style={styles.postTag}>{post.tag}</Text>
                                        <TouchableOpacity style={styles.Ver}>
                                            <Feather name="chevron-right" size={25} color='#FFC300'></Feather>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.postDesc}>
                                    <Text style={styles.postDescricao}>{post.descricao}</Text>
                                </View>
                                <View style={{marginLeft:25, paddingBottom:5, flexDirection:'row', alignItems:'center'}}>
                                    <TouchableOpacity>
                                        <FontAwesome name="heart-o" style={{color:'red', fontSize:12}} />
                                    </TouchableOpacity>
                                    <Text style={{marginLeft:3,fontSize:12,color:'gray'}}>15</Text>
                                    <FontAwesome name="commenting-o" style={{color:'#D8D9DB', fontSize:12,marginLeft:15}} />
                                    <Text style={{marginLeft:3,fontSize:12,color:'gray'}}>20</Text>
                                </View>
                            </Animatable.View>
                        )}>
                    </FlatList>
                </View>

                <Animatable.View 
                style={styles.footer}
                animation="fadeInUp"
                duration={900}>
                    <TouchableOpacity style={styles.detailsBar} onPress={() => loadPosts()}>
                        <Text style={styles.detailsButtonTextHome}>Dúvidas</Text>
                        <Feather name="edit-3" size={16} color="#FFC300"></Feather>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.detailsBar} onPress={() => navigateToContent()}>
                        <Text style={styles.detailsButtonText}>Conteúdos</Text>
                        <Feather name="book-open" size={16} color="white"></Feather>
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
