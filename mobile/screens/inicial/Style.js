import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F2537',
    padding: 24,
    justifyContent: 'space-between',
  },
  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  marca: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconeMarca: {
    backgroundColor: '#F37021',
    padding: 8,
    borderRadius: 10,
  },
  nomeMarca: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tags: {
    flexDirection: 'row',
    gap: 6,
  },
  tag: {
    color: '#CBD5E1',
    fontSize: 11,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  centro: {
    gap: 14,
  },
  subtitulo: {
    color: '#F37021',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  descricao: {
    color: '#CBD5E1',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 10,
  },
  acoes: {
    gap: 12,
  },
  rodape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.12)',
    paddingTop: 16,
  },
  selo: {
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  textoSelo: {
    color: '#CBD5E1',
    fontSize: 11,
    textAlign: 'center',
  },
});

export default styles;