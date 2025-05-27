import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../components/Header';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Card1 from '../components/Card1';
import Card2 from '../components/Card2';


export default function Home() {

    return (
        <ScrollView style={styles.container}>
            <Header titleWhite="CRIME" titleRed="WHISPERS" />

            <View style={styles.buttons}>
                
                <View style={styles.block}>
                <Text style={styles.title}>CW</Text>
                </View>

                <TouchableOpacity style={styles.gearButton}>
                    <FontAwesome name="gear" size={24} color="black" />
                </TouchableOpacity>
        </View>

            <View style={styles.textNoticia}>
                <Text style={styles.titleNoticia}>Notícias do dia</Text>
            </View>

            <View style={styles.line} />

            <View style={styles.textPodcasts}>
                <Text style={styles.titlePodcasts}>Top Podcasts</Text>
            </View>

            <Card1 
                imageUri="https://i.ytimg.com/vi/T_7CA8tdL1I/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAXmIE8tixIOIJmcsOpnTmvtTBMXQ" 
                title="Caso Maníaco do Parque" 
            />

            <Card1 
                imageUri="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB8MMZ9D3VG2nqNdlJ9yMn111v2HxVUekNZg&s" 
                title="Caso Menina Vitória" 
            />

            <View style={styles.textCasos}>
                <Text style={styles.titleCasos}>Casos Famosos</Text>
            </View>

            <View style={styles.line} />

            <Card2 
                imageUri="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB8MMZ9D3VG2nqNdlJ9yMn111v2HxVUekNZg&s" 
                title="Caso Menina Vitória"
                description="Um caso que chocou o Brasil, envolvendo a tragédia de uma jovem menina."
            />

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
    },
    block: {
        backgroundColor: 'red',
        width: 30,
        height: 30,
        marginLeft: 20,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: 5,
    },
    gearButton: {
        marginRight: 20,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        alignItems: 'center',
    },
    titleNoticia: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'left',
        marginTop: 10,
        marginLeft: 30,
    },
    line: {
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30,
    },
    titleCasos: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'left',
        marginLeft: 30,
    },
    titlePodcasts: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'left',
        marginLeft: 30,
    }
});