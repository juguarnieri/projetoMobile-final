import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import Header from '../components/Header';
import Category from '../components/Category';
import NoticiaCard from '../components/NoticiaCard';

export default function Search() {
    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(true);

useEffect(() => {
    fetch('http://10.88.200.168:4000/api/news', {
        headers: {
            'x-api-key': 'nUN1NOc7BuiiO7iSYR7gek0bxG821Z'
        }
    })
    .then(res => res.json())
    .then(data => {
        setNoticias(data.data || []); 
        setLoading(false);
    })
    .catch(err => {
        console.error('Erro ao buscar notícias:', err);
        setNoticias([]); 
        setLoading(false);
    });
}, []);

    return (
        <ScrollView style={styles.container}>
            <Header titleWhite="CRIME" titleRed="WHISPERS" />

            <Text style={styles.sectionTitle}>EXPLORAR</Text>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Pesquisar Notícias..."
                    placeholderTextColor="#888"
                />
            </View>

            <Category />

            {loading ? (
    <ActivityIndicator size="large" color="#900" style={{ marginTop: 32 }} />
) : (
    <View style={styles.cardContainer}>
        {noticias
            .filter(noticia => noticia.year >= 2023) 
            .map(noticia => (
                <NoticiaCard
                    key={noticia.id}
                    titulo={noticia.title}
                    imagem={noticia.image}
                />
            ))}
    </View>
)}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 20,
        marginLeft: 16,
    },
    searchContainer: {
        backgroundColor: "#ffffff",
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 10,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#f9f9f9',
        color: '#333',
    },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginTop: 16,
    },
});