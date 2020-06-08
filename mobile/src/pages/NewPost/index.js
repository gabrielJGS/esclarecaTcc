import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'

import { SafeAreaView, View, TextInput, TouchableOpacity, AsyncStorage, Text, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons"

import api from '../../services/api'

import styles from './styles'

import { showError, showSucess } from '../../common'

export default function NewPost() {
  const navigation = useNavigation()

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tags, setTags] = useState('');
  const type = false

  async function handleSubmit() {
    const user_id = await AsyncStorage.getItem('user');

    try {
      const post = await api.post(`/posts`, {
        title, desc, tags, type
      }, {
        headers: { user_id }
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
          <Ionicons name="md-arrow-back" size={24} color="#FFC300"></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20 }}>Postar Dúvida</Text>
        </TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: 30, marginTop: 40 }}>
        <Text style={styles.label}>Título da dúvida</Text>
        <TextInput
          autoFocus={true}
          style={styles.input}
          placeholder="Título que deseja dar à sua dúvida..."
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={title}
          onChangeText={setTitle}
          numberOfLines={2}
        />
        <Text style={styles.label}>Descrição da dúvida</Text>
        <TextInput
          style={styles.input}
          multiline={true}
          numberOfLines={4}
          placeholder="Descreva qual a sua dúvida..."
          value={desc}
          onChangeText={setDesc}
        />
        <Text style={styles.label}>Tags</Text>
        <TextInput
          style={styles.input}
          placeholder="Temas relacionados à sua dúvida separados por ','"
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
      {/* <View style={styles.inputContainer}>
        <Ionicons name="md-camera" size={50} color='#D8D9DB' style={styles.avatar}></Ionicons>

      </View> */}
    </SafeAreaView>
  );
}
