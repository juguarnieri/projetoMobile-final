import React from 'react';
import { View, Text, TextInput, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';   
import Header from '../components/Header';

export default function Search() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Header />
            <Text style={styles.title}>Tela Search</Text>
            <TextInput
                style={styles.input}
                placeholder="Pesquisar..."
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
    },
});