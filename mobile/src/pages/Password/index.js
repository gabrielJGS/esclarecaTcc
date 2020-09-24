import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";
import { showError, showSucess } from "../../common";
import api from "../../services/api";

export default function Password() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  function navigateToResetpass() {
    navigation.navigate("ResetPass", {
      email,
    });
  }

  async function handleForgetPassword() {
    if (email) {
      try {
        const response = await api.post("/forget", {
          email,
        });
        if (response.status == 200) {
          showSucess(`Verifique o email ${email} e siga as instruções.`);
          navigateToResetpass();
        } else {
        }
      } catch (e) {
        showError("Email não cadastrado, tente novamente.");
      }
    } else {
      showError("Digite o email!");
    }
  }

  return (
    <KeyboardAvoidingView behavior="" style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={20} color="#FFC300"></Feather>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
              fontSize: 20,
              marginRight: 5,
            }}
          >
            Esqueci a senha
          </Text>
        </View>
      </View>
      <View style={styles.forms}>
        <Text style={styles.label1}>Digite seu e-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira seu e-mail"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          onPress={handleForgetPassword}
        >
          <Text style={styles.label}>Enviar</Text>
          <Feather
            name="chevron-right"
            size={20}
            style={{ top: 1, left: 2 }}
            color="#FFC300"
          ></Feather>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
