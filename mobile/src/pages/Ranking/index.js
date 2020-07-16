import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity,Alert, FlatList, ActivityIndicator} from 'react-native';
import { Feather, Ionicons,SimpleLineIcons } from '@expo/vector-icons'
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

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress ={() => navigation.openDrawer()}>
                    <Feather name="menu" size={20} color="#FFC300"></Feather>
                </TouchableOpacity>
                <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center'}}>
                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20, marginRight:5 }}>Ranking</Text>
                    <SimpleLineIcons name="game-controller" size={18} color="#FFC300" style={{marginTop:2}} />
                </View>
            </View>
            <View style={{alignItems:'center', top:30, flexDirection:'row', justifyContent:'center'}}>
                <Feather name="trending-up" size={18} color="#5CBA58"/>
                <Text style={{fontWeight:'bold',fontSize:22, color:'#2E4053'}}> Maiores Participações</Text>
            </View>
            <Animatable.View View style={{marginHorizontal:40,top:60,flex:1, paddingBottom:10}} animation="fadeInDown" duration={1000}>
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