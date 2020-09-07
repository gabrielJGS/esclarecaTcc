import React, { useState } from 'react';
//import { useNavigation } from '@react-navigation/native'

import { SafeAreaView, View, TextInput, TouchableOpacity, AsyncStorage, Text, Image, ScrollView } from 'react-native';
import { Ionicons, Feather } from "@expo/vector-icons"

import api from '../../services/api'

import styles from './styles'

import { showError, showSucess } from '../../common'

export default function NewPost({ route, navigation }) {
  //const navigation = useNavigation()

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tags, setTags] = useState('');
  const [type, setType] = useState(route.params.type)

  async function handleSubmit() {
    const user_id = await AsyncStorage.getItem('user');

    try {
      const post = await api.post(`/posts`, {
        title, desc, tags
      }, {
        headers: { user_id, type }
      })
      if (post.status == 204) {
        showSucess(`${type == false ? 'Dúvida' : 'Conteúdo'} cadastrad${type == false ? 'a' : 'o'} com sucesso`)
        navigation.goBack()
      } else {
        showError("Ocorreu um erro")
      }
    }
    catch (e) {
      showError(e)
    }
  }

  function handleCancel() {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel}>
          <Feather name="chevron-left" size={24} color="#FFC300"></Feather>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20 }}>Postar {type == false ? 'dúvida' : 'conteúdo'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {type == false ?
          <>
            <View style={{ paddingHorizontal: 30, marginTop: 40 }}>
              <Text style={styles.label}>Título d{type == false ? 'a dúvida' : 'o conteúdo'}</Text>
              <TextInput
                autoFocus={true}
                style={styles.input}
                placeholder={"Título que deseja dar "+(type==false?"à sua dúvida":"ao seu conteúdo")}
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={title}
                onChangeText={setTitle}
                numberOfLines={2}
              />
              <Text style={styles.label}>Descrição d{type == false ? 'a dúvida' : 'o conteúdo'}</Text>
              <TextInput
                style={styles.input}
                multiline={true}
                numberOfLines={4}
                placeholder={"Descreva qual "+(type==false?"à sua dúvida":"ao seu conteúdo")}
                value={desc}
                onChangeText={setDesc}
              />
              <Text style={styles.label}>Tags</Text>
              <TextInput
                style={styles.input}
                placeholder={"Temas relacionados  "+(type==false?"à sua dúvida":"ao seu conteúdo")+" separados por ' , '"}
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={tags}
                onChangeText={setTags}
                numberOfLines={2}
              />
              <Text style={styles.label}>Anexo</Text>
              <TouchableOpacity style={styles.anexo}>
                <Ionicons name="md-attach" size={32} color='#D8D9DB'></Ionicons>
              </TouchableOpacity>
            </View>
          </>
        :
          <>
            <View>
              <View style={styles.inputContainer}>
                <TextInput
                  autoFocus={true}
                  multiline={true}
                  numberOfLines={7}
                  style={{flex:1, fontSize:15}}
                  placeholder="Compartilhe seu conhecimento com texto, indicações, links ou anexando arquivos..."
                  value={desc}
                  onChangeText={setDesc}
                />
              </View>

              <View>
                <TouchableOpacity style={styles.anexo}>
                  <Ionicons name="md-attach" size={32} color='#D8D9DB'></Ionicons>
                </TouchableOpacity>
              </View>

              <View style={{paddingHorizontal:30,marginTop:40}}>
                <Text style={styles.label}>Título do Conteúdo</Text>
                <TextInput
                  style={styles.input}
                  placeholder={"Título que deseja dar "+(type==false?"à sua dúvida":"ao seu conteúdo")}
                  placeholderTextColor="#999"
                  autoCapitalize="words"
                  autoCorrect={false}
                  value={title}
                  onChangeText={setTitle}
                  numberOfLines={2}
                />
                <Text style={styles.label}>Tags</Text>
                <TextInput
                  style={styles.input}
                  placeholder={"Temas relacionados  "+(type==false?"à sua dúvida":"ao seu conteúdo")+" separados por ' , '"}
                  placeholderTextColor="#999"
                  autoCapitalize="words"
                  autoCorrect={false}
                  value={tags}
                  onChangeText={setTags}
                  numberOfLines={2}
                />
              </View>
            </View>
          </>
        }
      </ScrollView>
    </SafeAreaView>
  );
}
