import React from 'react';
import { View, Text } from 'react-native';
import Header from '../components/Header';

export default function CasosCriminais() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Header />
            <Text>Tela Casos Criminais</Text>
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