import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Category() {
    const [selecionado,  setSelecionado] = useState('RECENTES');

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setSelecionado('RECENTES')}>
                <Text style={[styles.texto, selecionado === 'RECENTES' && styles.selecionado]}>
                    RECENTES
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelecionado('CASOS CRIMINAIS')}>
                <Text style={[styles.texto, selecionado === 'CASOS CRIMINAIS' && styles.selecionado]}>
                    CASOS CRIMINAIS
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelecionado('PODCASTS')}>
                <Text style={[styles.texto, selecionado === 'PODCASTS' && styles.selecionado]}>
                    PODCASTS
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelecionado('QUIZ')}>
                <Text style={[styles.texto, selecionado === 'QUIZ' && styles.selecionado]}>
                    QUIZ
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        marginHorizontal: 10,
    },
    texto: {
        fontSize: 13,
        color: '#0D0D3F',
    },
    selecionado: {
        fontWeight: 'bold', 
        textDecorationLine: 'underline',
    },
});