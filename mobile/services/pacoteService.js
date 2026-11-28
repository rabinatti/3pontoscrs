import { apiRequest } from '../integrations/api';

export async function listarPacotes() {
  return apiRequest('/pacotes');
}

export async function simularAssinatura({ idUsuario, idPacote, nomeFantasiaPrestador, categoriaServico, descricaoPrestador }) {
  return apiRequest('/assinaturas/simular', {
    method: 'POST',
    body: {
      idUsuario,
      idPacote,
      nomeFantasiaPrestador,
      categoriaServico,
      descricaoPrestador,
    },
  });
}