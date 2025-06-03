import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card1 from '../components/Card1';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import CardCasos from '../components/CardsCasos';

export default function CasosCriminais() {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
            <View style={styles.buttons}>
                <View style={styles.block}>
                    <Text style={styles.title}>CW</Text>
                </View>
                <TouchableOpacity style={styles.gearButton}>
                    <FontAwesome name="gear" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <Card1
                imageUri="https://i.ytimg.com/vi/jCKE4N1KIbs/maxresdefault.jpg"
            />

            <View style={styles.cardDecade}>
                <TouchableOpacity onPress={() => navigation.navigate('PaginaDecada70')}>
            <CardCasos 
                imageUri="https://c.files.bbci.co.uk/2DAB/production/_103219611_gettyimages-587828692.jpg"
                title="Década de 70"
            />
            </TouchableOpacity>
             <TouchableOpacity onPress={() => navigation.navigate('PaginaDecada80')}>
            <CardCasos 
                imageUri="https://www.cartacapital.com.br/wp-content/uploads/2019/03/araceli-ana-lidia.jpg"
                title="Década de 80"
            />
            </TouchableOpacity>
            </View>

            <View style={styles.cardDecade}>
                 <TouchableOpacity onPress={() => navigation.navigate('PaginaDecada90')}>
            <CardCasos 
                imageUri="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpKE1Dy75eJfKBxCuLb2a7Hy6Rd84f6-0exA&s"
                title="Década de 90"
            />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('PaginaDecada2000')}>
            <CardCasos 
                imageUri="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXF3EmpIb8bqVQSE7mFCi3kBq7L3fiGSOFdg9oWktQqWw_YMEDtQ_UbcMTKrt_QblBKlE&usqp=CAU"
                title="Década de 2000"
            />
            </TouchableOpacity>
            </View>

            <View style={styles.cardDecade}>
                <TouchableOpacity onPress={() => navigation.navigate('PaginaDecada2010')}>
            <CardCasos 
                imageUri="https://www.projuris.com.br/wp-content/uploads/2022/11/crimes-hediondos.jpg"
                title="Década de 2010"
            />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('PaginaDecada2020')}>
            <CardCasos 
                imageUri="https://ichef.bbci.co.uk/news/1024/branded_portuguese/a7e0/live/42ca1540-f62b-11ed-87cd-1142cf567558.jpg"
                title="Década de 2020"
            />
            </TouchableOpacity>
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
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        alignItems: 'center',
    },
    gearButton: {
        marginRight: 20,
    },
    cardDecade: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginVertical: 10,
        gap: 10,
    },
});