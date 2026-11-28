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
  banner: {
    backgroundColor: '#0F2537',
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
  },
  tagBanner: {
    color: '#F37021',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 6,
  },
  tituloBanner: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descBanner: {
    color: '#CBD5E1',
    fontSize: 13,
    lineHeight: 19,
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
  cardPacote: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardDestaque: {
    borderColor: '#F37021',
    borderWidth: 2,
  },
  badgePopular: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  textoBadgePopular: {
    color: '#F37021',
    fontSize: 11,
    fontWeight: 'bold',
  },
  nomePacote: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F2537',
    marginBottom: 8,
  },
  linhaPreco: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 14,
  },
  valor: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0F2537',
  },
  periodo: {
    fontSize: 13,
    color: '#64748B',
    marginLeft: 4,
  },
  listaBeneficios: {
    gap: 8,
    marginBottom: 18,
  },
  itemBeneficio: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  textoBeneficio: {
    fontSize: 14,
    color: '#475569',
  },
});

export default styles;