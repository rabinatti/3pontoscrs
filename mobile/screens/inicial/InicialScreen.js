import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppButton from '../../components/appButton/AppButton';
import styles from './Style';

export default function InicialScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topo}>
        <View style={styles.marca}>
          <View style={styles.iconeMarca}>
            <Ionicons name="business" size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.nomeMarca}>PredialLink</Text>
        </View>

        <View style={styles.tags}>
          <Text style={styles.tag}>Residencial</Text>
          <Text style={styles.tag}>Comercial</Text>
        </View>
      </View>

      <View style={styles.centro}>
        <Text style={styles.subtitulo}>MANUTENÇÃO PREDIAL</Text>
        <Text style={styles.titulo}>Manutenção predial sem complicação.</Text>
        <Text style={styles.descricao}>
          Encontre prestadores verificados para o seu prédio, casa ou empresa - e fale direto com quem resolve.
        </Text>

        <View style={styles.acoes}>
          <AppButton
            title="Entrar"
            variant="secondary"
            onPress={() => navigation.navigate('Login')}
          />
          <AppButton
            title="Não tenho cadastro"
            variant="outline"
            onPress={() => navigation.navigate('Cadastro')}
          />
        </View>
      </View>

      <View style={styles.rodape}>
        <View style={styles.selo}>
          <Ionicons name="shield-checkmark-outline" size={16} color="#F37021" />
          <Text style={styles.textoSelo}>Prestadores verificados</Text>
        </View>
        <View style={styles.selo}>
          <Ionicons name="star-outline" size={16} color="#F37021" />
          <Text style={styles.textoSelo}>Avaliação obrigatória</Text>
        </View>
        <View style={styles.selo}>
          <Ionicons name="logo-whatsapp" size={16} color="#F37021" />
          <Text style={styles.textoSelo}>Contato direto</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}