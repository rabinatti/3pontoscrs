import { apiRequest } from '../integrations/api';

export async function listarPedidosPorUsuario(idUsuario) {
  return apiRequest(`/usuarios/${idUsuario}/pedidos`);
}

export async function realizarPedido(idUsuario, idPrestador) {
  return apiRequest('/pedidos', {
    method: 'POST',
    body: {
      idUsuario,
      idPrestador,
      dataInicioPedido: new Date().toISOString().split('T')[0],
      statusPedido: 'Em andamento',
    },
  });
}