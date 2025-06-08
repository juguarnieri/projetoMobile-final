import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card1 from '../components/Card1';
import CardCasos from '../components/CardsCasos';

export default function CasosCriminais() {
    const navigation = useNavigation();
    return (
        <View>
        <ScrollView style={styles.container}>     

            <Card1
                imageUri="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1UudotuU2fxqD4h-bEYysd3QDL5WjCnbSZg&s"
                title="CASOS CRIMINAIS"
            />

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
                <Image
                    source={require("../assets/img/teste.png")} 
                    style={styles.bottomImage}
                    resizeMode="cover"
                />
            </View>
        </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
    },
    title: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'right',
        marginTop: 10,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        alignItems: 'center',
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
        marginVertical: 32,
    },
    bottomImage: {
        width: 280,
        height: 160,
        borderRadius: 16,
    },
});