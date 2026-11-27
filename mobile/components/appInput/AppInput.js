import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './Style';

// Funções que aplicam a máscara enquanto o usuário digita
function aplicarMascara(tipo, valor) {
  const apenasNumeros = valor.replace(/\D/g, '');

  if (tipo === 'cpf') {
    return apenasNumeros
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  if (tipo === 'data') {
    return apenasNumeros
      .slice(0, 8)
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2');
  }

  if (tipo === 'cep') {
    return apenasNumeros
      .slice(0, 8)
      .replace(/(\d{5})(\d)/, '$1-$2');
  }

  if (tipo === 'celular') {
    return apenasNumeros
      .slice(0, 11)
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2');
  }

  return valor;
}

export default function AppInput({
  label,
  value,
  onChangeText,
  placeholder,
  mask,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
}) {
  function handleChange(textoDigitado) {
    const textoFinal = mask ? aplicarMascara(mask, textoDigitado) : textoDigitado;
    onChangeText(textoFinal);
  }

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <TextInput
        style={[styles.input, error ? styles.inputErro : null]}
        value={value}
        onChangeText={handleChange}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />

      {error ? <Text style={styles.textoErro}>{error}</Text> : null}
    </View>
  );
}
