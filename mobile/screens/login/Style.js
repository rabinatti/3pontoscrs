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
    marginBottom: 24,
  },
  textoVoltar: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F2537',
    marginLeft: 4,
  },
  cabecalho: {
    marginBottom: 28,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0F2537',
    marginBottom: 6,
  },
  subtitulo: {
    fontSize: 15,
    color: '#64748B',
  },
  formulario: {
    flex: 1,
  },
  botaoEntrar: {
    marginTop: 10,
  },
  linkCadastro: {
    marginTop: 24,
    alignItems: 'center',
  },
  textoCadastro: {
    fontSize: 14,
    color: '#64748B',
  },
  negrito: {
    color: '#F37021',
    fontWeight: 'bold',
  },
});

export default styles;