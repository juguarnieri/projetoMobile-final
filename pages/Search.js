import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';   
import Header from '../components/Header';


export default function Search() {
    const navigation = useNavigation();
    return (
      <View style={styles.container}>
            <Header />

            <Text style={styles.sectionTitle}>EXPLORAR</Text>

            <View style={styles.searchContainer}>
            <TextInput
                style={styles.searchInput}
                placeholder="Pesquisar Notícias..."
                placeholderTextColor= "#888"
            />
            </View>
        </View>
    
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 20,
        marginLeft: 16,
    },
    searchContainer: {
        backgroundColor: "#ffffff",
        marginHorizontal: 16,
        marginTop:16,
        borderRadius: 10,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#f9f9f9',
        color: '#333',
    },
});