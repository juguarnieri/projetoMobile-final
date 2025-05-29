import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function Card2({ imageUri, title }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </View>
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
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});
