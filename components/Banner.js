import React from "react";
import { View, Image, StyleSheet } from "react-native";

export default function Banner({ image }) {
  return (
    <View style={styles.container}>
      <Image
        source={image}
        style={styles.bannerImage}
        resizeMode="cover"
      />
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
});