import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function CustomButton({
  title,
  onPress,
  backgroundColor,
  textColor,
  borderColor,
  loading = false,
  style,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => {
        if (!loading && onPress) {
          onPress();
        }
      }}
      disabled={loading}
      style={[
        styles.button,
        {
          backgroundColor: backgroundColor || '#1D4ED8',
          borderColor: borderColor || 'transparent',
          opacity: loading ? 0.7 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor || '#FFFFFF'} />
      ) : (
        <Text style={[styles.buttonText, { color: textColor || '#FFFFFF' }]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 54,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.2,
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
  },
});