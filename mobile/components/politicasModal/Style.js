import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: 'rgba(15, 37, 55, 0.7)',
    justifyContent: 'flex-end',
  },
  cartao: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '80%',
  },
  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F2537',
  },
  conteudo: {
    marginBottom: 20,
  },
  paragrafo: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 21,
    marginBottom: 12,
  },
  negrito: {
    fontWeight: 'bold',
    color: '#0F2537',
  },
});

export default styles;