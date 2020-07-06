import React, { useState, useEffect } from 'react';

import { Image, Switch, ActivityIndicator, Alert, View, AsyncStorage, Text, TextInput, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback, FlatList } from "react-native";
import api from '../../services/api'
import * as Animatable from 'react-native-animatable'
import { FontAwesome } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import UserPermission from '../../UserPermissions';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import styles from './styles'
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../../context'
import { showError, showSucess } from '../../common'

export default function Profile({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  //const navigation = useNavigation()
  const { singOut } = React.useContext(AuthContext);
  //Editar perfil
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tags, setTags] = useState('');
  const [password, setPassword] = useState('');

  //Usuário
  const [userId, setUserId] = useState(route.params.userId);
  const [loggedUser, setLoggedUser] = useState('');
  const [isLoggedUser, setIsLoggedUser] = useState(false);
  const [press, setPress] = useState(false);
  const [type, setType] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  //sobre os posts
  //Posts do usuário
  const [posts, setPosts] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    loadUser(route.params.userId)
    loadPosts()
  }, [route.params.userId])

  useEffect(() => {
    reload()
    async function reload() {
      await reloadPosts()
    }
  }, [type, userId])

  function logoutUser() {
    AsyncStorage.clear()
    singOut();
  }

  function handleModal() {
    setModalVisible(!modalVisible)
  }

  function navigateToDoubts() {
    setType(false)
    reloadPosts()
  }
  function navigateToContent() {
    setType(true)
    reloadPosts()
  }
  function navigateToPost(post) {
    navigation.navigate('PostPage', {
      post
    })
  }

  async function loadUser(id) {
    const response = await api.get(`/users/${id}`, {})
    if (response.data) {
      setName(response.data.name)
      setEmail(response.data.email)
      setTags(response.data.tags)
      setUserId(response.data._id)
      setAvatar(response.data.url)
    }
    const usuarioAtual = await AsyncStorage.getItem('user');
    setLoggedUser(usuarioAtual);
    if (usuarioAtual === id) {
      setIsLoggedUser(true)
    }
    else {
      setIsLoggedUser(false)
    }
    //Carrega os dados do usuário para caso queira alterar
  }

  async function updateUser() {
    if (password.trim() == '') {
      showError("Confirme ou digite sua nova senha!")
      return
    }
    const response = await api.put(`/users/${userId}`, {
      name,
      email,
      tags: tags.toString(','),
      password
    })
    // loadUser()
    setPress(previousState => !previousState)
    handleModal()
  }

  async function handleLike(postId) {
    const user_id = await AsyncStorage.getItem('user')//Fazer esse puto entrar no estado
    try {
      const response = await api.post(`/posts/${postId}/like`, {
      }, {
        headers: { user_id }
      })
      await reloadPosts()
    } catch (e) {
      showError(e)
    }
  }

  async function loadPosts() {
    if (loading) {//Impede que uma busca aconteça enquanto uma requisição já foi feita
      return
    }
    //const user_id = await AsyncStorage.getItem('user')//Fazer esse puto entrar no estado
    // const getTotal = await api.head('/posts', { headers: { user, type } })
    // setTotal(getTotal.headers['x-total-count'])
    if (total > 0 && posts.length == total) {//Impede que faça a requisição caso a qtd máxima já tenha sido atingida
      return
    }

    setLoading(true)//Altera para o loading iniciado
    try {
      const response = await api.get(`/users/${userId}/posts`, {
        headers: { type },
        params: { page }
      })

      setPosts([...posts, ...response.data])
      setTotal(response.headers['x-total-count'])
      if (response.data.length > 0) {
        setPage(page + 1)
      }
    } catch (e) {
      showError(e)
    }
    setLoading(false)//Conclui o load
  }

  async function reloadPosts() {
    if (refreshing) {//Impede que uma busca aconteça enquanto uma requisição já foi feita
      return
    }
    // const user_id = await AsyncStorage.getItem('user')//Fazer esse puto entrar no estado

    setRefreshing(true)//Altera para o loading iniciado

    try {
      const response = await api.get(`/users/${userId}/posts`, {
        headers: { type },
        params: { page: 1 }
      })
      setPosts(response.data)
      if (response.data.length > 0) {
        setPage(2)
      }
    } catch (e) {
      showError(e)
    }
    setRefreshing(false)
  }

  renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  };

  function handleDate(data) {
    var day = new Date(data);
    var today = new Date();
    var d = new String(data);
    let text = new String();

    var horas = Math.abs(day - today) / 36e5;
    var horasArrend = Math.round(horas)

    if (horasArrend > 24) {
      text = "" + d.substring(8, 10) + "/" + d.substring(5, 7) + "/" + d.substring(0, 4)
    }
    else if (horasArrend < 1) {
      text = "Há menos de 1 hora"
    }
    else {
      text = "Há " + horasArrend + " horas atrás"
    }

    return text
  }

  function handleTitle(title) {
    var titulo = new String(title);
    var tam = new Number(titulo.length)
    let text = new String();

    if (tam > 20) {
      text = titulo.substring(0, 20) + "..."
    }
    else {
      text = titulo
    }

    return text
  }
  async function handlePickUpdate(){
    UserPermission.getCameraPermission()

    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3,4]
    })
    
    if(!result.cancelled){
        setAvatar(result);
        handleSubmitphoto()
    }
}

  async function handleSubmitphoto() {
    let localUri = avatar.uri;
    let filename = localUri.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    try {
      const data = new FormData();
      data.append('file', {uri: localUri, name: filename, type})
      const response = await api.put(`/users/${userId}`, data)
      if (response.status == 204) {
        showSucess("Foto alterada com sucesso")
        await loadUser(userId)
      } else {
          showError("Erro")
      }
    }
    catch (e) {
      showError(e)
    }
  }

  return (
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
                    <Text></Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={styles.perfilTitle}>Editar Perfil  </Text>
                      <Feather name="edit" size={17} color="#365478"></Feather>
                    </View>
                    {true ?
                      <>
                        <TouchableOpacity onPress={() =>
                          Alert.alert(
                            'Excluir',
                            'Deseja excluir seu perfil?',
                            [
                              { text: 'Não', onPress: () => { return null } },
                              {
                                text: 'Sim', onPress: () => { }
                              },
                            ],
                            { cancelable: false }
                          )}
                          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}
                        >
                          <Feather name="trash-2" size={15} color='#E73751'></Feather>
                        </TouchableOpacity>
                      </>
                      :
                      <>
                      </>
                    }
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.modalSubtitle}>Nome</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Altere seu nome..."
                      placeholderTextColor="#999"
                      autoCapitalize="words"
                      autoCorrect={false}
                      value={name}
                      onChangeText={setName}
                      numberOfLines={2}
                      returnKeyType="next"
                    />
                    <Text style={styles.modalSubtitle}>Email</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Altere seu email..."
                      placeholderTextColor="#999"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={email}
                      onChangeText={setEmail}
                      numberOfLines={2}
                      returnKeyType="next"
                    />
                    <Text style={styles.modalSubtitle}>Tags</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Altere suas tags de preferência..."
                      placeholderTextColor="#999"
                      autoCapitalize="words"
                      autoCorrect={false}
                      value={tags.toString()}
                      onChangeText={setTags}
                      numberOfLines={2}
                      returnKeyType="next"
                    />
                    <Text style={styles.modalSubtitle}>Senha</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Altere sua senha..."
                      placeholderTextColor="#999"
                      secureTextEntry={true}
                      password={true}
                      autoCapitalize="words"
                      autoCorrect={false}
                      value={password}
                      onChangeText={setPassword}
                      numberOfLines={2}
                      onSubmitEditing={handleModal}
                    />
                  </View>
                  <View style={styles.buttonView}>
                    <TouchableOpacity onPress={updateUser} style={styles.button}>
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
        <TouchableOpacity style={styles.detailsButton} onPress={() => navigation.openDrawer()}>
          <Feather name="menu" size={20} color="#FFC300"></Feather>
        </TouchableOpacity>
        {isLoggedUser ?
          <>
            <TouchableOpacity onPress={handleModal} style={styles.detailsButton}>
              <Feather name="edit" size={20} color="#FFC300"></Feather>
            </TouchableOpacity>
          </>
          :
          <>
            <TouchableOpacity>
            </TouchableOpacity>
          </>
        }
        <TouchableOpacity style={styles.detailsButton} onPress={() =>
          Alert.alert(
            'Sair',
            'Deseja Sair?',
            [
              { text: 'Cancelar', onPress: () => { return null } },
              {
                text: 'Sair', onPress: () => {
                  logoutUser();
                }
              },
            ],
            { cancelable: false }
          )}
        >
          <Feather name="log-out" size={20} color="#FFC300"></Feather>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.circle} onPress={() =>
        Alert.alert(
          'Alterar',
          'Deseja alterar a foto de Perfil?',
          [
            { text: 'Não', onPress: () => { return null } },
            {
              text: 'Sim', onPress: () => {
                handlePickUpdate();
              }
            },
          ],
          { cancelable: false }
        )}
      >
        {avatar === null ?
          <>
            <Image style={styles.avatar} source={{
              uri:
                'https://anebrasil.org.br/wp-content/uploads/2016/06/img-user-geral.png'
            }} />
          </>
          :
          <>
            <Image style={styles.avatar} source={{ uri: avatar }} />
          </>
        }
      </TouchableOpacity>

      <View style={styles.body}>
        <View style={styles.perfilName}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.info}>{tags.toString()}</Text>
        </View>
      </View>

      <Animatable.View
          style={styles.footer}
          animation="fadeInUp"
          duration={900}>
          <View style={{flexDirection:'row', alignItems: "center", justifyContent: 'flex-start', paddingHorizontal:30}}>
            <Text style={{color:'white', fontWeight:'bold'}}>Enviadas</Text>
            <Switch trackColor={{ false: "#7DCEA0", true: "#E73751" }}
              thumbColor={isEnabled ? "#E73751" : "#7DCEA0"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text style={{color:'white', fontWeight:'bold'}}>Curtidas</Text>
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:hp('8.5%'), top:2}}>
            <TouchableOpacity style={styles.detailsBar} onPress={navigateToDoubts}>
                <Text style={[styles.detailsButtonText, { color: type == false ? "#FFC300" : "white" }]}>Dúvidas</Text>
                <Feather name="edit-3" size={16} color={type == false ? "#FFC300" : "white"}></Feather>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailsBar} onPress={navigateToContent}>
                <Text style={[styles.detailsButtonText, { color: type == true ? "#FFC300" : "white" }]}>Conteúdos</Text>
                <Feather name="book-open" size={16} color={type == true ? "#FFC300" : "white"}></Feather>
            </TouchableOpacity>
          </View>
      </Animatable.View>

      <View style={styles.body2}>
        <View style={styles.bodyContent}>
          <FlatList
            data={posts}
            style={styles.postsList}
            keyExtractor={post => String(post._id)}
            refreshing={refreshing}
            onRefresh={reloadPosts}
            // onTouchStart={reloadPosts}
            onEndReached={loadPosts}
            onEndReachedThreshold={0.2}
            ListFooterComponent={renderFooter}
            showsHorizontalScrollIndicator={false}//OBS:Trocar para false ao finalizar testes!!!!
            renderItem={({ item: post }) => (
              <Animatable.View
                style={styles.post}
                animation="fadeInDown"
                duration={1000}>
                <View style={styles.postHeader}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={styles.postTitulo}>
                      <Text style={styles.postTitle}>{handleTitle(post.title)}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={styles.Nomepost}>{handleDate(post.postedIn)}</Text>
                    </View>
                  </View>
                  <View style={styles.headerTags}>
                    <Text style={styles.postTag}>{post.tags.toString()}</Text>
                    <TouchableOpacity style={styles.Ver} onPress={() => navigateToPost(post)}>
                      <Feather name="chevron-right" size={25} color='#FFC300'></Feather>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ paddingHorizontal: 25, paddingBottom: 8, top: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => handleLike(post._id)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <FontAwesome name={post.didILiked == true ? "heart" : "heart-o"} style={{ color: 'red', fontSize: 12 }} />
                      <Text style={{ marginLeft: 3, fontSize: 12, color: 'gray' }}>{post.likes.length}</Text>
                    </TouchableOpacity>
                    <FontAwesome name="commenting-o" style={{ color: '#D8D9DB', fontSize: 12, marginLeft: 15 }} />
                    <Text style={{ marginLeft: 3, fontSize: 12, color: 'gray' }}>{post.commentsCount}</Text>
                  </View>
                  {post.closed ? <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 13, color: '#7DCEA0', fontWeight: '800' }}>Dúvida finalizada</Text>
                    <Feather name="check-circle" size={15} color='#7DCEA0' style={{ marginLeft: 5 }}></Feather>
                  </View> : null}
                </View>
              </Animatable.View>
            )}>
          </FlatList>
        </View>
      </View>

    </View>
  )
}