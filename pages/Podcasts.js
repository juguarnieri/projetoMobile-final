import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Linking,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Card3 from '../components/Card3';
import bannerImage from '../assets/img/podcast.jpg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';


function CriminalModal({ visible, onClose, podcast }) {
  if (!podcast) return null;

  
  const dangerColors = {
    "Alto": "#ea4335",
    "Médio": "#fbbc05",
    "Baixo": "#34a853",
    "Perigo": "#ea4335"
  };
  const color = dangerColors[podcast.dangerLevel] || dangerColors["Perigo"];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContentCriminal}>
          
          <View style={[styles.dangerBadge, { backgroundColor: color }]}>
            <Icon name="alert-octagon" size={17} color="#fff" />
            <Text style={styles.dangerText}>{podcast.dangerLevel || "Perigo"}</Text>
          </View>
       
          <Image
            source={{ uri: podcast.image || podcast.thumbnail }}
            style={styles.modalImage}
            resizeMode="cover"
          />
         
          <Text style={styles.modalTitle}>{podcast.title}</Text>
      
          <View style={styles.infoRow}>
            <Icon name="clock-outline" size={15} color="#bbb" />
            <Text style={styles.infoText}>{podcast.duration || "Duração desconhecida"}</Text>
            <Text style={styles.dot}>•</Text>
            {podcast.free ? (
              <Text style={[styles.infoText, styles.free]}>Acesso Livre</Text>
            ) : (
              <Text style={styles.infoText}>{podcast.price}</Text>
            )}
          </View>
         
          {podcast.description && (
            <Text style={styles.modalDescription}>{podcast.description}</Text>
          )}
    
          {podcast.link && (
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => Linking.openURL(podcast.link)}
            >
              <Icon name="play-circle-outline" size={20} color="#fff" />
              <Text style={styles.modalButtonText}>Ouvir Podcast</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
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

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar podcast..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
      </View>

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
                  dangerLevel={item.dangerLevel} 
                  isFavorite={item.isFavorite}
                  duration={item.duration}
                  price={item.price}
                  free={item.free}
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

      <CriminalModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        podcast={selectedPodcast}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
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
  searchContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  searchInput: {
    height: 40,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
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
    backgroundColor: "#232526",
    borderRadius: 20,
    padding: 22,
    alignItems: "center",
    position: "relative",
  },
  dangerBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 7,
  },
  dangerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
    marginLeft: 5,
    textTransform: "uppercase",
  },
  modalImage: {
    width: 180,
    height: 104,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#333",
  },
  modalTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 6,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
  },
  infoText: {
    fontSize: 14,
    color: "#bbb",
    marginLeft: 3,
  },
  dot: {
    color: "#888",
    marginHorizontal: 7,
    fontSize: 14,
  },
  free: {
    color: "#2ecc71",
    fontWeight: "bold",
  },
  modalDescription: {
    color: "#ddd",
    fontSize: 15,
    marginVertical: 10,
    textAlign: "center",
  },
  modalButton: {
    flexDirection: "row",
    backgroundColor: "#ea4335",
    borderRadius: 9,
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignItems: "center",
    marginTop: 5,
    marginBottom: 8,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 7,
  },
  closeButton: {
    marginTop: 8,
    backgroundColor: '#444',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});