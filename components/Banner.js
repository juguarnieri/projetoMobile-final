import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

export default function Banner({ image, title, subtitle, overlayStyle, textStyle }) {
  return (
    <View style={styles.container}>
      <Image
        source={image}
        style={styles.bannerImage}
        resizeMode="cover"
      />
      {(title || subtitle) && (
        <View style={[styles.overlay, overlayStyle]}>
          {title && <Text style={[styles.title, textStyle]}>{title}</Text>}
          {subtitle && <Text style={[styles.subtitle, textStyle]}>{subtitle}</Text>}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 140,
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#22223b",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.35)",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  subtitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 2,
  },
});