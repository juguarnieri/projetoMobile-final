import React from 'react';
import { View, Text } from 'react-native';
import Header from '../components/Header';

export default function Account() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Header />
            <Text>Tela Account</Text>
        </View>
    );
}