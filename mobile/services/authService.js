import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiRequest } from '../integrations/api';

export async function cadastrarUsuario(dadosFormulario) {
  const [dia, mes, ano] = dadosFormulario.nascimento.split('/');

  const payload = {
    nomeUsuario: dadosFormulario.nome.trim(),
    senhaUsuario: dadosFormulario.senha,
    cpfUsuario: dadosFormulario.cpf.replace(/\D/g, ''),
    nascimentoUsuario: `${ano}-${mes}-${dia}`,
    emailUsuario: dadosFormulario.email.trim().toLowerCase(),
    celularUsuario: dadosFormulario.celular.replace(/\D/g, ''),
    cepUsuario: dadosFormulario.cep.replace(/\D/g, ''),
    logradouroUsuario: dadosFormulario.endereco.trim(),
    numeroCasaUsuario: dadosFormulario.numero.trim(),
    bairroUsuario: dadosFormulario.bairro.trim(),
    cidadeUsuario: dadosFormulario.cidade.trim(),
    ativoUsuario: true,
  };

  return apiRequest('/usuarios/cadastrar', {
    method: 'POST',
    body: payload,
  });
}

export async function loginUsuario(email, senha) {
  const resposta = await apiRequest('/auth/login', {
    method: 'POST',
    body: {
      emailUsuario: email.trim().toLowerCase(),
      senhaUsuario: senha,
    },
  });

  if (resposta?.token) {
    await AsyncStorage.setItem('@prediallink:token', resposta.token);
  }
  if (resposta?.usuario) {
    await AsyncStorage.setItem('@prediallink:usuario', JSON.stringify(resposta.usuario));
  }

  return resposta;
}

export async function obterUsuarioLogado() {
  const json = await AsyncStorage.getItem('@prediallink:usuario');
  return json ? JSON.parse(json) : null;
}

export async function logoutUsuario() {
  await AsyncStorage.multiRemove(['@prediallink:token', '@prediallink:usuario']);
}