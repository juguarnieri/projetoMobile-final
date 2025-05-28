import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import Category from '../components/Category';

export default function LiveTv() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://192.168.5.193/api/videos', {
            headers: {
                'x-api-key': 'nUN1NOc7BuiiO7iSYR7gek0bxG821Z'
            }
        })
        .then(res => res.json())
        .then(data => {
            setVideos(data.data || []);
            setLoading(false);
        })
        .catch(err => {
            console.error('Erro ao buscar vídeos:', err);
            setVideos([]);
            setLoading(false);
        });
    }, []);

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <Header />
                <Text style={styles.title}>VÍDEOS</Text>
                <TouchableOpacity style={styles.input}>Pesquisar Vídeos</TouchableOpacity>
                <Category />
        
                <VideosSection videos={videos} />
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
        padding: 20,
        marginTop: 10,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        margin: 16,
        backgroundColor: '#acacac',
        color: '#5a5a5a',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginVertical: 16,
    }
});