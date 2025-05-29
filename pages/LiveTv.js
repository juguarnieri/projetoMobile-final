import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import VideosSection from '../components/VideosSection';
import VideoItemCard from '../components/VideoItemCard';
import Banner from '../components/Banner';

export default function LiveTv() {
    const navigation = useNavigation();
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize] = useState(30);

    const fetchVideos = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:4000/api/videos', {
                headers: { 'x-api-key': 'nUN1NOc7BuiiO7iSYR7gek0bxG821Z' },
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

    const handleCardPress = async (video) => {
        if (video.link) {
            Linking.openURL(video.link);
        }
    };
    
    const renderVideo = (video) => (
        <VideoItemCard
        titulo={video.title}
        imagem={video.image}
        onPress={() => handleCardPress(video)}
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
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar Videos..."
                    value={search}
                    onChangeText={setSearch}
                />
            </View>
            {Object.entries(videosByCategory).map(([category, videos]) => (
                <View key={category} style>
                    <Text style={styles.CardTitle}>{category}</Text>
                    <VideosSection
                        videos={videos}
                        loading={loading}
                        renderVideo={renderVideo}
                    />
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    bannerContainer: {
        width: '100%',
        height: 150,
        position: 'relative',
        marginBottom: 10,
    },
    banner: {
        width: '100%',
        height: '100%',
        borderRadius: 0,
    },
    overlay: {
        position: 'absolute',
        left: 10,
        bottom: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 5,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
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
    CardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000339',
        marginTop: 20,
        marginLeft: 16,
        textTransform: 'uppercase',
    },
});