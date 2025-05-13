import React from 'react';
import { View, Text } from 'react-native';
import Header from '../components/Header';

export default function Podcast() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Header />
            <Text>Tela Podcast</Text>
        </View>
    );
}