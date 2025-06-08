import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import CardNoticia from '../components/CardNoticia';
import Header from '../components/Header';
import Banner from '../components/Banner';
import bannerImage from '../assets/img/dec80.png'; 

const BASE_URL = 'http://localhost:4000';

export default function PaginaDecada80() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetch(`${BASE_URL}/api/news?decade=80`, {
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
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header />
      <Banner
        image={bannerImage}
        title="DÉCADA DE 80"
      />

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <View style={styles.backButtonContent}>
          <Ionicons name="arrow-back" size={18} color="#000339" />
          <Text style={styles.backButtonText}>Voltar</Text>
        </View>
      </TouchableOpacity> 

      <FlatList
        data={noticias}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <CardNoticia
            image={item.image}
            title={item.title}
            description={item.description}
            id={item.id}
            onPress={() => navigation.navigate('NoticiaPage', { id: item.id })}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.line} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    marginTop: 20,
    marginLeft: 16,
    marginBottom: 8,
    alignSelf: 'flex-start',
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
  line: {
    height: 1,
    backgroundColor: 'black',
    marginHorizontal: 16,
  }
});