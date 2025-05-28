import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

export default function VideosSection({ videos }) {
  if (!videos || videos.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhum vídeo encontrado.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={videos}
      keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          {item.thumbnail && (
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
          )}
          <Text style={styles.title}>{item.title}</Text>
        </View>
      )}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    elevation: 2,
  },
  thumbnail: {
    width: 320,
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
  },
});