import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import Header from '../components/Header';
import Category from '../components/Category';
import NoticiaCard from '../components/NoticiaCard';

const BASE_URL = 'http://192.168.5.193:4000';

function getImageUrl(imagem) {
    if (!imagem) return null;
    if (imagem.startsWith('http')) return imagem;
    return `${BASE_URL}${imagem}`;
}

export default function Search() {
    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://192.168.5.193:4000/api/news', {
            headers: {
                'x-api-key': 'nUN1NOc7BuiiO7iSYR7gek0bxG821Z'
            }
        })
        .then(res => res.json())
        .then(data => {
            setNoticias(data.data || data || []); 
            setLoading(false);
        })
        .catch(err => {
            setNoticias([]); 
            setLoading(false);
        });
    }, []);

    const noticiasImportantes = noticias.filter(noticia => noticia.is_featured);

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

            <Text style={styles.sectionTitle}>NOTÍCIAS IMPORTANTES</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#900" style={{ marginTop: 32 }} />
            ) : (
                <FlatList
                    data={noticiasImportantes}
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
    destaqueContainer: {
        marginHorizontal: 16,
        marginTop: 16,
        position: 'relative',
    },
    destaqueImagem: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
    destaqueTitulo: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        fontSize: 14,
    },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginTop: 16,
    },
});