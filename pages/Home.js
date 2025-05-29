import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, Image } from 'react-native';
import Header from '../components/Header';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Card1 from '../components/Card1';
import Card2 from '../components/Card2';
import bannerImage from '../assets/img/podcast.jpg';
import axios from 'axios';

export default function Home() {
  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [podcasts, setPodcasts] = useState([]);
  const [loadingPodcasts, setLoadingPodcasts] = useState(true);

  const API_KEY = 'nUN1NOc7BuiiO7iSYR7gek0bxG821Z';

  useEffect(() => {
    fetchNews();
    fetchPodcasts();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get('http://10.88.200.188:4000/api/news', {
        headers: { 'x-api-key': API_KEY }
      });
      setNews(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar notícias:", error);
    } finally {
      setLoadingNews(false);
    }
  };

  const fetchPodcasts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/podcasts', {
        headers: { 'x-api-key': API_KEY }
      });
      setPodcasts(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar podcasts:", error);
    } finally {
      setLoadingPodcasts(false);
    }
  };

  const categorias = [];
  podcasts.forEach(p => {
    if (p.category && !categorias.includes(p.category)) {
      categorias.push(p.category);
    }
  });

  if (loadingNews || loadingPodcasts) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Header titleWhite="CRIME" titleRed="WHISPERS" />

      <View style={styles.buttons}>
        <View style={styles.block}>
          <Text style={styles.title}>CW</Text>
        </View>

        <TouchableOpacity style={styles.gearButton}>
          <FontAwesome name="gear" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.textNoticia}>
        <Text style={styles.titleNoticia}>Notícias do dia</Text>
      </View>

      <View style={styles.line} />

      {news.map((item, index) => (
        <View key={index}>
          <Card1 imageUri={item.image} title={item.title} />
          <View style={styles.line} />
        </View>
      ))}
      
      <View style={styles.bannerContainer}>
        <Image
        source={bannerImage}
        style={styles.banner}
        resizeMode="cover"
        />
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
  block: {
    backgroundColor: 'red',
    width: 30,
    height: 30,
    marginLeft: 20,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 5,
  },
  gearButton: {
    marginRight: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  titleNoticia: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'left',
    marginTop: 10,
    marginLeft: 30,
  },
  line: {
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    color: '#000000',
    marginLeft: 30,
    marginTop: 10,
    textTransform: 'capitalize',
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
    textShadowColor: 'transparent', 
  },
});
