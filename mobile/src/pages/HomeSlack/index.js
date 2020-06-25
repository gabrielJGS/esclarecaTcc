import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity,ScrollView,AsyncStorage,Alert,Modal,TouchableWithoutFeedback,TextInput,Switch } from 'react-native';
import { Feather, Ionicons,SimpleLineIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable'
import Dialog from "react-native-dialog";

import styles from './styles'

export default function HomeSlack(){
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [senha, setSenha] = useState('');
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    function handleModal() {
        setModalVisible(!modalVisible)
    }

    async function handleDialog(){
        setDialogVisible(previousState => !previousState)
        setSenha('');
    }

    function navigateToSlackPage() {
        if(senha === "123"){
            setDialogVisible(previousState => !previousState)
            navigation.navigate('SlackPage')
        }
        else{
            setSenha('');
            Alert.alert(
                'Erro',
                'Senha Incorreta. Digite Novamente',
                [
                  { text: 'OK', onPress: () => { return null } },
                ],
                { cancelable: false }
              )
        }
    }

    return(
        <View style={styles.container}>

            <Dialog.Container visible={dialogVisible}>
                <Dialog.Title>Slack Privada</Dialog.Title>
                <Dialog.Description>
                    Digite a senha para continuar
                </Dialog.Description>
                <Dialog.Input 
                    style={{borderBottomWidth:1, borderBottomColor:'#D8D9DB'}}
                    secureTextEntry={true}
                    password={true}
                    value={senha}
                    onChangeText={setSenha}
                />
                <Dialog.Button label="Entrar" onPress={navigateToSlackPage}/>
                <Dialog.Button label="Cancelar" onPress={handleDialog}/>
            </Dialog.Container>

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
                            <View style={{flexDirection:'row',alignItems:'center', justifyContent:'space-between'}}>
                                <View>
                                    <Text style={styles.modalSubtitle}>É privado?</Text>
                                    <Switch
                                        trackColor={{ false: "#D8D9DB", true: "#7DCEA0" }}
                                        thumbColor={isEnabled ? "#7DCEA0" : "#f4f3f4"}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={toggleSwitch}
                                        value={isEnabled}
                                    />
                                </View>
                                <View style={{flexDirection:'row',alignItems:'center', justifyContent:'space-between'}}>
                                    {isEnabled ?
                                        <>
                                            <Text style={styles.modalSubtitle}>Senha</Text>
                                            <TextInput
                                            style={styles.input}
                                            placeholder="Indique a senha para acesso..."
                                            placeholderTextColor="#999"
                                            autoCapitalize="words"
                                            autoCorrect={false}
                                            //value={title}
                                            //onChangeText={setTitle}
                                            numberOfLines={2}
                                            returnKeyType="done"
                                            />
                                        </>
                                    :
                                        <>
                                        </>
                                    }
                                </View>
                            </View>
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
                            <Feather name="lock" size={12} color="#7DCEA0" style={{marginLeft:5}} />
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
                        <TouchableOpacity style={styles.Ver} onPress={handleDialog}>
                            <Feather name="chevron-right" size={25} color='#FFC300'></Feather>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animatable.View>

            <Animatable.View
                style={styles.post}
                animation="fadeInDown"
                duration={1000}
            >
                <View style={styles.postHeader}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={styles.postTitulo}>
                            <Text style={styles.postTitle}>SLACK 2</Text>
                            <Feather name="unlock" size={12} color="#7DCEA0" style={{marginLeft:5}} />
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
                        <TouchableOpacity style={styles.Ver} onPress={() => navigation.navigate('SlackPage')}>
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