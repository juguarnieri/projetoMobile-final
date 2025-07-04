import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CardCasos from '../components/CardsCasos';
import { Ionicons } from '@expo/vector-icons'; 

export default function CasosCriminais() {
    const navigation = useNavigation();
    return (
        <ScrollView>
            <View style={styles.bannerContainer}>
                <Image
                    source={require("../assets/img/banner3.png")}
                    style={styles.banner}
                    resizeMode="cover"
                />
                <View style={styles.overlay}>
                    <Text style={styles.bannerTitle}>CASOS CRIMINAIS</Text>
                </View>
            </View>

            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
                activeOpacity={0.8}
            >
                <Ionicons name="arrow-back" size={22} color="#000339" />
                <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>

            <ScrollView style={styles.container}>     
                <View style={styles.cardDecade}>
                    <TouchableOpacity onPress={() => navigation.navigate('PaginaDecada70')}>
                        <CardCasos 
                            imageUri="https://c.files.bbci.co.uk/2DAB/production/_103219611_gettyimages-587828692.jpg"
                            title="Década de 70"
                            style={styles.cardCaso}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('PaginaDecada80')}>
                        <CardCasos 
                            imageUri="https://www.cartacapital.com.br/wp-content/uploads/2019/03/araceli-ana-lidia.jpg"
                            title="Década de 80"
                            style={styles.cardCaso}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.cardDecade}>
                    <TouchableOpacity onPress={() => navigation.navigate('PaginaDecada90')}>
                        <CardCasos 
                            imageUri="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpKE1Dy75eJfKBxCuLb2a7Hy6Rd84f6-0exA&s"
                            title="Década de 90"
                            style={styles.cardCaso}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('PaginaDecada2000')}>
                        <CardCasos 
                            imageUri="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXF3EmpIb8bqVQSE7mFCi3kBq7L3fiGSOFdg9oWktQqWw_YMEDtQ_UbcMTKrt_QblBKlE&usqp=CAU"
                            title="Década de 2000"
                            style={styles.cardCaso}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.cardDecade}>
                    <TouchableOpacity onPress={() => navigation.navigate('PaginaDecada2010')}>
                        <CardCasos 
                            imageUri="https://www.projuris.com.br/wp-content/uploads/2022/11/crimes-hediondos.jpg"
                            title="Década de 2010"
                            style={styles.cardCaso}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('PaginaDecada2020')}>
                        <CardCasos 
                            imageUri="https://ichef.bbci.co.uk/news/1024/branded_portuguese/a7e0/live/42ca1540-f62b-11ed-87cd-1142cf567558.jpg"
                            title="Década de 2020"
                            style={styles.cardCaso}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.bottomImageContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home', { screen: 'Search' })}>
                        <Image
                            source={require("../assets/img/teste.png")} 
                            style={styles.bottomImage}
                            resizeMode="cover"
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
    },
    bannerContainer: {
        width: '100%',
        height: 150,
        position: 'relative',
        marginBottom: 10,
    },
    banner: {
        width: '100%',
        height: '100%',
        borderRadius: 0,
    },
    overlay: {
        position: 'absolute',
        left: 10,
        bottom: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 5,
    },
    bannerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 16,
        marginTop: 8,
        marginBottom: 8,
        alignSelf: 'flex-start',
        backgroundColor: '#f2f2f2',
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 14,
        elevation: 2,
    },
    backButtonText: {
        color: '#000339',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 6,
    },
    cardDecade: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginVertical: 10,
        gap: 10,
    },
    cardCaso: {
        width: 150, 
        maxWidth: 160,
        minWidth: 120,
        alignSelf: 'center',
    },
    bottomImageContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    bottomImage: {
        width: 300,
        height: 160,
        borderRadius: 16,
    },
});