import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity,ScrollView,AsyncStorage,Alert,Modal,TouchableWithoutFeedback,TextInput } from 'react-native';
import { Feather, Ionicons,SimpleLineIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable'

import styles from './styles'

export default function HomeSlack(){
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    function handleModal() {
        setModalVisible(!modalVisible)
    }

    function navigateToSlackPage() {
        navigation.navigate('SlackPage')
    }

    return(
        <View style={styles.container}>
            <View style={styles.modalView}>
                <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleModal}
                >
                <TouchableWithoutFeedback onPress={handleModal}>
                    <View style={styles.modalContent}>
                    <View style={styles.modalBody}>
                        <ScrollView>
                        <View style={styles.indicator} />

                        <View style={styles.modalPerfil}>
                            <Text style={styles.perfilTitle}>Criar Slack  </Text>
                            <Feather name="plus-circle" size={17} color="#365478"></Feather>
                        </View>
                        <View style={styles.viewInput}>
                            <Text style={styles.modalSubtitle}>Nome</Text>
                            <TextInput
                            style={styles.input}
                            placeholder="Indique o nome da slack..."
                            placeholderTextColor="#999"
                            autoCapitalize="words"
                            autoCorrect={false}
                            //value={title}
                            //onChangeText={setTitle}
                            numberOfLines={2}
                            returnKeyType="done"
                            />
                        </View>
                        <View style={styles.buttonView}>
                            <TouchableOpacity onPress={handleModal} style={styles.button}>
                            <Text style={styles.buttonText}>Salvar</Text>
                            <Feather name="check" size={15} color="#FFC300"></Feather>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleModal} style={styles.button}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                            <Feather name="x-circle" size={15} color="#FFC300"></Feather>
                            </TouchableOpacity>
                        </View>
                        </ScrollView>
                    </View>
                    </View>
                </TouchableWithoutFeedback>
                </Modal>
            </View>

            <View style={styles.header}>
                <TouchableOpacity onPress ={() => navigation.openDrawer()}>
                    <Feather name="menu" size={20} color="#FFC300"></Feather>
                </TouchableOpacity>
                <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center'}}>
                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20, marginRight:5 }}>Slack</Text>
                    <Feather name="slack" size={18} color="#FFC300" style={{marginTop:2}} />
                </View>
            </View>

            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:32, paddingVertical:10}}>
                <TextInput
                    style={styles.input}
                    placeholder="Indique o nome da slack..."
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

            <Animatable.View
                style={styles.post}
                animation="fadeInDown"
                duration={1000}
            >
                <View style={styles.postHeader}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={styles.postTitulo}>
                            <Text style={styles.postTitle}>SLACK 1</Text>
                        </View>
                        
                    </View>
                    <View style={styles.headerTags}>
                        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <Text style={styles.Nomepost}>NOME</Text>
                            <Text style={styles.Nomepost}>Data</Text>
                            {true  ?
                                <>
                                    <TouchableOpacity onPress={() =>
                                    Alert.alert(
                                        'Excluir',
                                        'Deseja excluir sua slack?',
                                        [
                                        { text: 'Não', onPress: () => { return null } },
                                        {
                                            text: 'Sim', onPress: () => {}
                                        },
                                        ],
                                        { cancelable: false }
                                    )}
                                    style={{ flexDirection: 'row', alignItems:'center', justifyContent:'center' }}
                                    >
                                        <Feather name="trash-2" size={15} color='#E73751'></Feather>
                                    </TouchableOpacity>
                                </>
                            :
                                <>
                                </>
                            }
                        </View>
                        <TouchableOpacity style={styles.Ver} onPress={navigateToSlackPage}>
                            <Feather name="chevron-right" size={25} color='#FFC300'></Feather>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animatable.View>

            <TouchableOpacity style={styles.addButton} onPress={handleModal}>
                <Animatable.View
                    animation="fadeIn">
                    <Feather name="plus" size={25} color="white"></Feather>
                </Animatable.View>
            </TouchableOpacity>
        </View>
    )
}