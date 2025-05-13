import React from 'react';
import {Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, ScrollView } from 'react-native-web';

export default function LiveTv() {
    const navigation = useNavigation();
    return (
        <ScrollView>
        <SafeAreaView style={styles.container}>
            <Header />
            <Text style={styles.title}>VÍDEOS</Text>
            <TouchableOpacity style={styles.input}>Pesquisar Vídeos</TouchableOpacity>
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
    }
});