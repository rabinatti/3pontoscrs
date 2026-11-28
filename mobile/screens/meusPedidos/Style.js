import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  scroll: {
    padding: 16,
    paddingBottom: 30,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F2537',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 18,
  },
  vazioBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  vazioTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F2537',
    marginTop: 10,
  },
  vazioSub: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 4,
  },
  cardPedido: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  topoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  nomePrestador: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F2537',
    flex: 1,
  },
  badgeStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeConcluida: {
    backgroundColor: '#DCFCE7',
  },
  badgeAndamento: {
    backgroundColor: '#FEF3C7',
  },
  textoStatus: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  metaDados: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
});

export default styles;