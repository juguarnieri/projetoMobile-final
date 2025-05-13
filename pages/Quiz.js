import React from 'react';
import { View, Text } from 'react-native';
import Header from '../components/Header';

export default function Quiz() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Header />
            <Text>Tela Quiz</Text>
        </View>
    );
}