import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function Card1({ imageUri, title }) {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image 
                    source={{ uri: imageUri }}
                    style={styles.image}
                />

            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    card: {
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 200,
    },
    content: {
        marginBottom: 20,
    },
    title: {
        color: '#fff',
        fontSize: 30,
        fontWeight: '700',    
    },
    textContainer: {
        position: 'absolute',
        marginTop: '9.5rem',
        paddingLeft: 20,
    },
});