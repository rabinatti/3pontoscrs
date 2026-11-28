import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HeaderApp from '../../components/headerApp/HeaderApp';
import styles from './Style';

import { obterUsuarioLogado } from '../../services/authService';
import { listarPedidosPorUsuario } from '../../services/pedidoService';

export default function MeusPedidosScreen({ navigation }) {
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    carregarPedidos();
  }, []);

  async function carregarPedidos() {
    setCarregando(true);
    try {
        const usuario = await obterUsuarioLogado();
        if (usuario?.idUsuario) {
        const dados = await listarPedidosPorUsuario(usuario.idUsuario);
        setPedidos(dados || []);
}
    } catch (erro) {
      console.error('Erro ao buscar pedidos:', erro);
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

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.titulo}>Meus Pedidos</Text>
        <Text style={styles.subtitulo}>Acompanhe solicitações e avaliações.</Text>

        {carregando ? (
          <ActivityIndicator size="large" color="#0F2537" style={{ marginTop: 30 }} />
        ) : pedidos.length === 0 ? (
          <View style={styles.vazioBox}>
            <Ionicons name="clipboard-outline" size={38} color="#94A3B8" />
            <Text style={styles.vazioTitulo}>Nenhuma solicitação encontrada</Text>
            <Text style={styles.vazioSub}>
              Os registros da tabela Pedido aparecerão aqui assim que o banco estiver conectado.
            </Text>
          </View>
        ) : (
          pedidos.map((pedido) => {
            const concluido = pedido.statusPedido === 'Concluída';
            return (
              <View key={pedido.idPedido} style={styles.cardPedido}>
                <View style={styles.topoCard}>
                  <Text style={styles.nomePrestador}>
                    {pedido.nomeFantasiaPrestador || `Prestador #${pedido.idPrestador}`}
                  </Text>

                  <View
                    style={[
                      styles.badgeStatus,
                      concluido ? styles.badgeConcluida : styles.badgeAndamento,
                    ]}
                  >
                    <Text
                      style={[
                        styles.textoStatus,
                        { color: concluido ? '#16A34A' : '#D97706' },
                      ]}
                    >
                      {pedido.statusPedido}
                    </Text>
                  </View>
                </View>

                <Text style={styles.metaDados}>
                  Pedido PED-{pedido.idPedido} • Início: {pedido.dataInicioPedido}
                </Text>

                {pedido.dataFinalizacaoPedido ? (
                  <Text style={styles.metaDados}>
                    Finalizado em: {pedido.dataFinalizacaoPedido}
                  </Text>
                ) : null}
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}