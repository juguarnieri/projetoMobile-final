import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function NoticiaCard({ titulo, imagem }) {
    return (
        <View style={styles.card}>
            <Image source={{ uri: imagem }} style={styles.imagem } />
            <Text style={styles.titulo}>{titulo}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '48%',
        marginBottom: 12,
    },
    imagem: {
        width: '100%',
        height: 90,
        borderRadius: 6,
    },
    titulo: {
        marginTop: 5,
        fontSize: 12,
        color: '#000',
    },
    
})