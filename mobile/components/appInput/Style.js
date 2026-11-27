import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F2537',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#0F2537',
  },
  inputErro: {
    borderColor: '#DC2626',
    backgroundColor: '#FEF2F2',
  },
  textoErro: {
    color: '#DC2626',
    fontSize: 12,
    marginTop: 4,
  },
});

export default styles;