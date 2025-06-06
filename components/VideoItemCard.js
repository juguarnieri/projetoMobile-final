import { useState } from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View, Linking, Pressable, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FavoriteBtn from './FavoriteBtn';

export default function VideoItemCard({ titulo, imagem, descricao, link, onPress, style, isFavorite, onPressFavorite }) {
    const [modalVisible, setModalVisible] = useState(false);

    const handleOuvir = () => {
        if (link) {
            Linking.openURL(link);
        }
    };

    return (
        <>
        <View style={styles.container}>
        <TouchableOpacity
            style={[styles.card, style]}
            onPress={() => {
                setModalVisible(true);
                if (onPress) onPress();
            }}
        >
            <TouchableOpacity onPress={onPressFavorite} style={styles.favoriteBtn}>
                <Icon
                    name={isFavorite ? "handcuffs" : "handcuffs-off"}
                    size={22}
                    color={isFavorite ? "#ff3333" : "#bbb"}
                />
            </TouchableOpacity>
            <Image source={{ uri: imagem }} style={styles.image} />
            <Text style={styles.title} numberOfLines={2}>{titulo}</Text>
        </TouchableOpacity>
        </View>

        <Modal
            visible={modalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Pressable
                        style={styles.button01}
                        onPress={() => setModalVisible(false)}
                        hitSlop={15}
                    >
                        <Ionicons name="arrow-back" size={25} color="#000788" />
                    </Pressable>
                    <Image source={{ uri: imagem }} style={styles.cardimage} />
                    <Text style={styles.cardtitle}>{titulo}</Text>
                    <Text style={styles.carddescription}>{descricao}</Text>
                    
                    <FavoriteBtn isFavorite={isFavorite} onPress={onPressFavorite} style={styles.favoriteDetailBtn} />
                    
                    <Pressable
                        style={styles.button}
                        onPress={handleOuvir}
                    >
                    <View style={styles.buttonModel}>
                        <Ionicons name="play-circle-outline" size={25} color="#fff" />
                        <Text style={styles.buttonText}>Ver Vídeo</Text>
                    </View>
                    </Pressable>
                </View>
            </View>
        </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    card: {
        width: 270,
        height: 210,
        backgroundColor: '#ececec',
        borderRadius: 8,
        marginBottom: 16,
        overflow: 'hidden',
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    favoriteBtn: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 2,
        padding: 2,
        backgroundColor: '#fff',
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#eee',
    },
    image: {
        width: '90%',
        height: 150,
        borderRadius: 8,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000',
        padding: 8,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.55)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        width: '90%',
        alignItems: 'center',
        position: 'relative',
    },
    cardimage: {
        width: '100%',
        height: 180,
        borderRadius: 12,
        marginBottom: 16,
        marginTop: 25,
    },
    cardtitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#000668',
        marginBottom: 8,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    carddescription: {
        fontSize: 15,
        color: '#444',
        textAlign: 'center',
        marginBottom: 16,
    },
    favoriteDetailBtn: {
        alignSelf: "center",
        marginBottom: 16,
        marginTop: 2,
        position: "relative",
    },
    button01: {
        position: 'absolute',
        top: 12,
        left: 12,
        zIndex: 10,
        backgroundColor: 'transparent',
        padding: 4,
    },
    button: {
        backgroundColor: '#000788',
        width: '96%',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonModel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
});