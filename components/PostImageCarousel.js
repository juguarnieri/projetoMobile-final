import React, { useRef, useState } from "react";
import { View, Image, TouchableOpacity, FlatList, StyleSheet, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function PostImageCarousel({ images = [] }) {
  const flatListRef = useRef(null);
  const [index, setIndex] = useState(0);

  const scrollToIndex = (i) => {
    flatListRef.current?.scrollToIndex({ index: i, animated: true });
    setIndex(i);
  };

  if (!images || images.length === 0) return null;

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
        )}
        onMomentumScrollEnd={e => {
          const i = Math.round(e.nativeEvent.contentOffset.x / (width - 64));
          setIndex(i);
        }}
        getItemLayout={(_, i) => ({
          length: width - 64,
          offset: (width - 64) * i,
          index: i,
        })}
      />
      {images.length > 1 && (
        <>
          <TouchableOpacity
            style={[styles.arrow, { left: 8 }]}
            onPress={() => index > 0 && scrollToIndex(index - 1)}
            disabled={index === 0}
          >
            <AntDesign name="left" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.arrow, { right: 8 }]}
            onPress={() => index < images.length - 1 && scrollToIndex(index + 1)}
            disabled={index === images.length - 1}
          >
            <AntDesign name="right" size={24} color="#fff" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    width: "100%",
    height: 220,
    position: "relative",
    marginBottom: 12,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#eee",
    alignSelf: "center",
  },
  image: {
    width: width - 64,
    height: 220,
    borderRadius: 20,
  },
  arrow: {
    position: "absolute",
    top: "45%",
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 8,
    borderRadius: 20,
    zIndex: 10,
  },
});