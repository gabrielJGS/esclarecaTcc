import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity,Alert, FlatList, ActivityIndicator, Modal, TouchableWithoutFeedback} from 'react-native';
import { Feather, MaterialCommunityIcons,SimpleLineIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable'

import styles from './styles'
import { showError } from '../../common'
import api from '../../services/api'

export default function Ranking(){
    const navigation = useNavigation()
    const [users, setUsers] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);

    async function loadRanking() {
        setLoading(true);
        try {
            const response = await api.get('/ranking')
            setUsers(response.data)
        } catch (e) {
            showError(e)
        }
        setLoading(false);
    }

    useEffect(() => {
        loadRanking()
    }, [])

    renderFooter = () => {
        if (!loading) return null;
        return (
            <View style={styles.loading}>
                <ActivityIndicator />
            </View>
        );
    };

    function handleModal() {
        setModalVisible(!modalVisible)
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
                                <View style={styles.indicator} />
                                <View style={styles.modalPerfil}>
                                    <Text style={styles.perfilTitle}>Ranking Esclareça:</Text>
                                </View>
                                <View style={{marginHorizontal:12,top:2}}>
                                    <Text style={{alignItems:'center',fontSize:15, color:'#365478'}}>O ranking Esclareça foi criado para trazer a interação entre os usuários por meio da gamificação do processo. Você verá a lista dos 10 maiores pontuadores.</Text>
                                </View>
                                <View style={styles.modalPerfil}>
                                    <Text style={styles.perfilTitle}>Pontuação:</Text>
                                </View>
                                <View style={{marginHorizontal:12}}>
                                    <View style={{alignItems:'center',justifyContent:'flex-start',flexDirection:'row'}}>
                                        <Feather name="plus" size={15} color="#783654"></Feather>
                                        <Text style={{alignItems:'center',fontSize:13, color:'#365478',left:2}}>Postar: +5 pontos</Text>
                                    </View>
                                    <View style={{alignItems:'center',justifyContent:'flex-start',flexDirection:'row'}}>
                                        <Feather name="message-circle" size={15} color="#783654"></Feather>
                                        <Text style={{alignItems:'center',fontSize:13, color:'#365478',left:2}}>Comentar: +3 pontos</Text>
                                    </View>
                                    <View style={{alignItems:'center',justifyContent:'flex-start',flexDirection:'row'}}>
                                        <Feather name="heart" size={15} color="#783654"></Feather>
                                        <Text style={{alignItems:'center',fontSize:13, color:'#365478',left:2}}>Curtir: +1 ponto</Text>
                                    </View>
                                    <View style={{alignItems:'center',justifyContent:'flex-start',flexDirection:'row'}}>
                                        <Feather name="check-circle" size={15} color="#783654"></Feather>
                                        <Text style={{alignItems:'center',fontSize:13, color:'#365478',left:2}}>Resolver dúvida: +10 pontos</Text>
                                    </View>
                                </View>
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
                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20, marginRight:5 }}>Ranking</Text>
                    <SimpleLineIcons name="game-controller" size={18} color="#FFC300" style={{marginTop:2}} />
                </View>
            </View>
            <TouchableOpacity style={{alignItems:'center', top:30, flexDirection:'row', justifyContent:'center'}} onPress={handleModal}>
                <MaterialCommunityIcons name="podium" size={18} color="#F1948A"/>
                <Text style={{fontWeight:'bold',fontSize:22, color:'#2E4053'}}> Ranking Esclareça</Text>
                <Feather name="info" size={15} color="#F1948A" style={{bottom:3,left:2}} />
            </TouchableOpacity>
            <Animatable.View View style={{marginHorizontal:30,top:60,flex:1, paddingBottom:10}} animation="fadeInDown" duration={1000}>
                <FlatList
                    data={users}
                    keyExtractor={user => String(user._id)}
                    refreshing={refreshing}
                    onRefresh={loadRanking}
                    ListFooterComponent={renderFooter}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item: user }) => (
                            <View style={{flexDirection:'row', alignItems:"center", justifyContent:'space-between', paddingBottom:15}}>
                                <View style={{flexDirection:'row', alignItems:"center", justifyContent:'space-between'}}>
                                    <Feather name="award" size={17} color="#F5B7B1"/>
                                    <Text style={{fontWeight:'bold',fontSize:19, color:'#566573', marginLeft:4}}>{user.name}</Text>
                                </View>
                                <View>
                                    <Text style={{fontWeight:'bold',fontSize:19, color:'#F1948A'}}>{user.ranking} <Text style={{fontWeight:'bold',fontSize:19, color:'#566573'}}>Pontos</Text></Text>
                                </View>
                            </View>
                    )}>
                </FlatList>
            </Animatable.View>
        </View>
    )
}