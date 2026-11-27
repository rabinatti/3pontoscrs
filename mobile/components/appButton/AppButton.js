import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './Style';

export default function AppButton({
  title,
  onPress,
  variant = 'primary',
  icon,
  loading = false,
  disabled = false,
  style,
}) {
  const corTexto = variant === 'outline' ? '#0F2537' : '#FFFFFF';

  return (
    <TouchableOpacity
      style={[
        styles.botao,
        styles[variant],
        (disabled || loading) && styles.desabilitado,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={corTexto} />
      ) : (
        <>
          {icon ? (
            <Ionicons name={icon} size={18} color={corTexto} style={styles.icone} />
          ) : null}
          <Text style={[styles.texto, { color: corTexto }]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}
