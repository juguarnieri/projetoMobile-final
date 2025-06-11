import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function ProfileHeader({ user, postCount, API_URL }) {
  return (
    <View style={styles.profileCard}>
      <Image
        source={
          user.profile_picture
            ? { uri: `${API_URL}/uploads/${user.profile_picture}` }
            : require("../assets/img/user-placeholder.png")
        }
        style={styles.avatar}
      />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.username}>@{user.username}</Text>
      <View style={styles.countersRow}>
        <View style={styles.counterBox}>
          <Text style={styles.counterNumber}>{postCount}</Text>
          <Text style={styles.counterLabel}>Publicações</Text>
        </View>
        <View style={styles.counterBox}>
          <Text style={styles.counterNumber}>{user.followers ?? 0}</Text>
          <Text style={styles.counterLabel}>Seguidores</Text>
        </View>
        <View style={styles.counterBox}>
          <Text style={styles.counterNumber}>{user.following ?? 0}</Text>
          <Text style={styles.counterLabel}>Seguindo</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 16,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
    backgroundColor: "#e5e7eb",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#22223b",
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    color: "#4f4f4f",
    marginBottom: 8,
  },
  countersRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
    marginBottom: 4,
    width: "100%",
  },
  counterBox: {
    alignItems: "center",
    flex: 1,
  },
  counterNumber: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#000339",
  },
  counterLabel: {
    fontSize: 13,
    color: "#555",
  },
});