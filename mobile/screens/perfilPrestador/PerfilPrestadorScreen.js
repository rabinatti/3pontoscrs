import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import styles from './Style';
import { obterUsuarioLogado } from '../../services/authService';
import { API_BASE_URL } from '../../integrations/api';

const CATEGORIAS = [
  'Elétrica',
  'Hidráulica',
  'Pintura',
  'Ar-Condicionado',
  'Alvenaria',
  'Serralheria',
  'Jardinagem',
  'Limpeza',
  'Serviços Gerais',
];

export default function PerfilPrestadorScreen({ route, navigation }) {
  const prestador = route?.params?.prestador || {};

  const [ehDono, setEhDono] = useState(false);
  const [editando, setEditando] = useState(false);
  const [descricao, setDescricao] = useState(prestador.descricaoPrestador || '');
  const [categoria, setCategoria] = useState(prestador.categoriaServico || 'Serviços Gerais');
  const [logoUrl, setLogoUrl] = useState(prestador.logotipoUrlPrestador || null);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    obterUsuarioLogado().then((u) => {
      if (u && Number(u.idUsuario) === Number(prestador.idUsuario)) {
        setEhDono(true);
      }
    });
  }, [prestador.idUsuario]);

  const iniciais = (prestador.nomeFantasiaPrestador || 'PR')
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();

  async function salvarPerfil() {
    setSalvando(true);
    try {
      const resp = await fetch(`${API_BASE_URL}/prestadores/${prestador.idUsuario}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          descricaoPrestador: descricao,
          categoriaServico: categoria,
        }),
      });

      const dados = await resp.json();
      if (!resp.ok) {
        throw new Error(dados.message || dados.erro || 'Erro ao atualizar perfil.');
      }

      setEditando(false);
      Alert.alert('Sucesso', 'Perfil atualizado!');
    } catch (erro) {
      Alert.alert('Erro', erro.message);
    } finally {
      setSalvando(false);
    }
  }

  async function alterarLogo() {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissao.granted) {
      Alert.alert('Permissão necessária', 'Libere o acesso à galeria para trocar o logotipo.');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (resultado.canceled) return;

    const foto = resultado.assets[0];
    const extensao = (foto.uri.split('.').pop() || 'jpg').toLowerCase();
    const mimeType = foto.mimeType || (extensao === 'png' ? 'image/png' : 'image/jpeg');

    const formData = new FormData();
    formData.append('logotipo', {
      uri: foto.uri,
      name: `logo_${prestador.idUsuario}.${extensao}`,
      type: mimeType,
    });

    try {
      const resp = await fetch(`${API_BASE_URL}/prestadores/${prestador.idUsuario}/logo`, {
        method: 'POST',
        body: formData,
      });

      const texto = await resp.text();
      let dados;
      try {
        dados = JSON.parse(texto);
      } catch {
        throw new Error('Resposta inválida do servidor ao enviar imagem.');
      }

      if (!resp.ok) {
        throw new Error(dados.message || dados.erro || 'Erro ao enviar logotipo.');
      }

      setLogoUrl(dados.logotipoUrlPrestador);
      Alert.alert('Sucesso', 'Logotipo atualizado!');
    } catch (erro) {
      Alert.alert('Erro', erro.message);
    }
  }

  function abrirWhatsApp() {
    const numeroLimpo = String(prestador.celularUsuario || prestador.whatsappPrestador || '').replace(/\D/g, '');
    if (!numeroLimpo) {
      Alert.alert('Indisponível', 'Este prestador não possui número de WhatsApp cadastrado.');
      return;
    }
    const mensagem = encodeURIComponent(
      `Olá ${prestador.nomeFantasiaPrestador}, encontrei seu perfil no PredialLink e gostaria de solicitar um orçamento.`
    );
    Linking.openURL(`https://wa.me/55${numeroLimpo}?text=${mensagem}`);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}
        >
          <Ionicons name="arrow-back" size={22} color="#0F2537" />
          <Text style={{ marginLeft: 6, color: '#0F2537', fontWeight: '600' }}>Voltar</Text>
        </TouchableOpacity>

        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <View style={{ position: 'relative' }}>
            {logoUrl ? (
              <Image
                source={{ uri: `${API_BASE_URL.replace('/api', '')}${logoUrl}` }}
                style={{ width: 88, height: 88, borderRadius: 44 }}
              />
            ) : (
              <View
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: 44,
                  backgroundColor: '#0F2537',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 28, fontWeight: 'bold' }}>
                  {iniciais}
                </Text>
              </View>
            )}

            {ehDono && (
              <TouchableOpacity
                onPress={alterarLogo}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  backgroundColor: '#E86C24',
                  padding: 7,
                  borderRadius: 16,
                }}
              >
                <Ionicons name="pencil" size={14} color="#FFFFFF" />
              </TouchableOpacity>
            )}
          </View>

          <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#0F2537', marginTop: 12 }}>
            {prestador.nomeFantasiaPrestador || 'Prestador'}
          </Text>
          <Text style={{ fontSize: 14, color: '#E86C24', fontWeight: '600', marginTop: 4 }}>
            {categoria}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            padding: 16,
            marginBottom: 20,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#0F2537' }}>
              Sobre o profissional
            </Text>
            {ehDono && (
              <TouchableOpacity onPress={() => setEditando(!editando)}>
                <Ionicons name="pencil" size={18} color="#0F2537" />
              </TouchableOpacity>
            )}
          </View>

          {editando ? (
            <View style={{ gap: 12 }}>
              <Text style={{ fontSize: 13, fontWeight: '600', color: '#0F2537' }}>
                Categoria de atuação
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {CATEGORIAS.map((cat) => {
                  const selecionada = categoria === cat;
                  return (
                    <TouchableOpacity
                      key={cat}
                      onPress={() => setCategoria(cat)}
                      style={{
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 20,
                        backgroundColor: selecionada ? '#0F2537' : '#EDF2F7',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '600',
                          color: selecionada ? '#FFFFFF' : '#0F2537',
                        }}
                      >
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <Text style={{ fontSize: 13, fontWeight: '600', color: '#0F2537' }}>
                Descrição dos serviços
              </Text>
              <TextInput
                value={descricao}
                onChangeText={setDescricao}
                multiline
                placeholder="Descreva sua experiência e serviços..."
                style={{
                  borderWidth: 1,
                  borderColor: '#CBD5E0',
                  borderRadius: 8,
                  padding: 12,
                  minHeight: 80,
                  textAlignVertical: 'top',
                  color: '#0F2537',
                }}
              />

              <TouchableOpacity
                onPress={salvarPerfil}
                disabled={salvando}
                style={{
                  backgroundColor: '#0F2537',
                  paddingVertical: 12,
                  borderRadius: 8,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                  {salvando ? 'Salvando...' : 'Salvar alterações'}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={{ fontSize: 14, color: '#4A5568', lineHeight: 20 }}>
              {descricao || 'Nenhuma descrição informada.'}
            </Text>
          )}
        </View>

        <TouchableOpacity
          onPress={abrirWhatsApp}
          style={{
            backgroundColor: '#25D366',
            paddingVertical: 14,
            borderRadius: 10,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <Ionicons name="logo-whatsapp" size={20} color="#FFFFFF" />
          <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 }}>
            Chamar no WhatsApp
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}