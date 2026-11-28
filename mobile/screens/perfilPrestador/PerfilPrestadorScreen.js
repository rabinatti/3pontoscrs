import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HeaderApp from '../../components/headerApp/HeaderApp';
import AppButton from '../../components/appButton/AppButton';
import styles from './Style';

export default function PerfilPrestadorScreen({ route, navigation }) {
  // Recebe o objeto vindo do Catálogo (tabela Prestador)
  const prestador = route?.params?.prestador || {};

  function abrirWhatsApp() {
    if (!prestador.contatoPrestador) {
      Alert.alert('Contato indisponível', 'Este prestador ainda não cadastrou um número de WhatsApp.');
      return;
    }

    const numeroLimpo = String(prestador.contatoPrestador).replace(/\D/g, '');
    const numeroComDDI = numeroLimpo.startsWith('55') ? numeroLimpo : `55${numeroLimpo}`;
    const mensagem = encodeURIComponent(
      `Olá, ${prestador.nomeFantasiaPrestador}! Encontrei seu perfil no PredialLink e gostaria de solicitar um serviço.`
    );

    Linking.openURL(`https://wa.me/${numeroComDDI}?text=${mensagem}`);
  }

  const sigla = prestador.nomeFantasiaPrestador
    ? prestador.nomeFantasiaPrestador.substring(0, 2).toUpperCase()
    : 'PR';

  return (
    <SafeAreaView style={styles.container}>
      <HeaderApp
        nomeUsuario="Usuário"
        onSair={() => navigation.replace('Inicial')}
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={18} color="#0F2537" />
          <Text style={styles.textoVoltar}>Voltar para busca</Text>
        </TouchableOpacity>

        {/* Cartão Principal com os atributos da classe Prestador (UML) */}
        <View style={styles.cartao}>
          <View style={styles.bannerTopo} />

          <View style={styles.corpoCartao}>
            <View style={styles.linhaAvatar}>
              <View style={styles.logoBox}>
                <Text style={styles.logoTexto}>{sigla}</Text>
              </View>

              <View
                style={[
                  styles.statusBadge,
                  prestador.disponivelPrestador ? styles.statusAtivo : styles.statusInativo,
                ]}
              >
                <Ionicons
                  name={prestador.disponivelPrestador ? 'checkmark-circle' : 'close-circle'}
                  size={15}
                  color={prestador.disponivelPrestador ? '#16A34A' : '#DC2626'}
                />
                <Text
                  style={[
                    styles.statusTexto,
                    { color: prestador.disponivelPrestador ? '#16A34A' : '#DC2626' },
                  ]}
                >
                  {prestador.disponivelPrestador ? 'Disponível para atendimento' : 'Indisponível'}
                </Text>
              </View>
            </View>

            <Text style={styles.nomeFantasia}>
              {prestador.nomeFantasiaPrestador || 'Nome Fantasia do Prestador'}
            </Text>

            <View style={styles.tagCategoria}>
              <Ionicons name="construct-outline" size={14} color="#F37021" />
              <Text style={styles.textoCategoria}>
                {prestador.categoriaServico || 'Categoria do Serviço'}
              </Text>
            </View>

            <Text style={styles.tituloSecao}>Sobre o prestador</Text>
            <Text style={styles.descricao}>
              {prestador.descricaoPrestador || 'Nenhuma descrição informada pelo prestador.'}
            </Text>

            <View style={styles.linhaContato}>
              <Ionicons name="call-outline" size={16} color="#64748B" />
              <Text style={styles.textoContato}>
                Contato: {prestador.contatoPrestador || 'Não informado'}
              </Text>
            </View>
          </View>
        </View>

        {/* Botão abaixo de tudo para abrir o WhatsApp */}
        <AppButton
          title="Chamar no WhatsApp"
          variant="whatsapp"
          icon="logo-whatsapp"
          onPress={abrirWhatsApp}
          style={styles.botaoWhatsapp}
        />
      </ScrollView>
    </SafeAreaView>
  );
}