import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Image } from 'react-native';  
import Header from '../components/Header';
import Category from '../components/Category';
import NoticiaCard from '../components/NoticiaCard';


export default function Search() {
    return (
      <ScrollView style={styles.container}>
            <Header />

            <Text style={styles.sectionTitle}>EXPLORAR</Text>

            <View style={styles.searchContainer}>
            <TextInput
                style={styles.searchInput}
                placeholder="Pesquisar Notícias..."
                placeholderTextColor= "#888"
            />
            </View>

            <Category />

            <View style={styles.destaqueContainer}>
                <Image
                source={{ uri: 'https://unicamp.br/unicamp/sites/default/files/inline-images/Man_20230126_ucrania_zenskyl-div.jpg'}}
                style={styles.destaqueImagem}
                />
                <Text style={styles.destaqueTitulo}>
                    Não interessa aos Estados Unidos que guerra na Ucrânia dure por muito tempo
                </Text>
            </View>

            <View style={styles.cardContainer}>
                <NoticiaCard
                    titulo="Número de feminicídios chega a 11 no DF em 5 meses"
                    imagem='https://s2-g1.glbimg.com/4G5IkRXowy_XiJp68W1qoPS5pfw=/0x0:800x450/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/6/i/YM8bJ4RAyUcxb3kSLDOQ/coloquio-pos-unifor-800-foto-getty-images.jpg'
                    />
                <NoticiaCard
                    titulo="ONU alerta sobre impactos da mudança climática nas geleiras."
                    imagem="https://imagens.ebc.com.br/_g_tM02lUY1tHXH7xTCwAPp6nfw=/1170x700/smart/https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/whatsapp_image_2019-11-06_at_22.00.00.jpeg?itok=7iSxTtBU"
                    />
                <NoticiaCard
                    titulo="Novas tecnologias estão transformando os diagnósticos médicos."
                    imagem="https://mv.com.br/storage/blog/18181820240507663a9a9aef0f5.jpeg"
                    />
                <NoticiaCard
                    titulo="Menina de 10 anos estuprada pelo tio no Espírito Santo tem gravidez interrompida"
                    imagem="https://s02.video.glbimg.com/640x360/8783097.jpg"
                    />
                
            </View>
        </ScrollView>
    
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        
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
    destaqueContainer: {
        marginHorizontal: 16,
        marginTop: 16,
        position: 'relative',
},
    destaqueImagem: {
        width: '100%',
        height: 200,
        borderRadius: 8,
},
    destaqueTitulo: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        fontSize: 14,
},
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginTop: 16,
},
});