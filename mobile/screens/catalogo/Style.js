import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  areaBusca: {
    backgroundColor: '#0F2537',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  caixaBusca: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E3A52',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
  },
  inputBusca: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
  },
  scroll: {
    padding: 16,
    paddingBottom: 30,
  },
  listaCategorias: {
    marginBottom: 14,
  },
  chipCategoria: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipAtiva: {
    backgroundColor: '#0F2537',
    borderColor: '#0F2537',
  },
  textoChip: {
    color: '#475569',
    fontWeight: '600',
    fontSize: 13,
  },
  textoChipAtivo: {
    color: '#FFFFFF',
  },
  barraContagem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  textoOrdem: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0F2537',
  },
  textoContagem: {
    fontSize: 12,
    color: '#64748B',
  },
  bannerPrestador: {
    backgroundColor: '#0F2537',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  iconeBanner: {
    backgroundColor: '#F37021',
    padding: 10,
    borderRadius: 12,
  },
  textoBannerContainer: {
    flex: 1,
  },
  tituloBanner: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 2,
  },
  descBanner: {
    color: '#CBD5E1',
    fontSize: 11,
    lineHeight: 15,
  },
  botaoBanner: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  textoBotaoBanner: {
    color: '#0F2537',
    fontWeight: 'bold',
    fontSize: 12,
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
  cardPrestador: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  topoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  logoBox: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: '#0F2537',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  infoCard: {
    flex: 1,
  },
  nomePrestador: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F2537',
  },
  categoriaPrestador: {
    fontSize: 13,
    color: '#64748B',
    marginVertical: 2,
  },
  badgeStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  textoBadge: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default styles;