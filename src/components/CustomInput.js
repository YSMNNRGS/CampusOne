import React from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CustomInput({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  iconName = 'person-outline',
  keyboardType = 'default',
  backgroundColor = '#FFFFFF',
  textColor = '#0F172A',
  placeholderTextColor = '#64748B',
  borderColor = '#D9E2EC',
}) {
  return (
    <View style={[styles.inputBox, { backgroundColor, borderColor }]}>
      <Ionicons
        name={iconName}
        size={20}
        color={placeholderTextColor}
        style={styles.icon}
      />

      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!!secureTextEntry}
        keyboardType={secureTextEntry ? 'default' : keyboardType}
        placeholderTextColor={placeholderTextColor}
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        selectionColor={textColor}
        textContentType={secureTextEntry ? 'password' : 'none'}
        autoComplete={secureTextEntry ? 'password' : 'off'}
        style={[
          styles.input,
          { color: textColor },
          Platform.OS === 'web' ? styles.webInputFix : null,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 14,
    height: 58,
    marginBottom: 14,
  },

  icon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 15,
    height: '100%',
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },

  webInputFix: {
    outlineStyle: 'none',
    boxShadow: 'none',
  },
});