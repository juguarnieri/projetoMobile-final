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
        <Text style={styles.cardDesc} numberOfLines={5}>{description}</Text>
        <TouchableOpacity 
          style={styles.learnMoreBtn} 
          onPress={onPress}
        >
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
    marginVertical: 12,
    overflow: 'hidden',
    elevation: 2,
    borderRadius: 16,
    alignItems: 'center',
    height:150,
    backgroundColor: "#e8e8e8",
    padding: 10, 
  },
  cardImage: {
    width: 110,   
    height: 110,  
    borderRadius: 12,
    marginRight: 14,
    backgroundColor: "#eee",
  },
  cardContent: {
    flex: 1,
    paddingVertical: 8, 
    justifyContent: 'center'
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 12, 
    marginBottom: 4,
    color: '#222'
  },
  cardDesc: {
    fontSize: 10, 
    color: '#444',
    marginBottom: 4, 
  },
  learnMoreBtn: {
    backgroundColor: '#d32f2f',
    borderRadius: 14,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginLeft: 0,
    alignSelf: 'flex-start',
    minHeight: 26,
    minWidth: 70,
  },
  learnMoreText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'center',
    letterSpacing: 0.2,
  }
});