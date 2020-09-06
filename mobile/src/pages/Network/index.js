import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity,Alert, FlatList, ActivityIndicator,TextInput, Image} from 'react-native';
import { Feather, FontAwesome,SimpleLineIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable'

import styles from './styles'
import { showError } from '../../common'
import api from '../../services/api'

export default function Network(){
    const navigation = useNavigation()
    const [users, setUsers] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {

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
                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20, marginRight:5 }}>Conexões</Text>
                    <FontAwesome name="users" size={18} color="#FFC300" style={{marginTop:2}} />
                </View>
            </View>
            
            <View style={styles.Search}>
                <TextInput
                    style={styles.input}
                    placeholder="Pesquise o usuário desejado..."
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    //value={searchText}
                    //onChangeText={setSearchText}
                    multiline={true}
                    numberOfLines={2}
                    returnKeyType="done"
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <TouchableOpacity onPress={() => {}}>
                        <Feather name="search" size={18} color="#FFC300" style={{ marginTop: 2, marginRight: 20 }} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{alignItems:'center', top:5 ,paddingHorizontal:'4%',flexDirection:'row', justifyContent:'space-between'}}>
                <TouchableOpacity >
                    <Text style={{fontSize:15, fontWeight:'bold', color:'#783654'}}>Todos os Usuários</Text>
                </TouchableOpacity>
                <View style={{alignItems:'flex-end'}}>
                    <TouchableOpacity >
                        <Text style={{fontSize:13, fontWeight:'bold', color:'#365478'}}>Bloqueados</Text>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Text style={{fontSize:13, fontWeight:'bold', color:'#365478'}}>Seguidos</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/*<FlatList
                data={slacks}
                // style={styles.post}
                keyExtractor={slack => String(slack._id)}
                refreshing={refreshing}
                onRefresh={reloadSlacks}
                onEndReached={onLoadMore}
                onEndReachedThreshold={0.2}
                ListFooterComponent={renderFooter}
                showsVerticalScrollIndicator={false}
            renderItem={({ item: slack }) => (*/}
                    <Animatable.View
                        style={styles.post}
                        animation="fadeInDown"
                        duration={1000}
                    >
                        <View style={styles.postHeader}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Image style={styles.avatar} source={{ uri: 'https://www.colegiodepadua.com.br/img/user.png' }} />
                                    <View style={{ marginLeft:5 }}>
                                        <Text style={{fontSize: 14,color: '#365478',fontWeight: 'bold'}}>Reidner rocha</Text>
                                        <Text style={styles.postTag}>tags</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight:25}}>
                                        <Feather name="award" size={17} color="#F5B7B1"/>
                                        <Text style={{fontSize: 12,color: '#F5B7B1'}}>10 pontos</Text>
                                    </View>
                                    <TouchableOpacity onPress={() =>
                                        Alert.alert(
                                            'Bloquear',
                                            'Deseja realmente bloquear o usuário?',
                                            [
                                            { text: 'Não', onPress: () => { return null } },
                                            {
                                                text: 'Sim', onPress: () => { return null }
                                            },
                                            ],
                                            { cancelable: false }
                                        )}
                                        >
                                        <Feather name="slash" size={20} color="#E73751"></Feather>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{paddingLeft:10}} onPress={() =>{}}>
                                        <Feather name="user-plus" size={20} color="#7DCEA0"></Feather>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={styles.postHeader}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Image style={styles.avatar} source={{ uri: 'https://www.colegiodepadua.com.br/img/user.png' }} />
                                    <View style={{ marginLeft:5 }}>
                                        <Text style={{fontSize: 14,color: '#365478',fontWeight: 'bold'}}>Reidner rocha</Text>
                                        <Text style={styles.postTag}>tags</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight:25}}>
                                        <Feather name="award" size={17} color="#F5B7B1"/>
                                        <Text style={{fontSize: 12,color: '#F5B7B1'}}>10 pontos</Text>
                                    </View>
                                    <TouchableOpacity onPress={() =>
                                        Alert.alert(
                                            'Bloquear',
                                            'Deseja realmente bloquear o usuário?',
                                            [
                                            { text: 'Não', onPress: () => { return null } },
                                            {
                                                text: 'Sim', onPress: () => { return null }
                                            },
                                            ],
                                            { cancelable: false }
                                        )}
                                        >
                                        <Feather name="slash" size={20} color="#E73751"></Feather>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{paddingLeft:10}} onPress={() =>{}}>
                                        <Feather name="user-minus" size={20} color="#E73751"></Feather>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={styles.postHeader}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Image style={styles.avatar} source={{ uri: 'https://www.colegiodepadua.com.br/img/user.png' }} />
                                    <View style={{ marginLeft:5 }}>
                                        <Text style={{fontSize: 14,color: '#365478',fontWeight: 'bold'}}>Reidner rocha</Text>
                                        <Text style={styles.postTag}>tags</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight:40}}>
                                        <Feather name="award" size={17} color="#F5B7B1"/>
                                        <Text style={{fontSize: 12,color: '#F5B7B1'}}>10 pontos</Text>
                                    </View>
                                    <TouchableOpacity style={{paddingRight:15}} onPress={() =>{}}>
                                        <Feather name="check-circle" size={20} color="#7DCEA0"></Feather>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Animatable.View>
                {/*)}>
            </FlatList>*/}
        </View>
    )
}