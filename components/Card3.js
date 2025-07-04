import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const BASE_URL = "http://localhost:4000";

export default function Card3({
  imageUri,
  title,
  isFavorite,
  price,
  free,
  onPress,
  onPressFavorite,
  cardStyle,
}) {
const getImageUrl = (uri) => {
  if (!uri) return require("../assets/img/podcast-placeholder.png");
  if (uri.startsWith("http")) return { uri };
  if (uri.startsWith("/uploads/")) return { uri: `${BASE_URL}${uri}` };
  return { uri: `${BASE_URL}/uploads/${uri}` };
};
  return (
    <TouchableOpacity style={[styles.card, cardStyle]} activeOpacity={0.9} onPress={onPress}>
      <TouchableOpacity onPress={onPressFavorite} style={styles.favoriteBtn}>
        <Icon
          name={isFavorite ? "handcuffs" : "handcuffs-off"}
          size={22}
          color={isFavorite ? "#ff3333" : "#bbb"}
        />
      </TouchableOpacity>
      <Image
        source={getImageUrl(imageUri)}
        style={styles.image}
      />
      <Text style={styles.title} numberOfLines={2}>{title}</Text>
      <View style={styles.infoRow}>
        {free ? (
          <Text style={[styles.infoText, styles.free]}>Acesso Livre</Text>
        ) : (
          price ? <Text style={styles.infoText}>{price}</Text> : null
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 200,
    backgroundColor: "#fff",
    borderRadius: 13,
    margin: 10,
    alignItems: "flex-start",
    elevation: 2,
    paddingBottom: 14,
    position: "relative",
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  favoriteBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 2,
    padding: 2,
    backgroundColor: "#fff",
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#eee",
  },
  image: {
    width: 180,
    height: 100,
    borderRadius: 10,
    marginTop: 28,
    marginHorizontal: 10,
    marginBottom: 8,
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
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
    color: "#666",
  },
  free: {
    color: "#2ecc71",
    fontWeight: "bold",
    marginLeft: 2,
  },
});