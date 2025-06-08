import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const BASE_URL = 'http://localhost:4000'; 

export default function CardNoticia({ image, title, description, id, onPress }) {
  const imageUrl = image?.startsWith('http') ? image : `${BASE_URL}/uploads/${image}`;

  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.cardImage} resizeMode="cover"/>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>{title}</Text>
        <Text style={styles.cardDesc} numberOfLines={2}>{description}</Text>
        <TouchableOpacity style={styles.learnMoreBtn} onPress={onPress}>
          <Text style={styles.learnMoreText}>Read more</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginHorizontal: 8,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 1,
    borderRadius: 12,
    alignItems: 'center',
    minHeight: 80,
    maxHeight: 90,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: "#eee",
  },
  cardContent: {
    flex: 1,
    paddingVertical: 4,
    justifyContent: 'center'
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 2,
    color: '#222'
  },
  cardDesc: {
    fontSize: 12,
    color: '#444',
    marginBottom: 4
  },
  learnMoreBtn: {
    backgroundColor: '#d32f2f',
    borderRadius: 14,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginLeft: 0,
    alignSelf: 'flex-start',
    minHeight: 22,
    minWidth: 60,
  },
  learnMoreText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'center',
    letterSpacing: 0.2,
  }
});