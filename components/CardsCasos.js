import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function CardCasos({ imageUri, title }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
      <View style={styles.overlay}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 130,          
    height: 90,        
    overflow: 'hidden',
    elevation: 3,
    marginHorizontal: 2, 
    marginTop: 6,         
    borderRadius: 10,
    backgroundColor: "#222",
  },
  image: {
    width: '100%',       
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 8,
    alignItems: 'flex-start',
    paddingLeft: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'left',
  },
});