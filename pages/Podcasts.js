import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, ActivityIndicator } from 'react-native';
import Card2 from '../components/Card3';
import bannerImage from '../assets/img/podcast.jpg';
import axios from 'axios';

export default function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = 'nUN1NOc7BuiiO7iSYR7gek0bxG821Z';

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const fetchPodcasts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/podcasts', {
        headers: { 'x-api-key': API_KEY }
      });
      setPodcasts(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar podcasts:", error);
    } finally {
      setLoading(false);
    }
  };

  const categorias = [];
  podcasts.forEach(p => {
    if (p.category && !categorias.includes(p.category)) {
      categorias.push(p.category);
    }
  });

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.bannerContainer}>
        <Image source={bannerImage} style={styles.banner} resizeMode="cover" />
        <Text style={styles.titleCasos}>Top Podcasts</Text>
      </View>

      {categorias.map((cat, i) => (
        <View key={i} style={styles.categorySection}>
          <Text style={styles.categoryTitle}>{cat}</Text>
          <FlatList
            data={podcasts.filter(p => p.category === cat)}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.podcastList}
            renderItem={({ item }) => (
              <Card2 imageUri={item.image || item.thumbnail} title={item.title} />
            )}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerContainer: {
    marginTop: 20,
    marginBottom: 10,
    position: 'relative',
    justifyContent: 'flex-end',
    width: '100%',
    height: 130,
    paddingLeft: 20,
    paddingBottom: 15,
  },
  banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    borderRadius: 0,
  },
  titleCasos: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'transparent',
  },
  podcastList: {
    paddingLeft: 30,
    paddingVertical: 10,
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 30,
    marginTop: 10,
    textTransform: 'capitalize',
  },
});
