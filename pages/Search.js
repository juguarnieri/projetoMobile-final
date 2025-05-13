import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';   
import Header from '../components/Header';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Search() {
    const navigation = useNavigation();
    return (
      <View style={styles.container}>
            <Header />

            <View style={styles.textNoticia}>
                <Text style={styles.titleNoticia}>CASOS CRIMINAIS</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Pesquisar Notícias..."
            />
            </View>
    
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
    },
    titleNoticia: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'left',
        marginTop: 10,
        marginLeft: 30,
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
    },
});