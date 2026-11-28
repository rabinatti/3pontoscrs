import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 24,
  },
  voltar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  textoVoltar: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F2537',
    marginLeft: 4,
  },
  barraProgresso: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  tracoProgresso: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E2E8F0',
  },
  tracoAtivo: {
    backgroundColor: '#F37021',
  },
  indicadorEtapa: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#F37021',
    marginBottom: 4,
  },
  tituloEtapa: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F2537',
    marginBottom: 18,
  },
  subtituloLogin: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 16,
  },
  negrito: {
    fontWeight: 'bold',
    color: '#0F2537',
  },
  linhaDupla: {
    flexDirection: 'row',
    gap: 12,
  },
  colunaMenor: {
    flex: 1,
  },
  colunaMaior: {
    flex: 2,
  },
  aviso: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 20,
    lineHeight: 19,
  },
  checkboxLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 12,
  },
  textoCheckbox: {
    fontSize: 14,
    color: '#0F2537',
    flex: 1,
  },
  linkPoliticas: {
    color: '#F37021',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  textoErro: {
    color: '#DC2626',
    fontSize: 12,
    marginBottom: 8,
  },
  botoesRodape: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
    marginBottom: 30,
  },
  flex1: {
    flex: 1,
  },
});

export default styles;