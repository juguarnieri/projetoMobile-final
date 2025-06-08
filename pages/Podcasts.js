import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, Image, ScrollView, ActivityIndicator,
  TextInput, Linking, Modal, TouchableOpacity, Share, Alert, Platform
} from 'react-native';
import Card3 from '../components/Card3';
import bannerImage from '../assets/img/podcast.jpg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchBar from '../components/SearchBar';
import axios from 'axios';


export function Podcast({ visible, onClose, podcast, onToggleFavorite }) {
  if (!podcast) return null;

  const shareWhatsApp = () => {
    const message = `${podcast.title}\n${podcast.link || ''}`;
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
        message: `${podcast.title}\n${podcast.link || ''}`,
        title: podcast.title,
      });
    } catch (error) {}
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContentWhite}>
          <TouchableOpacity style={[styles.closeBtn, { left: 10, right: undefined }]} onPress={onClose}>
            <Text style={styles.closeBtnText}>✖</Text>
          </TouchableOpacity>

          <View style={styles.iconRow}>
            <Icon name="account-search" size={20} color="#5a5a5a" style={styles.icon} />
            <Icon name="police-badge" size={20} color="#ea4335" style={styles.icon} />
            <Icon name="fingerprint" size={20} color="#2ecc71" style={styles.icon} />
          </View>

          <Image
            source={{ uri: podcast.image || podcast.thumbnail }}
            style={styles.modalImage}
            resizeMode="cover"
          />
          <Text style={styles.modalTitleDark}>{podcast.title}</Text>

          {podcast.description && (
            <Text style={styles.modalDescriptionDark}>{podcast.description}</Text>
          )}

          <TouchableOpacity
            style={[
              styles.actionBtn,
              styles.actionBtnSmall,
              podcast.isFavorite && styles.favoriteActive
            ]}
            onPress={() => onToggleFavorite && onToggleFavorite(podcast)}
            activeOpacity={0.85}
          >
            <Icon
              name={podcast.isFavorite ? "heart" : "heart-outline"}
              size={18}
              color={podcast.isFavorite ? "#ff3333" : "#444"}
            />
            <Text style={styles.actionTextSmallDark}>
              {podcast.isFavorite ? "Remover" : "Favoritar"}
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

          {podcast.link && (
            <TouchableOpacity
              style={[styles.listenBtn, styles.listenBtnSmall]}
              onPress={() => Linking.openURL(podcast.link)}
              activeOpacity={0.85}
            >
              <Icon name="play-circle-outline" size={16} color="#fff" />
              <Text style={styles.listenBtnTextSmall}>Ouvir</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}

export default function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const API_KEY = 'nUN1NOc7BuiiO7iSYR7gek0bxG821Z';

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const fetchPodcasts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/podcasts', {
        headers: { 'x-api-key': API_KEY },
      });
      setPodcasts(response.data.data);
    } catch (error) {
      console.error('Erro ao buscar podcasts:', error);
    } finally {
      setLoading(false);
    }
  };

  const categorias = [];
  podcasts.forEach((p) => {
    if (p.category && !categorias.includes(p.category)) {
      categorias.push(p.category);
    }
  });

  const filteredPodcasts = (category) => {
    return podcasts
      .filter((p) => p.category === category)
      .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.bannerContainer}>
        <Image source={bannerImage} style={styles.banner} resizeMode="cover" />
        <View style={styles.overlay}>
          <Text style={styles.bannerTitle}>
            {search ? 'RESULTADOS DA BUSCA' : 'PODCASTS'}
          </Text>
        </View>
      </View>

      <SearchBar
        value={searchInput}
        onChangeText={setSearchInput}
        onSearch={() => setSearch(searchInput)}
        placeholder="Buscar Podcasts..."
      />

      {categorias.every((cat) => filteredPodcasts(cat).length === 0) && (
        <Text style={styles.emptyMessage}>Nenhum podcast encontrado.</Text>
      )}

      {categorias.map((cat, i) => {
        const filtered = filteredPodcasts(cat);
        if (filtered.length === 0) return null;

        return (
          <View key={i} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{cat}</Text>
            <FlatList
              data={filtered}
              horizontal
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.podcastList}
              renderItem={({ item }) => (
                <Card3
                  imageUri={item.image || item.thumbnail}
                  title={item.title}
                  isFavorite={item.isFavorite}
                  price={item.price}
                  free={item.free}
                  cardStyle={styles.podcastCardWhite}
                  onPress={() => {
                    setSelectedPodcast(item);
                    setModalVisible(true);
                  }}
                  onPressFavorite={() => {
                    setPodcasts((old) =>
                      old.map((p) =>
                        p === item
                          ? { ...p, isFavorite: !p.isFavorite }
                          : p
                      )
                    );
                  }}
                />
              )}
            />
          </View>
        );
      })}

      <Podcast
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        podcast={selectedPodcast}
        onToggleFavorite={(podcast) => {
          setPodcasts((old) =>
            old.map((p) =>
              p === podcast ? { ...p, isFavorite: !p.isFavorite } : p
            )
          );
          setSelectedPodcast((old) =>
            old ? { ...old, isFavorite: !old.isFavorite } : old
          );
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: "#fff",
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  liveSearchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 8,
  },
  liveSearchGroup: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderWidth: 1,
    borderColor: "#eee",
    height: 40,
    justifyContent: "center"
  },
  liveSearchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#fff",
    fontSize: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 0,
    color: "#222",
  },
  liveSearchIconBtn: {
    marginLeft: 6,
    backgroundColor: "transparent",
    borderRadius: 8,
    padding: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  podcastList: {
    paddingLeft: 15,
    paddingVertical: 5,
  },
  categorySection: {
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 15,
    marginTop: 5,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(20,20,20,0.88)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentCriminal: {
    width: 320,
    borderRadius: 20,
    padding: 22,
    alignItems: "center",
    position: "relative",
    backgroundColor: "#00204a", // Azul escuro top
    overflow: "hidden",
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
    right: 10,
    top: 10,
    zIndex: 1,
  },
  closeBtnText: {
    fontSize: 18,
    color: '#444',
  },
  iconRow: {
    flexDirection: 'row',
    marginBottom: 7,
    justifyContent: 'center',
  },
  icon: {
    marginHorizontal: 5,
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
  actionTextSmall: {
    color: "#444",
    marginLeft: 6,
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.3
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
  shareBtnText: {
    display: 'none',
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
  closeButton: {
    marginTop: 6,
    backgroundColor: '#444',
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 18,
    elevation: 1,
  },
  closeButtonSmall: {
    paddingVertical: 7,
    paddingHorizontal: 18,
    minWidth: 70,
  },
  closeButtonTextSmall: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
    textAlign: 'center',
  },
  podcastCardWhite: {
    backgroundColor: "#fff",
    borderColor: "#eee",
  },
});