import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppInput from '../../components/appInput/AppInput';
import AppButton from '../../components/appButton/AppButton';
import styles from './Style';

import { loginUsuario } from '../../services/authService';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erros, setErros] = useState({});
  const [carregando, setCarregando] = useState(false);

  function validar() {
    const novosErros = {};
    if (!email.trim() || !email.includes('@')) {
      novosErros.email = 'Informe um e-mail válido.';
    }
    if (!senha.trim()) {
      novosErros.senha = 'Informe sua senha.';
    }
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  async function handleEntrar() {
    if (!email.trim() || !senha.trim()) {
        Alert.alert('Atenção', 'Preencha e-mail e senha.');
        return;
  }

    setCarregando(true);
    try {
      await loginUsuario(email, senha);
      navigation.replace('MainTabs');

    } catch (erro) {
      Alert.alert('Erro ao entrar', erro.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={20} color="#0F2537" />
        <Text style={styles.textoVoltar}>Voltar</Text>
      </TouchableOpacity>

      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Bem-vindo de volta</Text>
        <Text style={styles.subtitulo}>Entre com seu e-mail para buscar prestadores.</Text>
      </View>

      <View style={styles.formulario}>
        <AppInput
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          placeholder="Ex.: ana.souza@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          error={erros.email}
        />

        <AppInput
          label="Senha"
          value={senha}
          onChangeText={setSenha}
          placeholder="••••••••"
          secureTextEntry
          error={erros.senha}
        />

        <AppButton
          title="Entrar"
          onPress={handleEntrar}
          loading={carregando}
          style={styles.botaoEntrar}
        />

        <TouchableOpacity
          style={styles.linkCadastro}
          onPress={() => navigation.navigate('Cadastro')}
        >
          <Text style={styles.textoCadastro}>
            Ainda não tem conta? <Text style={styles.negrito}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}