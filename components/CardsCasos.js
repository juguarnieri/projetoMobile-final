import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function CardCasos({ imageUri, title }) {
    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: imageUri }} style={styles.image} />
                <View style={styles.overlay}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '40%',
        marginBottom: 20,
        marginLeft: '2%',
        overflow: 'hidden',
        alignItems: 'center',
    },
    imageContainer: {
        width: '100%',
        height: 100,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 2,
        alignItems: 'flex-start',
    },
    title: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});