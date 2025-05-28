import React, { useEffect, useState, useMemo } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import UserCard from "../components/UserCard";
import Banner from "../components/Banner";

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
    <View style={{ flex: 1, backgroundColor: "#f7f8fa" }}>
      <Banner image={require("../assets/img/banner1.png")} />
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={styles.title}>Usuários</Text>
        <TextInput
          style={styles.input}
          placeholder="Buscar por nome ou usuário"
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#888"
        />
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
                <Text style={styles.pageBtnText}>Anterior</Text>
              </TouchableOpacity>
              <Text style={styles.pageInfo}>
                Página {current} de {Math.max(1, Math.ceil(filteredData.length / pageSize))}
              </Text>
              <TouchableOpacity
                onPress={() => setCurrent((c) => c + 1)}
                disabled={current >= Math.ceil(filteredData.length / pageSize)}
                style={[
                  styles.pageBtn,
                  current >= Math.ceil(filteredData.length / pageSize) && styles.disabledBtn,
                ]}
              >
                <Text style={styles.pageBtnText}>Próxima</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f8fa", padding: 16 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 16, color: "#000339", alignSelf: "right" },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    padding: 12,
    marginBottom: 18,
    backgroundColor: "#fff",
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
    paddingVertical: 8,
    paddingHorizontal: 18,
    backgroundColor: "#000339",
    borderRadius: 8,
    marginHorizontal: 8,
  },
  disabledBtn: { backgroundColor: "#ccc" },
  pageBtnText: { color: "#fff", fontWeight: "bold" },
  pageInfo: { fontSize: 16, color: "#222" },
});