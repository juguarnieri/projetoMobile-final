import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';

export default function Recentes() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Header />
            <Text>Tela Recentes</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
    },
});