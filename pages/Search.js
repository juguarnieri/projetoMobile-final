import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Linking, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Banner from '../components/Banner';
import NoticiaImageCard from '../components/NoticiaImageCard';
import VideoCard from '../components/VideoCard';
import PodcastImageCard from '../components/PodcastImageCard';
import Feather from 'react-native-vector-icons/Feather';
import SearchBar from '../components/SearchBar';

const BASE_URL = 'http://localhost:4000';

function getImageUrl(imagem) {
    if (!imagem) return null;
    if (imagem.startsWith('http')) return imagem;
    if (imagem.startsWith('/')) return `${BASE_URL}${imagem}`;
    return `${BASE_URL}/uploads/${imagem}`;
}

function filtrarItens(itens, busca) {
    if (!busca) return itens;
    return itens.filter(item =>
        item.title && item.title.toLowerCase().includes(busca.toLowerCase())
    );
}


export default function Search() {
    const navigation = useNavigation();
    const [noticias, setNoticias] = useState([]);
    const [podcasts, setPodcasts] = useState([]);
    const [videos, setVideos] = useState([]);
    const [search, setSearch] = useState(""); 

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

        <SearchBar
          value={search}
          onChangeText={setSearch}
          onSearch={() => {
          }}
          placeholder="Pesquisar Notícias..."
        />

        <Text style={styles.sectionTitle}>NOTÍCIAS EM DESTAQUE</Text>
        <FlatList
            data={filtrarItens(noticias, search).filter((_, idx) => idx % 2 === 1)}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
        <View style={{ width: 250, margin: 8 }}>
            <NoticiaImageCard
            image={getImageUrl(item.image)}
            title={item.title}
            buttonText="Ler notícia"
            buttonColor="#070935" 
            onPress={() => navigation.navigate('NoticiaPage', { id: item.id })}
            />
        </View>
        
        )}
            contentContainerStyle={{ paddingHorizontal: 8 }}
        />
        <FlatList
            data={filtrarItens(noticias, search).filter((_, idx) => idx % 2 === 0)}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
        <View style={{ width: 250, margin: 8 }}>
            <NoticiaImageCard
            image={getImageUrl(item.image)}
            title={item.title}
            buttonText="Ler notícia"
            buttonColor="#070935"
            onPress={() => navigation.navigate('NoticiaPage', { id: item.id })}
        />
        </View>
        )}
            contentContainerStyle={{ paddingHorizontal: 8 }}
        />

        <Text style={styles.sectionTitle}>PODCASTS MAIS OUVIDOS</Text>

        <FlatList
            data={filtrarItens(podcasts, search).filter((_, idx) => idx % 2 === 0)}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <View style={{ width: 250, margin: 8 }}>
                    <PodcastImageCard
                        image={getImageUrl(item.image)}
                        title={item.title}
                        buttonText="Ouvir agora"
                        buttonColor="#d90429" 
                        onPress={() => {
                            if (item.link) {
                                Linking.openURL(item.link);
                            } else {
                                alert(`Ver podcast: ${item.title}`);
                            }
                        }}
                    />
                </View>
            )}
            contentContainerStyle={{ paddingHorizontal: 8 }}
        />

        <FlatList
            data={filtrarItens(podcasts, search).filter((_, idx) => idx % 2 === 1)}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <View style={{ width: 250, margin: 8 }}>
                    <PodcastImageCard
                        image={getImageUrl(item.image)}
                        title={item.title}
                        buttonText="Ouvir agora"
                        onPress={() => {
                            if (item.link) {
                                Linking.openURL(item.link);
                            } else {
                                alert(`Ver Podcast: ${item.title}`);
                            }
                        }}
                    />
                </View>
            )}
            contentContainerStyle={{ paddingHorizontal: 8 }}
        />

        <Text style={styles.sectionTitle}>VÍDEOS EM ALTA</Text>
        <FlatList
            data={filtrarItens(videos, search).slice(0, 10)}
            numColumns={2}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <View style={{ flex: 1, margin: 8 }}>
                    <VideoCard
                        titulo={item.title}
                        imagem={getImageUrl(item.image)}
                        onPress={() => {
                    if (item.link) {
                        Linking.openURL(item.link);
                    }
                }}
                    />
                </View>
            )}
            contentContainerStyle={{ paddingHorizontal: 8 }}
        />

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
        flexDirection: "row",
        alignItems: "center",
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
    searchIcon: {
        marginLeft: 8,
        marginRight: 4,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        color: '#333',
        backgroundColor: '#f9f9f9',
    },
});