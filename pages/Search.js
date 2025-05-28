import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function Search() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua busca..."
        placeholderTextColor="#888"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000339',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    color: 'white',
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});