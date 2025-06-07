import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PostImageCarousel from "./PostImageCarousel";

export default function PostCard({ post, API_URL, handleLike, handleUnlike, handleOpenComments, likeLoading }) {
  const navigation = useNavigation();

  // Suporte a múltiplas imagens (jpg, png, etc)
  let images = [];
  if (Array.isArray(post.media_urls)) {
    images = post.media_urls.map(img =>
      img.startsWith("http")
        ? img
        : `${API_URL}/uploads/${img}`
    );
  } else if (post.media_url) {
    images = [
      post.media_url.startsWith("http")
        ? post.media_url
        : `${API_URL}/uploads/${post.media_url}`
    ];
  }

  return (
    <View style={styles.postCard}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
        <Image
          source={
            post.profile_picture
              ? { uri: `${API_URL}/uploads/${post.profile_picture}` }
              : require("../assets/img/user-placeholder.png")
          }
          style={{ width: 36, height: 36, borderRadius: 18, marginRight: 8, backgroundColor: "#eee" }}
        />
        <View>
          <Text style={{ fontWeight: "bold" }}>{post.name || "Usuário"}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("UserProfile", { id: post.user_id || post.id })}
          >
            <Text style={{ color: "#1677ff" }}>@{post.username || ""}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.postTitle}>{post.title}</Text>
      {images.length > 0 && <PostImageCarousel images={images} />}
      <Text style={styles.postContent}>{post.caption || post.content}</Text>
      <View style={styles.postActions}>
        <TouchableOpacity
          onPress={() => handleLike(post.id)}
          disabled={likeLoading[post.id]}
          style={styles.likeBtn}
        >
          <Text style={{ color: "#1677ff" }}>👍 ({post.like_count})</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleUnlike(post.id)}
          disabled={likeLoading[post.id]}
          style={styles.unlikeBtn}
        >
          <Text style={{ color: "#ff3333" }}>👎</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleOpenComments(post.id)}
          style={styles.commentBtn}
        >
          <Text style={{ color: "#555" }}>💬 ({post.comments?.length || 0})</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  postCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 14,
    elevation: 1,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#22223b",
    marginBottom: 4,
  },
  postImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: "#eee",
  },
  postContent: {
    fontSize: 15,
    color: "#333",
    marginBottom: 10,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  likeBtn: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: "#e6f0ff",
  },
  unlikeBtn: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: "#ffe6e6",
  },
  commentBtn: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: "#f2f2f2",
  },
});