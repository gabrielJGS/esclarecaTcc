import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native'
import { FlatList, View, Text, TouchableOpacity, AsyncStorage, StatusBar, BackHandler, TextInput } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons'

import api from '../../services/api'

import styles from './styles'
import * as Animatable from 'react-native-animatable'

export default function ContentPage() {
    const navigation = useNavigation()

    function navigateToHome() {
        navigation.navigate('HomeContent')
    }

    return (
        //reidner 26/04
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent={false} backgroundColor={'#365478'} />
            <View style={styles.headerPost}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.detailsButton} onPress ={ ( ) => navigateToHome()}>
                        <Feather name="arrow-left" size={20} color="#FFC300"></Feather>
                    </TouchableOpacity>
                    <Text style={styles.DuvidaTitle}>Dúvida C#</Text>
                    <Text></Text>
                </View>
                <View style={styles.DuvidaCorpo}>
                    <Feather name="camera" size={30} color='white'></Feather>
                    <View style={{paddingLeft:30}}>
                        <Text style={styles.CorpoTitle}>Reidner Rocha</Text>
                        <Text style={styles.Nomepost}>Tags</Text>
                        <Text style={{marginTop:10, fontSize:15, color:'white'}}>DÚVIDAS</Text>
                        
                        <View style={{flexDirection:'row', paddingTop:20, alignItems:'flex-end'}}>
                            <Text style={{color:'white',fontSize:15, fontWeight:'bold'}}>Anexos</Text>
                            <View style={{paddingLeft:10}}>
                                <Feather name="file" size={20} color='#FFC300'></Feather>
                            </View>
                            <View style={{paddingLeft:10}}>
                                <Feather name="file" size={20} color='#FFC300'></Feather>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{marginLeft:32, paddingBottom:8, flexDirection:'row', alignItems:'center'}}>
                    <TouchableOpacity>
                        <FontAwesome name="heart-o" style={{color:'#FFC300', fontSize:12}} />
                    </TouchableOpacity>
                    <Text style={{marginLeft:3,fontSize:12,color:'#C8C8C8'}}>15</Text>
                </View>
            </View>

            <View style={styles.Body}>
                <View style={styles.BodyFlat}>
                    <Animatable.View 
                    style={styles.post}
                    animation="fadeInDown"
                    duration={1000}>
                        <View style={styles.postHeader}>
                            <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
                                <View style={styles.postTitulo}>
                                    <Feather name="camera" size={30} color='#D8D9DB'></Feather>
                                    <Text style={styles.postTitle}>Reidner</Text>
                                </View>
                                <Text style={styles.Nomepost}>Há 5 horas</Text>
                            </View>
                        </View>
                        <View style={styles.postDesc}>
                            <Text style={styles.postDescricao}>HAUHAUHA</Text>
                        </View>
                        <View style={{marginLeft:25, paddingBottom:5, flexDirection:'row', alignItems:'center'}}>
                            <TouchableOpacity>
                                <FontAwesome name="heart-o" style={{color:'red', fontSize:12}} />
                            </TouchableOpacity>
                            <Text style={{marginLeft:3,fontSize:12,color:'gray'}}>15</Text>
                        </View>
                    </Animatable.View>

                    <Animatable.View 
                    style={styles.post}
                    animation="fadeInDown"
                    duration={1000}>
                        <View style={styles.postHeader}>
                            <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
                                <View style={styles.postTitulo}>
                                    <Feather name="camera" size={30} color='#D8D9DB'></Feather>
                                    <Text style={styles.postTitle}>Reidner</Text>
                                </View>
                                <Text style={styles.Nomepost}>Há 5 horas</Text>
                            </View>
                        </View>
                        <View style={styles.postDesc}>
                            <Text style={styles.postDescricao}>HAUHAUHA</Text>
                        </View>
                        <View style={{marginLeft:25, paddingBottom:5, flexDirection:'row', alignItems:'center'}}>
                            <TouchableOpacity>
                                <FontAwesome name="heart-o" style={{color:'red', fontSize:12}} />
                            </TouchableOpacity>
                            <Text style={{marginLeft:3,fontSize:12,color:'gray'}}>15</Text>
                        </View>
                    </Animatable.View>

                    <Animatable.View 
                    style={styles.post}
                    animation="fadeInDown"
                    duration={1000}>
                        <View style={styles.postHeader}>
                            <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
                                <View style={styles.postTitulo}>
                                    <Feather name="camera" size={30} color='#D8D9DB'></Feather>
                                    <Text style={styles.postTitle}>Reidner</Text>
                                </View>
                                <Text style={styles.Nomepost}>Há 5 horas</Text>
                            </View>
                        </View>
                        <View style={styles.postDesc}>
                            <Text style={styles.postDescricao}>HAUHAUHA</Text>
                        </View>
                        <View style={{marginLeft:25, paddingBottom:5, flexDirection:'row', alignItems:'center'}}>
                            <TouchableOpacity>
                                <FontAwesome name="heart-o" style={{color:'red', fontSize:12}} />
                            </TouchableOpacity>
                            <Text style={{marginLeft:3,fontSize:12,color:'gray'}}>15</Text>
                        </View>
                    </Animatable.View>
                </View>

                <Animatable.View 
                style={styles.footer}
                animation="fadeInUp"
                duration={900}>
                    <TextInput
                        placeholder="Escreva uma resposta..."
                        placeholderTextColor="#FAFAFA"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        multiline={true}
                        numberOfLines={4}
                        style={styles.InputT}
                    />
                    <Feather name="send" size={20} color='#FFC300'></Feather>
                </Animatable.View>
            </View>
        </View>
    );
}