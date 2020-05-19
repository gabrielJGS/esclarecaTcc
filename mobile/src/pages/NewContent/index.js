import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'

import { SafeAreaView, View, TextInput, TouchableOpacity, AsyncStorage, Text, Image } from 'react-native';
import {Ionicons} from "@expo/vector-icons"

import api from '../../services/api'

import styles from './styles'

export default function NewContent() {
  const navigation = useNavigation()
  console.log( navigation.params)

  function handleCancel() {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel}>
          <Ionicons name="md-arrow-back" size={24} color="#FFC300"></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity >
          <Text style={{fontWeight:'bold', color:'white', fontSize:20}}>Postar Conteúdo</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          autoFocus={true}
          multiline={true}
          numberOfLines={7}
          style={{flex:1, fontSize:15}}
          placeholder="Compartilhe seu conhecimento com texto, indicações, links ou anexando arquivos..."
          //value={...}
          //onChangeText={setDescricao}
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
          placeholder="Título que deseja dar à sua publicação..."
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          //value={titulo}
          //onChangeText={setTitulo}
          numberOfLines={2}
        />
        <Text style={styles.label}>Tags</Text>
        <TextInput
          style={styles.input}
          placeholder="Temas relacionados à sua publicação separados por ','"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          //value={tags}
          //onChangeText={setTags}
          numberOfLines={2}
        />
      </View>
    </SafeAreaView>
  );
}
