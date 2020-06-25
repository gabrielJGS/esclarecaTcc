import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import { FlatList, View, Text, TouchableOpacity, AsyncStorage, StatusBar, BackHandler,TextInput } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons'

import api from '../../services/api'
import * as Animatable from 'react-native-animatable'
import { SearchBar } from 'react-native-elements'

import styles from './styles'

export default function HomeContent() {
    const navigation = useNavigation()

    function navigateToHome() {
        navigation.navigate('Home')
    }
    function navigateToNewContent() {
        navigation.navigate('NewContent')
    }
    function navigateToProfile() {
        navigation.navigate('Profile')
    }

    return (
        //reidner 29/04
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent={false} backgroundColor={'#365478'} />
            <View style={styles.header}>
                <TouchableOpacity style={styles.detailsButton} onPress ={ ( ) => navigation.openDrawer()}>
                    <Feather name="menu" size={20} color="#FFC300"></Feather>
                </TouchableOpacity>
                <Text style={{fontWeight:'bold', color:"white", fontSize:25}}>Conteúdos</Text>
                <TouchableOpacity style={styles.detailsButton}>
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
                    <Feather name="search" size={18} color="#FFC300" style={{marginTop:2}} />
                </TouchableOpacity>
            </View>

            <View style={styles.Body}>
                <View style={styles.BodyFlat}>
                    <FlatList>
                        {/*<Animatable.View 
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
                                        <TouchableOpacity style={styles.Ver} onPress={() => navigateToPost()}>
                                            <Feather name="chevron-right" size={25} color='#FFC300'></Feather>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.postDesc}>
                                    <Text style={styles.postDescricao}>{post.descricao}</Text>
                                </View>
                                <View style={{paddingHorizontal:25, paddingBottom:5, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                                    <View style={{flexDirection:'row', alignItems:'center'}}>
                                        <TouchableOpacity  style={{flexDirection:'row', alignItems:'center'}}>
                                            <FontAwesome name="heart-o" style={{color:'red', fontSize:12}} />
                                            <Text style={{marginLeft:3,fontSize:12,color:'gray'}}>15</Text>
                                        </TouchableOpacity>
                                        <FontAwesome name="commenting-o" style={{color:'#D8D9DB', fontSize:12,marginLeft:15}} />
                                        <Text style={{marginLeft:3,fontSize:12,color:'gray'}}>20</Text>
                                    </View>
                                    <View style={{flexDirection:'row', alignItems:'center'}}>
                                        <Text style={{fontSize:13,color:'#117A65',fontWeight:'800'}}>Dúvida finalizada</Text>
                                        <Feather name="check-circle" size={15} color='#117A65' style={{marginLeft:5}}></Feather>
                                    </View>
                                </View>
                            </Animatable.View>*/}
                    </FlatList>
                </View>

                <Animatable.View 
                style={styles.footer}
                animation="fadeInUp"
                duration={900}>
                    <TouchableOpacity style={styles.detailsBar} onPress={() => navigateToHome()}>
                        <Text style={styles.detailsButtonText}>Dúvidas</Text>
                        <Feather name="edit-3" size={16} color="white"></Feather>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.detailsBar} onPress={() => loadPosts()}>
                        <Text style={styles.detailsButtonTextHome}>Conteúdos</Text>
                        <Feather name="book-open" size={16} color="#FFC300"></Feather>
                    </TouchableOpacity>
                </Animatable.View>
            </View>

            <TouchableOpacity style={styles.addButton} onPress={() => navigateToNewContent()}>
                <Animatable.View 
                animation="fadeIn">
                    <Feather name="plus" size={25} color="white"></Feather>
                </Animatable.View>
            </TouchableOpacity>
        </View>
    );
}