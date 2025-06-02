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
          <Text style={styles.description}>{text}</Text>
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
    width: '100%',
    flexDirection: 'column',
    fontFamily: 'Sanchez', 
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    gap: 18,
  },
  image: {
    width: 230,
    height: 150,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginRight: 18,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 6,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Sanchez',
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
    fontFamily: 'Sanchez',
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#e53935',
    color: '#fff',
    paddingVertical: 7,
    paddingHorizontal: 20,
    fontSize: 15,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginTop: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
});
