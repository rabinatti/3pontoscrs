import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  scroll: {
    padding: 16,
    paddingBottom: 32,
  },
  voltar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  textoVoltar: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F2537',
    marginLeft: 4,
  },
  cartao: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
  },
  bannerTopo: {
    height: 75,
    backgroundColor: '#0F2537',
  },
  corpoCartao: {
    padding: 18,
    marginTop: -35,
  },
  linhaAvatar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  logoBox: {
    width: 68,
    height: 68,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoTexto: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F2537',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  statusAtivo: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  statusInativo: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  statusTexto: {
    fontSize: 12,
    fontWeight: '600',
  },
  nomeFantasia: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F2537',
    marginBottom: 6,
  },
  tagCategoria: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 16,
  },
  textoCategoria: {
    color: '#F37021',
    fontWeight: 'bold',
    fontSize: 13,
  },
  tituloSecao: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0F2537',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  descricao: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 21,
    marginBottom: 16,
  },
  linhaContato: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  textoContato: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  botaoWhatsapp: {
    marginTop: 4,
  },
});

export default styles;