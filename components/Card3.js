import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function Card3({ imageUri, title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 180,
    marginLeft: 15,
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 8,
  },
  title: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});


