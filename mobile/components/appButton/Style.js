import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  botao: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primary: {
    backgroundColor: '#0F2537',
  },
  secondary: {
    backgroundColor: '#F37021',
  },
  outline: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
  },
  whatsapp: {
    backgroundColor: '#25D366',
  },
  desabilitado: {
    opacity: 0.5,
  },
  icone: {
    marginRight: 8,
  },
  texto: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default styles;