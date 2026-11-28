import { Linking } from 'react-native';
import { apiRequest } from '../integrations/api';

export async function listarPrestadores(categoria = 'Todas', busca = '') {
  const params = new URLSearchParams();
  if (categoria && categoria !== 'Todas') params.append('categoria', categoria);
  if (busca.trim()) params.append('busca', busca.trim());

  const query = params.toString() ? `?${params.toString()}` : '';
  return apiRequest(`/prestadores${query}`);
}

export function abrirWhatsAppPrestador(contatoPrestador, nomeFantasiaPrestador) {
  const numeroLimpo = String(contatoPrestador || '').replace(/\D/g, '');
  const numeroComDDI = numeroLimpo.startsWith('55') ? numeroLimpo : `55${numeroLimpo}`;
  const mensagem = encodeURIComponent(
    `Olá, ${nomeFantasiaPrestador}! Encontrei seu perfil no PredialLink e gostaria de solicitar um serviço.`
  );
  return Linking.openURL(`https://wa.me/${numeroComDDI}?text=${mensagem}`);
}