import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'

import { Image, Alert, View, AsyncStorage, Text, TextInput, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback } from "react-native";
import api from '../../services/api'
import { Card, CardItem, Left, Header} from 'native-base'

import styles from './styles'
import Feather from 'react-native-vector-icons/Feather';
import {AuthContext} from '../../context'

export default function Profile(){
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation()
  const {singOut} = React.useContext(AuthContext);
  
  function logoutUser() {
    AsyncStorage.clear()
    singOut();
  }
  
  function handleModal(){
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
                      <Text style={styles.perfilTitle}>Editar Perfil  </Text>
                      <Feather name="edit" size={17} color="#365478"></Feather>
                    </View>
                    <View style={styles.viewInput}>
                      <Text style={styles.modalSubtitle}>Nome</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Altere seu nome..."
                        placeholderTextColor="#999"
                        autoCapitalize="words"
                        autoCorrect={false}
                        //value={title}
                        //onChangeText={setTitle}
                        numberOfLines={2}
                      />
                      <Text style={styles.modalSubtitle}>Email</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Altere seu email..."
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        //value={title}
                        //onChangeText={setTitle}
                        numberOfLines={2}
                      />
                      <Text style={styles.modalSubtitle}>Tags</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Altere suas tags de preferência..."
                        placeholderTextColor="#999"
                        autoCapitalize="words"
                        autoCorrect={false}
                        //value={title}
                        //onChangeText={setTitle}
                        numberOfLines={2}
                      />
                      <Text style={styles.modalSubtitle}>Senha</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Atere sua senha..."
                        placeholderTextColor="#999"
                        secureTextEntry={true}
                        password={true}
                        autoCapitalize="words"
                        autoCorrect={false}
                        //value={senha}
                        //onChangeText={setSenha}
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
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </View>
          <View style={styles.header}>
            <TouchableOpacity style={styles.detailsButton} onPress ={ ( ) => navigation.openDrawer()}>
                <Feather name="menu" size={20} color="#FFC300"></Feather>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleModal} style={styles.detailsButton}>
              <Feather name="edit" size={20} color="#FFC300"></Feather>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailsButton} onPress={()=>
              Alert.alert(
                'Sair',
                'Deseja Sair?',
                [
                  {text: 'Cancelar', onPress: () => {return null}},
                  {text: 'Sair', onPress: () => {
                    logoutUser();
                  }},
                ],
                { cancelable: false }
              )}
            >
              <Feather name="log-out" size={20} color="#FFC300"></Feather>
            </TouchableOpacity>
          </View>
          <Image style={styles.avatar} source={{uri: 'https://scontent.fstu3-1.fna.fbcdn.net/v/t1.0-9/p960x960/87283876_1614904885331971_5523389541076959232_o.jpg?_nc_cat=102&_nc_sid=85a577&_nc_ohc=FY3G_XQYr4YAX_jln8U&_nc_ht=scontent.fstu3-1.fna&_nc_tp=6&oh=6892c35abdfc7a8e7f4786b477890cfc&oe=5EDAE0E2'}}/>
          <View style={styles.body}>
            <View style={styles.perfilName}>
              <Text style={styles.name}>Reidner Rocha</Text>
              <Text style={styles.info}>Tags</Text>
            </View>
            <View style={styles.bodyContent}>
              <View style={styles.contentCard}>
                <Text style={styles.contentTitle}>Dúvidas </Text>
                <Feather name="help-circle" size={12} color="#365478" style={{marginTop:2}}></Feather>
              </View>
              <Text style={styles.contentSubtitle}>Enviadas</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal:24}}>
              <Card>
                  <CardItem button bordered>
                    <Left>
                      <View style={styles.Card}>
                        <Text style={styles.cardTitle}>Erro código</Text>
                        <Text style={styles.cardTags}>Tags</Text>
                        <Text style={styles.cardDate}>08/06/2020</Text>
                      </View>
                    </Left>
                  </CardItem>
                </Card>
                <Card>
                  <CardItem button>
                    <Left>
                      <View style={styles.Card}>
                        <Text style={styles.cardTitle}>Erro código</Text>
                        <Text style={styles.cardTags}>Tags</Text>
                        <Text style={styles.cardDate}>08/06/2020</Text>
                      </View>
                    </Left>
                  </CardItem>
                </Card>
                <Card>
                  <CardItem button>
                    <Left>
                      <View style={styles.Card}>
                        <Text style={styles.cardTitle}>Erro código</Text>
                        <Text style={styles.cardTags}>Tags</Text>
                        <Text style={styles.cardDate}>08/06/2020</Text>
                      </View>
                    </Left>
                  </CardItem>
                </Card>
                <Card>
                  <CardItem button>
                    <Left>
                      <View style={styles.Card}>
                        <Text style={styles.cardTitle}>Erro código</Text>
                        <Text style={styles.cardTags}>Tags</Text>
                        <Text style={styles.cardDate}>08/06/2020</Text>
                      </View>
                    </Left>
                  </CardItem>
                </Card>
              </ScrollView>
              <Text style={styles.contentSubtitle}>Favoritas</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal:24}}>
                <Card>
                  <CardItem button>
                    <Left>
                      <View style={styles.Card}>
                        <Text style={styles.cardTitle}>Erro código</Text>
                        <Text style={styles.cardTags}>Tags</Text>
                        <Text style={styles.cardDate}>08/06/2020</Text>
                      </View>
                    </Left>
                  </CardItem>
                </Card>
              </ScrollView>
              <View style={styles.contentCard}>
                <Text style={styles.contentTitle2}>Conteúdos </Text>
                <Feather name="book-open" size={12} color="#365478" style={{marginTop:10}}></Feather>
              </View>
              <Text style={styles.contentSubtitle}>Enviados</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal:24}}>
              <Card>
                  <CardItem button>
                    <Left>
                      <View style={styles.Card}>
                        <Text style={styles.cardTitle}>Erro código</Text>
                        <Text style={styles.cardTags}>Tags</Text>
                        <Text style={styles.cardDate}>08/06/2020</Text>
                      </View>
                    </Left>
                  </CardItem>
                </Card>
              </ScrollView>
              <Text style={styles.contentSubtitle}>Favoritos</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal:24}}>
              <Card>
                  <CardItem button>
                    <Left>
                      <View style={styles.Card}>
                        <Text style={styles.cardTitle}>Erro código</Text>
                        <Text style={styles.cardTags}>Tags</Text>
                        <Text style={styles.cardDate}>08/06/2020</Text>
                      </View>
                    </Left>
                  </CardItem>
                </Card>
              </ScrollView>
          </View>
        </View>
      </View>
    )
}