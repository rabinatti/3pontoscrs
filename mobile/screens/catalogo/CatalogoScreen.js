import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HeaderApp from '../../components/headerApp/HeaderApp';
import AppButton from '../../components/appButton/AppButton';
import styles from './Style';

const CATEGORIAS = ['Todas', 'Elétrica', 'Hidráulica', 'Pintura', 'Ar-condicionado'];

export default function CatalogoScreen({ navigation }) {
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas');
  const [prestadores, setPrestadores] = useState([]);
  const [carregando, setCarregando] = useState(false);

  // Preparado para buscar os dados reais da tabela Prestador no back-end
  useEffect(() => {
    carregarPrestadores();
  }, [categoriaAtiva, busca]);

  async function carregarPrestadores() {
    setCarregando(true);
    try {
      // Quando o back-end estiver rodando, substitua pelo fetch:
      // const res = await fetch(`http://10.0.2.2:3000/api/prestadores?categoria=${categoriaAtiva}&busca=${busca}`);
      // const dados = await res.json();
      // setPrestadores(dados);
      setPrestadores([]);
    } catch (erro) {
      console.error('Erro ao carregar prestadores:', erro);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderApp
        nomeUsuario="Usuário"
        onSair={() => navigation.replace('Inicial')}
      />

      {/* Área de busca fixa no topo */}
      <View style={styles.areaBusca}>
        <View style={styles.caixaBusca}>
          <Ionicons name="search" size={18} color="#94A3B8" />
          <TextInput
            style={styles.inputBusca}
            value={busca}
            onChangeText={setBusca}
            placeholder="Buscar: eletricista, hidráulica, pintura..."
            placeholderTextColor="#94A3B8"
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Filtros de Categoria */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.listaCategorias}>
          {CATEGORIAS.map((cat) => {
            const ativa = categoriaAtiva === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.chipCategoria, ativa && styles.chipAtiva]}
                onPress={() => setCategoriaAtiva(cat)}
              >
                <Text style={[styles.textoChip, ativa && styles.textoChipAtivo]}>{cat}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.barraContagem}>
          <Text style={styles.textoOrdem}>⇅ Ordem A–Z</Text>
          <Text style={styles.textoContagem}>{prestadores.length} prestadores encontrados</Text>
        </View>

        {/* Banner Divulgação */}
        <View style={styles.bannerPrestador}>
          <View style={styles.iconeBanner}>
            <Ionicons name="hammer" size={22} color="#FFFFFF" />
          </View>
          <View style={styles.textoBannerContainer}>
            <Text style={styles.tituloBanner}>Você também é prestador?</Text>
            <Text style={styles.descBanner}>
              Divulgue seu trabalho para condomínios e empresas.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.botaoBanner}
            onPress={() => navigation.navigate('Ser Prestador')}
          >
            <Text style={styles.textoBotaoBanner}>Ver pacotes</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de Prestadores */}
        {carregando ? (
          <ActivityIndicator size="large" color="#0F2537" style={{ marginTop: 30 }} />
        ) : prestadores.length === 0 ? (
          <View style={styles.vazioBox}>
            <Ionicons name="construct-outline" size={36} color="#94A3B8" />
            <Text style={styles.vazioTitulo}>Nenhum prestador carregado</Text>
            <Text style={styles.vazioSub}>
              Conecte o back-end para listar os registros da tabela Prestador.
            </Text>
          </View>
        ) : (
          prestadores.map((item) => (
            <View key={item.idUsuario} style={styles.cardPrestador}>
              <View style={styles.topoCard}>
                <View style={styles.logoBox}>
                  <Text style={styles.logoTexto}>
                    {item.nomeFantasiaPrestador?.substring(0, 2).toUpperCase()}
                  </Text>
                </View>

                <View style={styles.infoCard}>
                  <Text style={styles.nomePrestador}>{item.nomeFantasiaPrestador}</Text>
                  <Text style={styles.categoriaPrestador}>{item.categoriaServico}</Text>
                  <View style={styles.badgeStatus}>
                    <Ionicons
                      name={item.disponivelPrestador ? 'checkmark-circle' : 'close-circle'}
                      size={14}
                      color={item.disponivelPrestador ? '#16A34A' : '#DC2626'}
                    />
                    <Text
                      style={[
                        styles.textoBadge,
                        { color: item.disponivelPrestador ? '#16A34A' : '#DC2626' },
                      ]}
                    >
                      {item.disponivelPrestador ? 'Disponível' : 'Indisponível'}
                    </Text>
                  </View>
                </View>
              </View>

              <AppButton
                title="Ver Perfil"
                onPress={() => navigation.navigate('PerfilPrestador', { prestador: item })}
              />
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}