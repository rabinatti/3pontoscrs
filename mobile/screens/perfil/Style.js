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
  cartaoUsuario: {
    backgroundColor: '#0F2537',
    borderRadius: 18,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  avatarGrande: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F37021',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarTexto: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoUsuario: {
    flex: 1,
  },
  nome: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    color: '#CBD5E1',
    fontSize: 13,
    marginTop: 2,
    marginBottom: 8,
  },
  seloVerificado: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  textoSelo: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  listaMenu: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  itemMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  semBorda: {
    borderBottomWidth: 0,
  },
  textoMenuBox: {
    flex: 1,
  },
  tituloItem: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0F2537',
  },
  subItem: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  boxAviso: {
    backgroundColor: '#FFF7ED',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FED7AA',
    marginBottom: 20,
  },
  tituloAviso: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#C2410C',
    marginBottom: 4,
  },
  textoAviso: {
    fontSize: 13,
    color: '#9A3412',
    lineHeight: 19,
  },
});

export default styles;