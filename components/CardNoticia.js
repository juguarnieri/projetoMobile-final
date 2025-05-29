import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function CardNoticia({ image, title, description, onPress }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDesc} numberOfLines={2}>{description}</Text>
        <TouchableOpacity style={styles.learnMoreBtn} onPress={onPress}>
          <Text style={styles.learnMoreText}>LEARN MORE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 6,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2
  },
  cardImage: {
    width: 90,
    height: 90,
  },
  cardContent: {
    flex: 1,
    padding: 10,
    justifyContent: 'center'
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
    color: '#222'
  },
  cardDesc: {
    fontSize: 13,
    color: '#444',
    marginBottom: 6
  },
  learnMoreBtn: {
    backgroundColor: '#d32f2f',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginLeft: 0,
    alignSelf: 'flex-start'
  },
  learnMoreText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13
  }
});