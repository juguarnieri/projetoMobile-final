import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import NewsDetailCard from '../components/NewsDetailCard';

export default function NoticiaPage() {
  const route = useRoute();
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
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
