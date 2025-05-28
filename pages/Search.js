import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import Banner from '../components/Banner';
import NoticiaCard from '../components/NoticiaCard';
import PodcastCard from '../components/PodcastCard';
import VideoCard from '../components/VideoCard';


const BASE_URL = 'http://192.168.5.193:4000';

function getImageUrl(imagem) {
    if (!imagem) return null;
    if (imagem.startsWith('http')) return imagem;
    return `${BASE_URL}${imagem}`;
}

export default function Search() {
    const [noticias, setNoticias] = useState([]);
    const [podcasts, setPodcasts] = useState([]);
    const [videos, setVideos] = useState([]);
    const [loadingNoticias, setLoadingNoticias] = useState(true);
    const [loadingPodcasts, setLoadingPodcasts] = useState(true);
    const [loadingVideos, setLoadingVideos] = useState(true);

    useEffect(() => {
        fetch(`${BASE_URL}/api/news/featured`, {
            headers: { 'x-api-key': 'nUN1NOc7BuiiO7iSYR7gek0bxG821Z' }
        })
        .then(res => res.json())
        .then(data => setNoticias(data.data || data || []))
        .finally(() => setLoadingNoticias(false));

        fetch(`${BASE_URL}/api/podcasts/featured`, {
            headers: { 'x-api-key': 'nUN1NOc7BuiiO7iSYR7gek0bxG821Z' }
        })
        .then(res => res.json())
        .then(data => setPodcasts(data.data || data || []))
        .finally(() => setLoadingPodcasts(false));

        fetch(`${BASE_URL}/api/videos/featured`, {
            headers: { 'x-api-key': 'nUN1NOc7BuiiO7iSYR7gek0bxG821Z' }
        })
        .then(res => res.json())
        .then(data => setVideos(data.data || data || []))
        .finally(() => setLoadingVideos(false));
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Banner image={require("../assets/img/banner3.png")} />

            <Text style={styles.sectionTitle}>EXPLORAR</Text>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Pesquisar Notícias..."
                    placeholderTextColor="#888"
                />
            </View>
            <Text style={styles.sectionTitle}>NOTÍCIAS EM DESTAQUE</Text>
            {loadingNoticias ? (
                <ActivityIndicator size="large" color="#900" style={{ marginTop: 32 }} />
            ) : (
                <FlatList
                    data={noticias.slice(0, 10)}
                    numColumns={2}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1, margin: 8 }}>
                            <NoticiaCard
                                titulo={item.title}
                                imagem={getImageUrl(item.image)}
                            />
                        </View>
                    )}
                    contentContainerStyle={{ paddingHorizontal: 8 }}
                />
            )}

            <Text style={styles.sectionTitle}>PODCASTS FAMOSOS</Text>
            {loadingPodcasts ? (
                <ActivityIndicator size="large" color="#900" style={{ marginTop: 32 }} />
            ) : (
                <FlatList
                    data={podcasts.slice(0, 10)}
                    numColumns={2}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1, margin: 8 }}>
                            <PodcastCard
                                titulo={item.title}
                                imagem={getImageUrl(item.image)}
                            />
                        </View>
                    )}
                    contentContainerStyle={{ paddingHorizontal: 8 }}
                />
            )}

            <Text style={styles.sectionTitle}>VÍDEOS IMPORTANTES</Text>
            {loadingVideos ? (
                <ActivityIndicator size="large" color="#900" style={{ marginTop: 32 }} />
            ) : (
                <FlatList
                    data={videos.slice(0, 10)}
                    numColumns={2}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1, margin: 8 }}>
                            <VideoCard
                                titulo={item.title}
                                imagem={getImageUrl(item.image)}
                            />
                        </View>
                    )}
                    contentContainerStyle={{ paddingHorizontal: 8 }}
                />
            )}
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000339',
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
    }
});   