import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, Linking } from 'react-native';

export default function VideoCard({ titulo, imagem, onPress, style }) {
    return (
        <TouchableOpacity style={[styles.card, style]} onPress={onPress}>
            <Image source={{ uri: imagem }} style={styles.image} />
            <Text style={styles.title} numberOfLines={2}>{titulo}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 16,
        overflow: 'hidden',
        elevation: 2,
    },
    image: {
        width: '100%',
        height: 120,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#222',
        padding: 8,
    },
});

 