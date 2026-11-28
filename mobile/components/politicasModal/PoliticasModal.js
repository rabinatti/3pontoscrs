import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppButton from '../appButton/AppButton';
import styles from './Style';

export default function PoliticasModal({ visible, onClose, onAceitar }) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.fundo}>
        <View style={styles.cartao}>
          <View style={styles.topo}>
            <Text style={styles.titulo}>Políticas de Utilização</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#0F2537" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.conteudo} showsVerticalScrollIndicator={false}>
            <Text style={styles.paragrafo}>
              <Text style={styles.negrito}>1. Uso do app. </Text>
              O PredialLink conecta usuários a prestadores independentes. O contato final é direto entre as partes.
            </Text>
            <Text style={styles.paragrafo}>
              <Text style={styles.negrito}>2. Veracidade. </Text>
              O usuário declara dados verdadeiros e mantém o cadastro atualizado.
            </Text>
            <Text style={styles.paragrafo}>
              <Text style={styles.negrito}>3. Avaliações. </Text>
              A avaliação ao final de cada solicitação é obrigatória e ajuda a manter a qualidade da comunidade.
            </Text>
            <Text style={styles.paragrafo}>
              <Text style={styles.negrito}>4. Conduta. </Text>
              É proibido usar o app para práticas abusivas, spam ou informações falsas.
            </Text>
            <Text style={styles.paragrafo}>
              <Text style={styles.negrito}>5. Pagamentos. </Text>
              O app não processa pagamentos entre usuário e prestador nesta versão.
            </Text>
          </ScrollView>

          {onAceitar ? (
            <AppButton title="Li e aceito" onPress={onAceitar} />
          ) : null}
        </View>
      </View>
    </Modal>
  );
}