import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import NewsDetailCard from '../components/NewsDetailCard';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function NoticiaPage() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;

  const [noticia, setNoticia] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function fetchNoticia() {
      try {
        const res = await fetch(`http://localhost:4000/api/news/${id}`, {
          headers: {
            'x-api-key': 'nUN1NOc7BuiiO7iSYR7gek0bxG821Z',
          },
        });

        if (!res.ok) {
          throw new Error('Erro ao buscar a notícia');
        }

        const json = await res.json();
        setNoticia(json.data);
      } catch (error) {
        console.error(error);
        setErro('Erro ao carregar a notícia.');
      }
    }

    if (id) {
      fetchNoticia();
    }
  }, [id]);

  if (erro) {
    return <Text style={styles.error}>{erro}</Text>;
  }

  if (!noticia) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backBtn}
        activeOpacity={0.8}
      >
        <View style={styles.backCircle}>
          <Ionicons name="arrow-back" size={18} color="#fff" />
        </View>
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

      <NewsDetailCard
        title={noticia.title}
        image={noticia.image}
        description={noticia.description}
        text={noticia.text}
        link={noticia.link}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  backCircle: {
    width: 33,
    height: 33,
    borderRadius: 22,
    backgroundColor: '#000339',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    elevation: 3,
  },
  backText: {
    color: '#000339',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.5,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
