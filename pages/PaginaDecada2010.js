import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import CardNoticia from '../components/CardNoticia';
import Header from '../components/Header';

const BASE_URL = 'http://localhost:4000';

export default function PaginaDecada2010() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetch(`${BASE_URL}/api/news?decade=10`, {
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
    <ScrollView>
      <Header 
        titleWhite='CRIME'
        titleRed='WHISPERS'
      />

          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <View style={styles.backButtonContent}>
          <Ionicons name="arrow-back" size={20} color="#000339" />
          <Text style={styles.backButtonText}>Voltar</Text>
        </View>
      </TouchableOpacity> 
      
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
                <Text style={styles.topDecade}>DÉCADA 2010</Text>
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
        
        ItemSeparatorComponent={() => <View style={styles.line} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginTop: 20,
    marginLeft: 16,
    marginBottom: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    elevation: 2,
  },
  backButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#000339',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  topCard: {
    overflow: 'hidden',
    position: 'relative', 
    marginBottom: 10,
  },
  topImage: {
    width: '100%',
    height: 200,
  },
  topOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topDecade: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 2
  },
  line: {
    height: 1,
    backgroundColor: 'black',
    marginHorizontal: 16,
  }
});