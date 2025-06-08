import { useState } from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View, Linking, Pressable, Modal, Platform, Alert, Share } from 'react-native';
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

    const shareWhatsApp = () => {
        const message = `${titulo}\n${link || ''}`;
        const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
        Linking.openURL(url).catch(() =>
            Alert.alert('Erro', 'Não foi possível abrir o WhatsApp.')
        );
    };

    const shareInstagram = () => {
        const url = Platform.OS === 'ios'
            ? `instagram://app`
            : `https://www.instagram.com/`;
        Linking.openURL(url).catch(() =>
            Alert.alert('Erro', 'Não foi possível abrir o Instagram.')
        );
    };

    const shareNative = async () => {
        try {
            await Share.share({
                message: `${titulo}\n${link || ''}`,
                title: titulo,
            });
        } catch (error) { }
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
                <View style={styles.modalContentWhite}>
                    <TouchableOpacity
                        style={[styles.closeBtn, { left: 10, right: undefined }]}
                        onPress={() => setModalVisible(false)}
                        hitSlop={15}
                    >
                        <Text style={styles.closeBtnText}>✖</Text>
                    </TouchableOpacity>

                    <View style={styles.iconRow}>
                        <Icon name="account-search" size={20} color="#5a5a5a" style={styles.icon} />
                        <Icon name="police-badge" size={20} color="#ea4335" style={styles.icon} />
                        <Icon name="fingerprint" size={20} color="#2ecc71" style={styles.icon} />
                    </View>

                    <Image source={{ uri: imagem }} style={styles.modalImage} resizeMode="cover" />
                    <Text style={styles.modalTitleDark}>{titulo}</Text>
                    <Text style={styles.modalDescriptionDark}>{descricao}</Text>
                    
                    <TouchableOpacity
                        style={[
                            styles.actionBtn,
                            styles.actionBtnSmall,
                            isFavorite && styles.favoriteActive
                        ]}
                        onPress={onPressFavorite}
                        activeOpacity={0.85}
                    >
                        <Icon
                            name={isFavorite ? "heart" : "heart-outline"}
                            size={18}
                            color={isFavorite ? "#ff3333" : "#444"}
                        />
                        <Text style={styles.actionTextSmallDark}>
                            {isFavorite ? "Remover" : "Favoritar"}
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.shareRow}>
                        <TouchableOpacity style={[styles.shareBtn, styles.shareBtnSmall, styles.shareWhatsapp]} onPress={shareWhatsApp}>
                            <Icon name="whatsapp" size={17} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.shareBtn, styles.shareBtnSmall, styles.shareInstagram]} onPress={shareInstagram}>
                            <Icon name="instagram" size={17} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.shareBtn, styles.shareBtnSmall, styles.shareNative]} onPress={shareNative}>
                            <Icon name="share-variant" size={17} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    
                    {link && (
                        <TouchableOpacity
                            style={[styles.listenBtn, styles.listenBtnSmall]}
                            onPress={handleOuvir}
                            activeOpacity={0.85}
                        >
                            <Icon name="play-circle-outline" size={16} color="#fff" />
                            <Text style={styles.listenBtnTextSmall}>Ver Vídeo</Text>
                        </TouchableOpacity>
                    )}
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
        margin: 8,
    },
    card: {
        width: 200,             
        height: 150,          
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 14,     
        marginRight: 12,         
        overflow: 'hidden',
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000339",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
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
        height: 100,             // altura menor
        borderRadius: 8,
    },
    title: {
        fontSize: 13,            // fonte menor
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
    modalContentWhite: {
        width: '90%',
        maxWidth: 350,
        borderRadius: 12,
        padding: 18,
        alignItems: "center",
        position: "relative",
        backgroundColor: "#fff",
        overflow: "hidden",
        elevation: 4,
    },
    closeBtn: {
        position: 'absolute',
        left: 10,
        top: 10,
        zIndex: 1,
    },
    closeBtnText: {
        fontSize: 18,
        color: '#444',
    },
    modalImage: {
        width: 140,
        height: 78,
        borderRadius: 10,
        marginBottom: 8,
        backgroundColor: "#f2f2f2",
    },
    modalTitleDark: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
        marginBottom: 5,
    },
    modalDescriptionDark: {
        color: "#333",
        fontSize: 13,
        marginVertical: 8,
        textAlign: "justify",
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 13,
        marginTop: 5,
        marginBottom: 7,
        borderWidth: 1,
        borderColor: '#ddd',
        elevation: 1,
    },
    actionBtnSmall: {
        paddingVertical: 5,
        paddingHorizontal: 9,
        minWidth: 70,
    },
    favoriteActive: {
        backgroundColor: '#ffeaea',
        borderColor: '#ff3333',
    },
    actionTextSmallDark: {
        color: "#000",
        marginLeft: 6,
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 0.3
    },
    shareRow: {
        flexDirection: 'row',
        marginBottom: 8,
        justifyContent: 'center',
        width: '100%',
    },
    shareBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        marginHorizontal: 2,
        elevation: 1,
        minWidth: 36,
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 10,
    },
    shareBtnSmall: {
        paddingVertical: 6,
        paddingHorizontal: 10,
    },
    shareWhatsapp: {
        backgroundColor: '#25d366',
    },
    shareInstagram: {
        backgroundColor: '#C13584',
    },
    shareNative: {
        backgroundColor: '#444',
    },
    listenBtn: {
        flexDirection: "row",
        backgroundColor: "#ea4335",
        borderRadius: 8,
        paddingVertical: 7,
        paddingHorizontal: 18,
        alignItems: "center",
        marginTop: 3,
        marginBottom: 5,
        elevation: 1,
    },
    listenBtnSmall: {
        paddingVertical: 7,
        paddingHorizontal: 18,
        minWidth: 70,
    },
    listenBtnTextSmall: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 13,
        marginLeft: 5,
    },
    iconRow: {
        flexDirection: 'row',
        marginBottom: 7,
        justifyContent: 'center',
    },
    icon: {
        marginHorizontal: 5,
    },
});