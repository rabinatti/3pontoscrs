import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppInput from '../../components/appInput/AppInput';
import AppButton from '../../components/appButton/AppButton';
import PoliticasModal from '../../components/politicasModal/PoliticasModal';
import styles from './Style';

import { cadastrarUsuario } from '../../services/authService';

export default function CadastroScreen({ navigation }) {
  const [etapa, setEtapa] = useState(1);
  const [erros, setErros] = useState({});
  const [aceitouPoliticas, setAceitouPoliticas] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false);

  // Estados dos campos
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [nascimento, setNascimento] = useState('');

  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');

  const [celular, setCelular] = useState('');
  const [email, setEmail] = useState('');

  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  function validarEtapaAtual() {
    const novosErros = {};

    if (etapa === 1) {
      if (nome.trim().length < 3) novosErros.nome = 'Informe seu nome completo.';
      if (cpf.replace(/\D/g, '').length !== 11) novosErros.cpf = 'CPF deve ter 11 dígitos.';
      if (nascimento.length !== 10) novosErros.nascimento = 'Data inválida (dd/mm/aaaa).';
    }

    if (etapa === 2) {
      if (cep.replace(/\D/g, '').length !== 8) novosErros.cep = 'CEP deve ter 8 dígitos.';
      if (!endereco.trim()) novosErros.endereco = 'Informe o logradouro.';
      if (!numero.trim()) novosErros.numero = 'Informe o número.';
      if (!bairro.trim()) novosErros.bairro = 'Informe o bairro.';
      if (!cidade.trim()) novosErros.cidade = 'Informe a cidade.';
    }

    if (etapa === 3) {
      if (celular.replace(/\D/g, '').length < 10) novosErros.celular = 'Celular inválido.';
      if (!email.includes('@')) novosErros.email = 'E-mail inválido.';
    }

    if (etapa === 4) {
      if (senha.length < 6) novosErros.senha = 'A senha deve ter no mínimo 6 caracteres.';
      if (senha !== confirmarSenha) novosErros.confirmarSenha = 'As senhas não coincidem.';
      if (!aceitouPoliticas) novosErros.politicas = 'Você precisa aceitar as Políticas de Utilização.';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  function avancarEtapa() {
    if (!validarEtapaAtual()) return;
    setEtapa(etapa + 1);
  }

  async function finalizarCadastro() {
    if (!validarEtapaAtual()) return;

    try {
        await cadastrarUsuario({
        nome,
        cpf,
        nascimento,
        cep,
        endereco,
        numero,
        bairro,
        cidade,
        celular,
        email,
        senha,
    });

    Alert.alert('Cadastro concluído!', 'Sua conta foi criada com sucesso.', [
      { text: 'Ir para Login', onPress: () => navigation.replace('Login') },
    ]);
    } catch (erro) {
        Alert.alert('Erro no cadastro', erro.message);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.voltar}
        onPress={() => (etapa > 1 ? setEtapa(etapa - 1) : navigation.goBack())}
      >
        <Ionicons name="chevron-back" size={20} color="#0F2537" />
        <Text style={styles.textoVoltar}>Criar conta</Text>
      </TouchableOpacity>

      {/* Barra de progresso das 4 etapas */}
      <View style={styles.barraProgresso}>
        {[1, 2, 3, 4].map((passo) => (
          <View
            key={passo}
            style={[styles.tracoProgresso, passo <= etapa && styles.tracoAtivo]}
          />
        ))}
      </View>

      <Text style={styles.indicadorEtapa}>ETAPA {etapa} DE 4</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {etapa === 1 && (
          <View>
            <Text style={styles.tituloEtapa}>Dados pessoais</Text>
            <AppInput
              label="Nome completo"
              value={nome}
              onChangeText={setNome}
              placeholder="Ana Souza"
              error={erros.nome}
            />
            <AppInput
              label="CPF"
              value={cpf}
              onChangeText={setCpf}
              placeholder="000.000.000-00"
              mask="cpf"
              keyboardType="numeric"
              error={erros.cpf}
            />
            <AppInput
              label="Data de nascimento"
              value={nascimento}
              onChangeText={setNascimento}
              placeholder="dd/mm/aaaa"
              mask="data"
              keyboardType="numeric"
              error={erros.nascimento}
            />
            <AppButton title="Continuar" onPress={avancarEtapa} />
          </View>
        )}

        {etapa === 2 && (
          <View>
            <Text style={styles.tituloEtapa}>Endereço residencial</Text>
            <AppInput
              label="CEP"
              value={cep}
              onChangeText={setCep}
              placeholder="01234-567"
              mask="cep"
              keyboardType="numeric"
              error={erros.cep}
            />
            <AppInput
              label="Endereço"
              value={endereco}
              onChangeText={setEndereco}
              placeholder="Rua, avenida"
              error={erros.endereco}
            />
            <View style={styles.linhaDupla}>
              <View style={styles.colunaMenor}>
                <AppInput
                  label="Número"
                  value={numero}
                  onChangeText={setNumero}
                  placeholder="123"
                  error={erros.numero}
                />
              </View>
              <View style={styles.colunaMaior}>
                <AppInput
                  label="Complemento"
                  value={complemento}
                  onChangeText={setComplemento}
                  placeholder="Apto 42"
                />
              </View>
            </View>
            <AppInput
              label="Bairro"
              value={bairro}
              onChangeText={setBairro}
              placeholder="Forte"
              error={erros.bairro}
            />
            <AppInput
              label="Cidade"
              value={cidade}
              onChangeText={setCidade}
              placeholder="Praia Grande"
              error={erros.cidade}
            />
            <View style={styles.botoesRodape}>
              <AppButton title="Voltar" variant="outline" onPress={() => setEtapa(1)} style={styles.flex1} />
              <AppButton title="Continuar" onPress={avancarEtapa} style={styles.flex1} />
            </View>
          </View>
        )}

        {etapa === 3 && (
          <View>
            <Text style={styles.tituloEtapa}>Contato</Text>
            <AppInput
              label="Celular/WhatsApp"
              value={celular}
              onChangeText={setCelular}
              placeholder="(13) 90000-0000"
              mask="celular"
              keyboardType="phone-pad"
              error={erros.celular}
            />
            <AppInput
              label="E-mail"
              value={email}
              onChangeText={setEmail}
              placeholder="voce@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              error={erros.email}
            />
            <Text style={styles.aviso}>
              Usaremos seu contato apenas para validação da conta e avisos do serviço.
            </Text>
            <View style={styles.botoesRodape}>
              <AppButton title="Voltar" variant="outline" onPress={() => setEtapa(2)} style={styles.flex1} />
              <AppButton title="Continuar" onPress={avancarEtapa} style={styles.flex1} />
            </View>
          </View>
        )}

        {etapa === 4 && (
          <View>
            <Text style={styles.tituloEtapa}>Criar senha de acesso</Text>
            <Text style={styles.subtituloLogin}>
              Seu login será realizado com o e-mail: <Text style={styles.negrito}>{email}</Text>
            </Text>

            <AppInput
              label="Senha"
              value={senha}
              onChangeText={setSenha}
              placeholder="Mínimo 6 caracteres"
              secureTextEntry
              error={erros.senha}
            />
            <AppInput
              label="Confirmar senha"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              placeholder="Repita a senha"
              secureTextEntry
              error={erros.confirmarSenha}
            />

            <TouchableOpacity
              style={styles.checkboxLinha}
              onPress={() => setModalVisivel(true)}
            >
              <Ionicons
                name={aceitouPoliticas ? 'checkbox' : 'square-outline'}
                size={22}
                color={aceitouPoliticas ? '#F37021' : '#64748B'}
              />
              <Text style={styles.textoCheckbox}>
                Li e aceito as <Text style={styles.linkPoliticas}>Políticas de Utilização</Text>.
              </Text>
            </TouchableOpacity>
            {erros.politicas ? <Text style={styles.textoErro}>{erros.politicas}</Text> : null}

            <View style={styles.botoesRodape}>
              <AppButton title="Voltar" variant="outline" onPress={() => setEtapa(3)} style={styles.flex1} />
              <AppButton title="Cadastrar" variant="secondary" onPress={finalizarCadastro} style={styles.flex1} />
            </View>
          </View>
        )}
      </ScrollView>

      <PoliticasModal
        visible={modalVisivel}
        onClose={() => setModalVisivel(false)}
        onAceitar={() => {
          setAceitouPoliticas(true);
          setModalVisivel(false);
        }}
      />
    </SafeAreaView>
  );
}