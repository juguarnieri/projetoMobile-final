import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';

export default function NewsDetailCard({ title, image, description, text, link }) {
  let validImage = { uri: 'https://placehold.co/230x150?text=Sem+Imagem' };

  if (typeof image === 'string' && image.trim() !== '') {
    if (image.startsWith('http') || image.startsWith('https')) {
      validImage = image;
    } else {
      validImage = `http://localhost:4000/uploads/${image}`;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: validImage }} style={styles.image} resizeMode="cover" />
        <View style={styles.content}>
          <Text style={styles.detailTitle}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.text}>{text}</Text>
          {link && (
            <TouchableOpacity onPress={() => Linking.openURL(link)}>
              <Text style={styles.button}>🔗 Ver fonte original</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '92%',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 24,
    marginTop: 32,
    marginBottom: 32,
  },
  card: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 0,
    gap: 0,
  },
  image: {
    width: '100%',
    height: 260,
    borderRadius: 24,
    marginBottom: 32,
    marginRight: 0,
  },
  content: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 10,
  },
  detailTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Sanchez',
    textAlign: 'center',
    marginBottom: 18,
  },
  description: {
    fontSize: 16,
    color: '#888',
    fontFamily: 'Sanchez',
    textAlign: 'center',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: '#222',
    fontFamily: 'Sanchez',
    textAlign: 'center',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#e53935',
    color: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 28,
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 24,
    borderRadius: 24,
    overflow: 'hidden',
    textAlign: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
});
