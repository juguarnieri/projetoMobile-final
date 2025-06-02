import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CardNoticia from '../components/CardNoticia';

const BASE_URL = 'http://localhost:4000';

export default function PaginaDecada70() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetch(`${BASE_URL}/api/news?decade=70`, {
      headers: { 'x-api-key': 'nUN1NOc7BuiiO7iSYR7gek0bxG821Z' }
    })
      .then(res => res.json())
      .then(data => {
        setNoticias(data.data || data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log('Erro ao buscar notícias:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#900" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#222' }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>CASOS CRIMINAIS</Text>
      </View>
      <FlatList
        ListHeaderComponent={
          noticias.length > 0 && (
            <View style={styles.topCard}>
              <Image
                source={{ uri: noticias[0]?.image }}
                style={styles.topImage}
                resizeMode="cover"
              />
              <View style={styles.topOverlay}>
                <Text style={styles.topDecade}>DÉCADA 1970</Text>
                <TouchableOpacity
                  style={styles.learnMoreBtn}
                  onPress={() => navigation.navigate('NoticiaPage', { id: noticias[0].id })}
                >
                  <Text style={styles.learnMoreText}>LEARN MORE</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        }
        data={noticias.slice(1)}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <CardNoticia
            image={item.image}
            title={item.title}
            description={item.description}
            id={item.id}
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#222' },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  headerTitle: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'left'
  },
  topCard: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative'
  },
  topImage: {
    width: '100%',
    height: 120,
  },
  topOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  topDecade: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 2
  },
  learnMoreBtn: {
    backgroundColor: '#d32f2f',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginLeft: 10
  },
  learnMoreText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13
  }

});