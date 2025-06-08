import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>
        <Text style={styles.crime}>CRIME</Text>
        <Text style={styles.whispers}>WHISPERS</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: '#000339',
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
    flexDirection: 'row',
  },
  crime: {
    color: '#fff',
    fontWeight: 'bold',
  },
  whispers: {
    color: '#d90429',
    fontWeight: 'bold',
  },
});