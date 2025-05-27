import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function Card2({ imageUri, title, description }) {
    return (
        <View style={styles.container}>
                    <View style={styles.row}>
                        <Image 
                            source={{ uri: imageUri }}
                            style={styles.photo}
                        />
                        <View>
                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.description}>{description}</Text>
                        </View>
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
    title: {
        color: 'black',
        fontSize: 16,
        fontWeight: '600',
        marginTop: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,

    },
    photo: {
        width: '100%',
        height: 100,
        marginRight: 10,
    },
    description: {
        color: 'gray',
        fontSize: 14,
        marginTop: 5,
        marginLeft: 2,
    },
});