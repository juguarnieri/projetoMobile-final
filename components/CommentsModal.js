import React from "react";
import { Modal, View, Text, TouchableOpacity, ActivityIndicator, FlatList, Image, StyleSheet } from "react-native";

export default function CommentsModal({ visible, onClose, loading, comments, API_URL, navigation, handleCloseComments }) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalBg}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={{ color: "#fff" }}>✖</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Comentários</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#000339" />
          ) : comments.length === 0 ? (
            <Text style={styles.empty}>Nenhum comentário.</Text>
          ) : (
            <FlatList
              data={comments}
              keyExtractor={(item) => item.id?.toString()}
renderItem={({ item }) => (
  <View style={styles.commentCard}>
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 2 }}>
      <Image
        source={
          item.profile_picture
            ? { uri: `${API_URL}/uploads/${item.profile_picture}` }
            : require("../assets/img/user-placeholder.png")
        }
        style={styles.commentAvatar}
      />
<TouchableOpacity
  onPress={() => {
    handleCloseComments();
    setTimeout(() => {
      navigation.navigate("UserProfile", { id: item.user_id }); 
    }, 300);
  }}
>
  <Text style={styles.commentUser}>@{item.username}</Text>
</TouchableOpacity>
    </View>
    <Text style={styles.commentText}>{item.content}</Text>
  </View>

              )}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    width: "85%",
    maxHeight: "70%",
  },
  closeBtn: {
    backgroundColor: "#000339",
    padding: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000339",
    marginBottom: 12,
    alignSelf: "center",
  },
  commentCard: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 8,
  },
  commentAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
    backgroundColor: "#eee",
  },
  commentUser: {
    fontWeight: "bold",
    color: "#1677ff",
    marginBottom: 2,
  },
  commentText: {
    color: "#222",
    fontSize: 15,
  },
  empty: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
    marginBottom: 20,
  },
});