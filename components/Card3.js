import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Card3({
  imageUri,
  title,
  dangerLevel,
  isFavorite,
  duration,
  price,
  free,
  onPress,
  onPressFavorite,
}) {

  const dangerColors = {
    "Alto": "#ea4335",
    "Médio": "#fbbc05",
    "Baixo": "#34a853",
    "Perigo": "#ea4335"
  };

  const color = dangerColors[dangerLevel] || dangerColors["Perigo"];

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>
     
      <View style={styles.topRow}>
        <View style={[styles.dangerBadge, { backgroundColor: color }]}>
          <Icon name="alert-octagon" size={15} color="#fff" />
          <Text style={styles.dangerText}>{dangerLevel || "Perigo"}</Text>
        </View>
        <TouchableOpacity onPress={onPressFavorite} style={styles.favoriteBtn}>
          <Icon
            name={isFavorite ? "handcuffs" : "handcuffs-off"}
            size={22}
            color={isFavorite ? "#ff3333" : "#bbb"}
          />
        </TouchableOpacity>
      </View>
     
      <Image source={{ uri: imageUri }} style={styles.image} />
   
      <Text style={styles.title} numberOfLines={2}>{title}</Text>
    
      <View style={styles.infoRow}>
        <Icon name="clock-outline" size={14} color="#bbb" />
        <Text style={styles.infoText}>{duration}</Text>
        <Text style={styles.dot}>•</Text>
        {free ? (
          <Text style={[styles.infoText, styles.free]}>Acesso Livre</Text>
        ) : (
          <Text style={styles.infoText}>{price}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 200,
    backgroundColor: "#27282b",
    borderRadius: 13,
    margin: 10,
    alignItems: "flex-start",
    elevation: 2,
    paddingBottom: 14,
    position: "relative",
    borderWidth: 1,
    borderColor: "#232526",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  topRow: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    zIndex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    width: 180,
  },
  dangerBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 9,
    paddingHorizontal: 8,
    paddingVertical: 3,
    minWidth: 45,
    justifyContent: "center",
    shadowColor: "#fff",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  dangerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
    marginLeft: 4,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  favoriteBtn: {
    padding: 2,
    backgroundColor: "#222",
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#333",
  },
  image: {
    width: 180,
    height: 100,
    borderRadius: 10,
    marginTop: 28,
    marginHorizontal: 10,
    marginBottom: 8,
    backgroundColor: "#333",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "left",
    marginLeft: 13,
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 13,
    marginTop: 2,
  },
  infoText: {
    fontSize: 13,
    color: "#bbb",
    marginLeft: 3,
  },
  dot: {
    color: "#666",
    marginHorizontal: 7,
    fontSize: 13,
  },
  free: {
    color: "#2ecc71",
    fontWeight: "bold",
    marginLeft: 2,
  },
});