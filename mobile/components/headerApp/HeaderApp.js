import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './Style';

export default function HeaderApp({ nomeUsuario = 'Usuário', onSair }) {
  const inicial = nomeUsuario ? nomeUsuario.charAt(0).toUpperCase() : 'U';

  return (
    <View style={styles.header}>
      <View style={styles.infoUsuario}>
        <View style={styles.avatar}>
          <Text style={styles.avatarTexto}>{inicial}</Text>
        </View>
        <View>
          <Text style={styles.saudacao}>Olá,</Text>
          <Text style={styles.nome}>{nomeUsuario}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.botaoSair} onPress={onSair}>
        <Ionicons name="log-out-outline" size={16} color="#FFFFFF" />
        <Text style={styles.textoSair}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
