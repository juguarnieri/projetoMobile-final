import React, { useEffect, useState, useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Image, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import UserCard from "../components/UserCard";
import SearchBar from "../components/SearchBar";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Account() {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [connectionError, setConnectionError] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/users", {
        headers: { "x-api-key": "nUN1NOc7BuiiO7iSYR7gek0bxG821Z" }
      });
      const data = await res.json();
      setUsers(data);
      setFilteredData(data);
      setConnectionError(false);
    } catch (err) {
      setConnectionError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const lower = search.toLowerCase();
    setFilteredData(
      users.filter(
        (u) =>
          u.name?.toLowerCase().includes(lower) ||
          u.username?.toLowerCase().includes(lower)
      )
    );
    setCurrent(1);
  }, [search, users]);

  const paginated = useMemo(() => {
    return filteredData.slice((current - 1) * pageSize, current * pageSize);
  }, [filteredData, current, pageSize]);

  const renderUser = ({ item }) => (
    <UserCard
      item={item}
      onPress={() => navigation.navigate("UserProfile", { id: item.id })}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f7f8fa" }}>
      <View style={styles.bannerContainer}>
        <Image
          source={require("../assets/img/banner1.png")}
          style={styles.banner}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
          <Text style={styles.bannerTitle}>
            USERS
          </Text>
        </View>
      </View>
      <View style={{ flex: 1, padding: 16 }}>
        <View style={styles.feedHeader}>
          <SearchBar
            value={search}
            onChangeText={setSearch}
            onSearch={() => {}} 
            placeholder="Buscar por nome ou usuário"
            style={{ width: '100%', alignSelf: 'stretch', minHeight: 48 }}
          />
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#000339" />
        ) : connectionError ? (
          <Text style={styles.error}>Conexão com o backend falhou.</Text>
        ) : (
          <>
            <FlatList
              data={paginated}
              keyExtractor={(item) => item.id?.toString()}
              renderItem={renderUser}
              ListEmptyComponent={<Text style={styles.empty}>Nenhum usuário encontrado.</Text>}
              contentContainerStyle={{ paddingBottom: 24 }}
            />
            <View style={styles.pagination}>
              <TouchableOpacity
                onPress={() => setCurrent((c) => Math.max(1, c - 1))}
                disabled={current === 1}
                style={[styles.pageBtn, current === 1 && styles.disabledBtn]}
              >
                <Ionicons name="chevron-back" size={16} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setCurrent((c) => c + 1)}
                disabled={current >= Math.ceil(filteredData.length / pageSize)}
                style={[
                  styles.pageBtn,
                  current >= Math.ceil(filteredData.length / pageSize) && styles.disabledBtn,
                ]}
              >
                <Ionicons name="chevron-forward" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f8fa", padding: 16 },
  title: { fontSize: 18, fontWeight: "bold", color: "#000339", alignSelf: "right" },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    padding: 12,
    marginBottom: 18,
    backgroundColor: "#fff",
    elevation: 2,
    fontSize: 16,
    color: "#222",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    marginTop: 8,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
    backgroundColor: "#e5e7eb",
  },
  feedHeader: { 
    marginBottom: 18,     
    marginTop: 2,         
    alignSelf: 'center',
    width: '110%',       
    alignItems: 'stretch', 
    paddingHorizontal: 0, 
    marginHorizontal: 0,  
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#22223b",
    marginBottom: 4,
  },
  username: {
    fontSize: 15,
    color: "#4f4f4f",
  },
  error: { color: "red", textAlign: "center", marginTop: 20 },
  empty: { textAlign: "center", color: "#888", marginTop: 40 },
  pagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  pageBtn: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: "#000339",
    borderRadius: 8,
    marginHorizontal: 4,
  },
  disabledBtn: { backgroundColor: "#ccc" },
  pageBtnText: { color: "#fff", fontWeight: "bold" },
  pageInfo: { fontSize: 16, color: "#222" },
  bannerContainer: {
    width: '100%',
    height: 150,
    position: 'relative',
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
});