import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HeaderApp from '../../components/headerApp/HeaderApp';
import AppButton from '../../components/appButton/AppButton';
import PoliticasModal from '../../components/politicasModal/PoliticasModal';
import styles from './Style';

export default function PerfilScreen({ navigation }) {
  const [modalPoliticas, setModalPoliticas] = useState(false);

  // Quando o login estiver conectado ao banco, preencha com os dados reais da sessão (Usuario)
  const usuarioLogado = {
    nomeUsuario: 'Usuário',
    emailUsuario: 'usuario@email.com',
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderApp
        nomeUsuario={usuarioLogado.nomeUsuario}
        onSair={() => navigation.replace('Inicial')}
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Cartão de Identificação */}
        <View style={styles.cartaoUsuario}>
          <View style={styles.avatarGrande}>
            <Text style={styles.avatarTexto}>
              {usuarioLogado.nomeUsuario.charAt(0).toUpperCase()}
            </Text>
          </View>

          <View style={styles.infoUsuario}>
            <Text style={styles.nome}>{usuarioLogado.nomeUsuario}</Text>
            <Text style={styles.email}>{usuarioLogado.emailUsuario}</Text>

            <View style={styles.seloVerificado}>
              <Ionicons name="shield-checkmark" size={14} color="#FFFFFF" />
              <Text style={styles.textoSelo}>Conta verificada</Text>
            </View>
          </View>
        </View>

        {/* Menu de Opções */}
        <View style={styles.listaMenu}>
          <TouchableOpacity
            style={styles.itemMenu}
            onPress={() => navigation.navigate('Meus Pedidos')}
          >
            <View style={styles.textoMenuBox}>
              <Text style={styles.tituloItem}>Meus pedidos</Text>
              <Text style={styles.subItem}>Acompanhar solicitações</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.itemMenu}
            onPress={() => navigation.navigate('Ser Prestador')}
          >
            <View style={styles.textoMenuBox}>
              <Text style={styles.tituloItem}>Quero ser prestador</Text>
              <Text style={styles.subItem}>Ver pacotes Básico, Plus e Premium</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.itemMenu, styles.semBorda]}
            onPress={() => setModalPoliticas(true)}
          >
            <View style={styles.textoMenuBox}>
              <Text style={styles.tituloItem}>Políticas de Utilização</Text>
              <Text style={styles.subItem}>Regras e avaliação obrigatória</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* Aviso de Avaliação Obrigatória */}
        <View style={styles.boxAviso}>
          <Text style={styles.tituloAviso}>Avaliação obrigatória</Text>
          <Text style={styles.textoAviso}>
            Ao final de cada solicitação, avalie o prestador. A falta de avaliação pode levar ao bloqueio da conta.
          </Text>
        </View>

        <AppButton
          title="Sair da conta"
          variant="outline"
          icon="log-out-outline"
          onPress={() => navigation.replace('Inicial')}
        />
      </ScrollView>

      <PoliticasModal
        visible={modalPoliticas}
        onClose={() => setModalPoliticas(false)}
      />
    </SafeAreaView>
  );
}