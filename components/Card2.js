import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function Card2({ imageUri, title }) {
    return (
        <View style={styles.container}>
                    <View style={styles.card2}>
                        <Image 
                            source={{ uri: imageUri }}
                            style={styles.image}
                        />
                    </View>
        
                    <View style={styles.content}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '43.5%',
        marginLeft: '7%',
        marginTop: 10,
    },
    card2: {
        marginBottom: 10,
        overflow: 'hidden',
        height: '20%',
    },
    image: {
        width: '100%',
        height: 200,
    },
    content: {
        marginBottom: 20,
    },
    title: {
        color: 'black',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'left',
    },
});