import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HeaderApp from '../../components/headerApp/HeaderApp';
import AppButton from '../../components/appButton/AppButton';
import styles from './Style';

import { Alert } from 'react-native'; // adicione Alert aos imports do react-native
import { obterUsuarioLogado } from '../../services/authService';
import { listarPacotes, simularAssinatura } from '../../services/pacoteService';

export default function PlanosScreen({ navigation }) {
  const [pacotes, setPacotes] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [nomeFantasia, setNomeFantasia] = useState('');
const [categoriaEscolhida, setCategoriaEscolhida] = useState('Elétrica');

  useEffect(() => {
    carregarPacotes();
  }, []);

    async function carregarPacotes() {
        setCarregando(true);
        try {
            const dados = await listarPacotes();
            setPacotes(dados || []);
        } catch (erro) {
        console.error('Erro ao buscar pacotes:', erro);
        } finally {
        setCarregando(false);
        }
    }

    async function handleAssinarPlano(pacote) {
    try {
        const usuario = await obterUsuarioLogado();
        if (!usuario?.idUsuario) {
        Alert.alert('Atenção', 'Faça login novamente para assinar.');
        return;
        }

        await simularAssinatura({
        idUsuario: usuario.idUsuario,
        idPacote: pacote.idPacote,
        nomeFantasiaPrestador: nomeFantasia.trim() || usuario.nomeUsuario,
        categoriaServico: categoriaEscolhida,
        descricaoPrestador: 'Serviços prediais e residenciais com garantia.',
        });

        Alert.alert(
        'Pagamento Aprovado!',
        'Seu perfil de prestador já está ativo e visível na busca.',
        [{ text: 'Ir para o Catálogo', onPress: () => navigation.navigate('Catalogo') }]
        );
    } catch (erro) {
        Alert.alert('Erro ao assinar', erro.message);
    }
    }

    return (
        <SafeAreaView style={styles.container}>
        <HeaderApp
            nomeUsuario="Usuário"
            onSair={() => navigation.replace('Inicial')}
        />

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
            <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={18} color="#0F2537" />
            <Text style={styles.textoVoltar}>Voltar</Text>
            </TouchableOpacity>

            {/* Banner de Chamada */}
            <View style={styles.banner}>
            <Text style={styles.tagBanner}>QUERO SER PRESTADOR</Text>
            <Text style={styles.tituloBanner}>Seu trabalho visto por quem precisa.</Text>
            <Text style={styles.descBanner}>
                Prestador também é usuário. Crie sua vitrine, receba solicitações e construa reputação com avaliações reais.
            </Text>
            </View>

            {carregando ? (
            <ActivityIndicator size="large" color="#0F2537" style={{ marginTop: 30 }} />
            ) : pacotes.length === 0 ? (
            <View style={styles.vazioBox}>
                <Ionicons name="pricetags-outline" size={38} color="#94A3B8" />
                <Text style={styles.vazioTitulo}>Nenhum pacote carregado</Text>
                <Text style={styles.vazioSub}>
                Os planos cadastrados na tabela Pacote aparecerão aqui assim que o banco estiver conectado.
                </Text>
            </View>
            ) : (
            pacotes.map((pacote) => (
                <View
                key={pacote.idPacote}
                style={[styles.cardPacote, pacote.destaqueBusca && styles.cardDestaque]}
                >
                {pacote.destaqueBusca ? (
                    <View style={styles.badgePopular}>
                    <Text style={styles.textoBadgePopular}>MAIS POPULAR</Text>
                    </View>
                ) : null}

                <Text style={styles.nomePacote}>{pacote.nomepacote}</Text>

                <View style={styles.linhaPreco}>
                    <Text style={styles.valor}>
                    R$ {Number(pacote.valorMensalPacote).toFixed(2).replace('.', ',')}
                    </Text>
                    <Text style={styles.periodo}>/mês</Text>
                </View>

                <View style={styles.listaBeneficios}>
                    <View style={styles.itemBeneficio}>
                    <Ionicons name="checkmark-circle" size={16} color="#16A34A" />
                    <Text style={styles.textoBeneficio}>
                        Até {pacote.limiteFotos} fotos no portfólio
                    </Text>
                    </View>

                    <View style={styles.itemBeneficio}>
                    <Ionicons
                        name={pacote.destaqueBusca ? 'checkmark-circle' : 'remove-circle-outline'}
                        size={16}
                        color={pacote.destaqueBusca ? '#16A34A' : '#94A3B8'}
                    />
                    <Text style={styles.textoBeneficio}>
                        {pacote.destaqueBusca
                        ? 'Destaque nos resultados de busca'
                        : 'Exibição padrão na busca local'}
                    </Text>
                    </View>
                </View>

                <AppButton
                    title="Assinar Agora"
                    variant={pacote.destaqueBusca ? 'secondary' : 'primary'}
                    icon="checkmark-circle-outline"
                    onPress={() => handleAssinarPlano(pacote)}
                />
                </View>
            ))
            )}
        </ScrollView>
        </SafeAreaView>
    );
}