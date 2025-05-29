import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import VideosSection from '../components/VideosSection';
import VideoCard from '../components/VideoCard';
import Banner from '../components/Banner';

export default function LiveTv() {
    const navigation = useNavigation();
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize] = useState(27);

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

    const renderVideo = ({ item }) => (
        <VideoCard
            item={item}
            onPress={() => navigation.navigate("Video", { video: item })}
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
            <Header />
            <Banner image={require("../assets/img/livetv.png")} />

            <Text style={styles.sectionTitle}>VÍDEOS</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar Videos..."
                    value={search}
                    onChangeText={setSearch}
                />
            </View>
            {Object.entries(videosByCategory).map(([category, videos]) => (
                <View key={category}>
                    <Text style={styles.sectionTitle}>{category}</Text>
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