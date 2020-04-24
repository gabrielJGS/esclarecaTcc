import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'

import { SafeAreaView, Alert, TextInput, TouchableOpacity, AsyncStorage, Text } from 'react-native';

import api from '../../services/api'

import styles from './styles'

export default function NewPost() {
  const navigation = useNavigation()

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tags, setTags] = useState('');

  async function handleSubmit() {
    const user_id = await AsyncStorage.getItem('user');

    await api.post(`/posts`, {
      titulo, descricao, tags
    }, {
      headers: { user_id }
    })
    
    navigation.goBack()
  }

  function handleCancel() {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Titulo *</Text>
      <TextInput
        style={styles.input}
        placeholder="Resuma a sua dúvida"
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        value={titulo}
        onChangeText={setTitulo}
      />
      <Text style={styles.label}>Descrição *</Text>
      <TextInput
        style={styles.input}
        placeholder="Descreva a sua dúvida"
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        value={descricao}
        onChangeText={setDescricao}
      />
      <Text style={styles.label}>Tags *</Text>
      <TextInput
        style={styles.input}
        placeholder="Quais os interesses de sua dúvida?"
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        value={tags}
        onChangeText={setTags}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Nova dúvida</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
