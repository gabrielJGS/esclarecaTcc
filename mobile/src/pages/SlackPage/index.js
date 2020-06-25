import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity,Switch,AsyncStorage,Alert,Linking, TextInput } from 'react-native';
import { Feather, Ionicons,SimpleLineIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable'

import styles from './styles'

export default function SlackPage(){
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress ={ ( ) => navigation.goBack()}>
                    <Ionicons name="md-arrow-back" size={24} color="#FFC300"></Ionicons>
                </TouchableOpacity>
                <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center'}}>
                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20, marginRight:5 }}>C#</Text>
                    <Feather name="slack" size={18} color="#FFC300" style={{marginTop:2}} />
                </View>
            </View>

            <View style={styles.Body}>
                <View style={styles.BodyFlat}>
                    <View style={styles.noOwner}>
                        <Animatable.View
                            style={styles.post}
                            animation="fadeInDown"
                            duration={1000}
                        >
                            <View style={styles.postHeader}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={styles.postTitulo}>
                                        <Feather name="camera" size={30} color='#D8D9DB'></Feather>
                                        <Text style={styles.postTitle}>Reidner</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={styles.Nomepost}>Hoje</Text>
                                        {true  ?
                                            <>
                                                <TouchableOpacity onPress={() =>
                                                Alert.alert(
                                                    'Excluir',
                                                    'Deseja excluir sua mensagem?',
                                                    [
                                                    { text: 'Não', onPress: () => { return null } },
                                                    {
                                                        text: 'Sim', onPress: () => {}
                                                    },
                                                    ],
                                                    { cancelable: false }
                                                )}
                                                style={{ flexDirection: 'row', alignItems:'center', justifyContent:'center', marginLeft:10 }}
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
                                <Text style={styles.postDescricao}>Oi galera</Text>
                            </View>
                        </Animatable.View>
                    </View>
                    <View style={styles.Owner}>
                        <Animatable.View
                            style={styles.post}
                            animation="fadeInDown"
                            duration={1000}
                        >
                            <View style={styles.postHeader}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={styles.postTitulo}>
                                        <Feather name="camera" size={30} color='#D8D9DB'></Feather>
                                        <Text style={styles.postTitle}>Eu</Text>
                                    </View>
                                    <Text style={styles.Nomepost}>Hoje</Text>
                                </View>
                            </View>
                            <View style={styles.postDesc}>
                                <Text style={styles.postDescricao}>OI</Text>
                            </View>
                        </Animatable.View>
                    </View>
                </View>
            </View>

            <Animatable.View
                    style={styles.footer}
                    animation="fadeInUp"
                    duration={900}>
                    <TextInput
                        //value={commentText}
                        //onChangeText={setCommentText}
                        placeholder="Escreva uma resposta..."
                        placeholderTextColor="#365478"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        multiline
                        numberOfLines={10}
                        style={styles.InputT}
                    />
                    <TouchableOpacity onPress={() => {}}>
                        <Feather name="send" size={20} color='#FFC300'></Feather>
                    </TouchableOpacity>
                </Animatable.View>
        </View>
    )
}