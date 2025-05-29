import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function VideosSection({ videos, renderVideo }) {
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
          {renderVideo(item)}
        </View>
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.carrousel}
    />
  );
}

const styles = StyleSheet.create({
  carrousel: {
    paddingHorizontal: 8,
    paddingVertical: 8,
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