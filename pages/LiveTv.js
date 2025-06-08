import React, { useEffect, useState, useMemo } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import VideosSection from "../components/VideosSection";
import VideoItemCard from "../components/VideoItemCard";
import Banner from "../components/Banner";
import SearchBar from '../components/SearchBar';

const BASE_URL = 'http://localhost:4000';

function getImageUrl(imagem) {
    if (!imagem) return null;
    if (imagem.startsWith('http')) return imagem;
    if (imagem.startsWith('/')) return `${BASE_URL}${imagem}`;
    return `${BASE_URL}/uploads/${imagem}`;
}

export default function LiveTv() {
    const navigation = useNavigation();
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [current, setCurrent] = useState(1);
    const [favorites, setFavorites] = useState([]);
    const [pageSize] = useState(30);

    const fetchVideos = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:4000/api/videos", {
                headers: { "x-api-key": "nUN1NOc7BuiiO7iSYR7gek0bxG821Z" },
            });
            const data = await res.json();
            setVideos(data);
            setLoading(false);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);
    useEffect(() => {
        const lower = search.toLowerCase();
        setFilteredData(
            videos.filter(
                (v) =>
                    v.title?.toLowerCase().includes(lower) ||
                    v.description?.toLowerCase().includes(lower)
            )
        );
        setCurrent(1);
    }, [search, videos]);

    const paginated = useMemo(() => {
        return filteredData.slice((current - 1) * pageSize, current * pageSize);
    }, [filteredData, current, pageSize]);

    const handleFavorite = (video) => {
        setFavorites((prev) => ({
            ...prev,
            [video.id]: !prev[video.id]
        }));
    };
    
    const handleCardPress = (video) => {
        setVideoSelected(video);
    };

    const renderVideo = (video) => (
        <VideoItemCard
        titulo={video.title}
        imagem={getImageUrl(video.image)}
        descricao={video.description}
        link={video.link}
        onPress={() => handleCardPress(video)}
        isFavorite={favorites[video.id]}
        onPressFavorite={() => handleFavorite(video)}
    />
    );
    const videosByCategory = useMemo(() => {
        return paginated.reduce((acc, video) => {
            const category = video.category?.toLowerCase();
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(video);
            return acc;
        }, {});
    }, [paginated]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.bannerContainer}>
                <Banner image={require("../assets/img/bannerlivetv.png")} styles={styles.banner} />
                <View style={styles.overlay}>
                    <Text style={styles.sectionTitle}>VÍDEOS</Text>
                </View>
            </View>

            <SearchBar
                value={searchInput}
                onChangeText={setSearchInput}
                onSearch={() => setSearch(searchInput)}
                placeholder="Pesquisar Vídeos..."
            />

            {Object.entries(videosByCategory).map(([category, videos]) => (
                <View key={category}>
                    <Text style={styles.CardTitle}>{category}</Text>
                    <VideosSection
                        videos={videos}
                        loading={loading}
                        renderVideo={renderVideo}
                        contentContainerStyle={{ paddingHorizontal: 4, paddingVertical: 4 }}
                        ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
                    />
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    bannerContainer: {
        width: "100%",
        height: 150,
        position: "relative",
        marginBottom: 10,
    },
    banner: {
        width: "100%",
        height: "100%",
        borderRadius: 0,
    },
    overlay: {
        position: "absolute",
        left: 10,
        bottom: 10,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 5,
    },
    sectionTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    searchHeader: {
        marginBottom: 12,
    },
    liveSearchGroup: { 
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    liveSearchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 12,
        padding: 10,
        backgroundColor: "#fff",
        fontSize: 16,
        color: "#222",
        marginRight: 8,
        marginLeft: 16,
    },
    liveSearchButton: {
        padding: 8,
        backgroundColor: "#e6f0ff",
        borderRadius: 8,
        marginRight: 4,
        height: 40,
    },
    searchClearButton: {
        padding: 8,
        backgroundColor: "#ffe6e6",
        borderRadius: 8,
        height: 40,
        marginRight: 15,
    },
    CardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000339",
        marginTop: 8,    
        marginBottom: 0,   
        marginLeft: 16,
        textTransform: "uppercase",
    },
    card: {
        marginBottom: 2,
        marginRight: 2, 
    },
});