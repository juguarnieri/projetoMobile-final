import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, ActivityIndicator, TextInput, Alert } from 'react-native';
import Card3 from '../components/Card3';
import bannerImage from '../assets/img/podcast.jpg';
import axios from 'axios';

export default function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

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

  const filteredPodcasts = (category) => {
    return podcasts
      .filter(p => p.category === category)
      .filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
  };

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
      <View style={styles.overlay}>
         <Text style={styles.bannerTitle}>
      {search ? 'RESULTADOS DA BUSCA' : 'TOP PODCASTS'}
    </Text>
  </View>
</View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar podcast..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {categorias.every(cat => filteredPodcasts(cat).length === 0) && (
        <Text style={styles.emptyMessage}>Nenhum podcast encontrado.</Text>
      )}

      {categorias.map((cat, i) => {
        const filtered = filteredPodcasts(cat);
        if (filtered.length === 0) return null;

        return (
          <View key={i} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{cat}</Text>
            <FlatList
              data={filtered}
              horizontal
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.podcastList}
              renderItem={({ item }) => (
                <Card3
                  imageUri={item.image || item.thumbnail}
                  title={item.title}
                  onPress={() => Alert.alert('Podcast selecionado', item.title)}
                />
              )}
            />
          </View>
        );
      })}
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
    width: '100%',
    height: 150,
    position: 'relative',
    marginBottom: 10,
  },  
  banner: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  titleCasos: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'transparent',
  },
  podcastList: {
    paddingLeft: 15,
    paddingVertical: 5,
  },
  categorySection: {
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 15,
    marginTop: 5,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  searchContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  searchInput: {
    height: 40,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  
});

