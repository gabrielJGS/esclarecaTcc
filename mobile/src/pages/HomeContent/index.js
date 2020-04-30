import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import { FlatList, View, Text, TouchableOpacity, AsyncStorage, StatusBar, BackHandler } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons'

import api from '../../services/api'
import * as Animatable from 'react-native-animatable'

import styles from './styles'

export default function HomeContent() {
    const navigation = useNavigation()

    function navigateToHome() {
        navigation.navigate('Home')
    }

    return (
        //reidner 29/04
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent={false} backgroundColor={'#365478'} />
            <View style={styles.header}>
                <TouchableOpacity style={styles.detailsButton}>
                    <Text style={styles.detailsButtonText}>Sair </Text>
                    <Feather name="log-out" size={16} color="#FFC300"></Feather>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{fontWeight:'bold', color:"white", fontSize:25}}>Conteúdos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.detailsButton}>
                        <Text style={styles.detailsButtonText}>Novo </Text>
                        <Feather name="plus" size={16} color="#FFC300"></Feather>
                </TouchableOpacity>
            </View>
            <View>
                <FlatList>
                    {/*<View style={styles.post}>
                        <Text style={styles.postTitle}>{post.titulo}</Text>
                        <Text style={styles.postTag}>{post.tag}</Text>
                        <Text style={styles.postDescricao}>{post.descricao}</Text>
                    </View>*/}
                </FlatList>
            </View>
            <Animatable.View 
            style={styles.footer}
            animation="fadeInUpBig"
            duration={1000}>
                <TouchableOpacity style={styles.detailsBar} onPress={() => navigateToHome()}>
                    <Text style={styles.detailsButtonText}>Dúvidas </Text>
                    <Feather name="edit-3" size={16} color="white"></Feather>
                </TouchableOpacity>
                <TouchableOpacity style={styles.detailsBar} onPress={() => loadPosts()}>
                    <Text style={styles.detailsButtonTextHome}>Conteúdos </Text>
                    <Feather name="book-open" size={16} color="#FFC300"></Feather>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}