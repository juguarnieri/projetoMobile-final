import React, { useEffect, useState, useMemo } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PostCard from "../components/PostCard";
import CommentsModal from "../components/CommentsModal";
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";

const API_URL = "http://localhost:4000";
const HEADERS = { "x-api-key": "nUN1NOc7BuiiO7iSYR7gek0bxG821Z" };

export default function Feed() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likeLoading, setLikeLoading] = useState({});
  const [userLikes, setUserLikes] = useState({});
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    async function fetchFeed() {
      setLoading(true);
      try {
        const postsRes = await fetch(`${API_URL}/api/posts`, { headers: HEADERS });
        const postsData = await postsRes.json();

        const enrichedPosts = await Promise.all(
          (postsData.data || []).map(async (post) => {
            let like_count = 0;
            let dislike_count = 0;
            let commentsArr = [];
            try {
              const likesRes = await fetch(`${API_URL}/api/posts/${post.id}/likes`, { headers: HEADERS });
              const likesData = await likesRes.json();
              like_count = likesData.likes ?? 0;
            } catch {}
            try {
              const dislikesRes = await fetch(`${API_URL}/api/posts/${post.id}/dislikes`, { headers: HEADERS });
              const dislikesData = await dislikesRes.json();
              dislike_count = dislikesData.dislikes ?? 0;
            } catch {}
            try {
              const commentsRes = await fetch(`${API_URL}/api/comments/${post.id}`, { headers: HEADERS });
              const commentsData = await commentsRes.json();
              commentsArr = Array.isArray(commentsData) ? commentsData : [];
            } catch {}
            return { ...post, like_count, dislike_count, comments: commentsArr };
          })
        );

        setPosts(enrichedPosts);
      } catch {
      } finally {
        setLoading(false);
      }
    }
    fetchFeed();
  }, []);

  useEffect(() => {
    const lower = search.toLowerCase();
    setFilteredData(
      posts.filter(
        (p) =>
          p.title?.toLowerCase().includes(lower) ||
          p.caption?.toLowerCase().includes(lower) ||
          p.username?.toLowerCase().includes(lower) ||
          p.name?.toLowerCase().includes(lower)
      )
    );
    setCurrent(1);
  }, [search, posts]);

  const paginated = useMemo(() => {
    return filteredData.slice((current - 1) * pageSize, current * pageSize);
  }, [filteredData, current, pageSize]);

  const handleLike = async (postId) => {
    if (userLikes[postId] === "like") return;
    setLikeLoading((prev) => ({ ...prev, [postId]: true }));
    try {
      await fetch(`${API_URL}/api/posts/${postId}/like/${postId}`, {
        method: "POST",
        headers: HEADERS,
      });
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, like_count: (parseInt(p.like_count) || 0) + 1 } : p
        )
      );
      setUserLikes((prev) => ({ ...prev, [postId]: "like" }));
    } catch {}
    setLikeLoading((prev) => ({ ...prev, [postId]: false }));
  };

  const handleUnlike = async (postId) => {
    if (userLikes[postId] === "unlike") return;
    setLikeLoading((prev) => ({ ...prev, [postId]: true }));
    try {
      await fetch(`${API_URL}/api/posts/${postId}/unlike/${postId}`, {
        method: "POST",
        headers: HEADERS,
      });
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, like_count: Math.max((parseInt(p.like_count) || 1) - 1, 0) } : p
        )
      );
      setUserLikes((prev) => ({ ...prev, [postId]: "unlike" }));
    } catch {}
    setLikeLoading((prev) => ({ ...prev, [postId]: false }));
  };

  const handleOpenComments = async (postId) => {
    setCommentsVisible(true);
    setLoadingComments(true);
    try {
      const res = await fetch(`${API_URL}/api/comments/${postId}`, { headers: HEADERS });
      const data = await res.json();
      setComments(Array.isArray(data) ? data : []);
    } catch {
      setComments([]);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleCloseComments = () => {
    setCommentsVisible(false);
    setComments([]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f7f8fa" }}>
         <Banner image={require("../assets/img/banner2.png")} />
      <View style={styles.feedWrapper}>
        <Text style={styles.title}>FIQUE LIGADO</Text>
        <View style={styles.feedHeader}>
          <SearchBar
  value={searchInput}
  onChangeText={setSearchInput}
  onSearch={() => {
    setSearch(searchInput);
    setCurrent(1);
  }}
  placeholder="Pesquisar publicações, legendas ou usuário..."
  style={{ width: '100%', alignSelf: 'stretch' }}
/>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#000339" style={{ marginTop: 40 }} />
        ) : paginated.length === 0 ? (
          <Text style={styles.empty}>Nenhuma publicação encontrada.</Text>
        ) : (
          <FlatList
            data={paginated}
            keyExtractor={(item) => item.id?.toString()}
            renderItem={({ item }) => (
              <PostCard
                post={item}
                API_URL={API_URL}
                handleLike={handleLike}
                handleUnlike={handleUnlike}
                handleOpenComments={handleOpenComments}
                likeLoading={likeLoading}
                userLikes={userLikes}
              />
            )}
            contentContainerStyle={{ paddingBottom: 24 }}
          />
        )}

        <View style={styles.feedPagination}>
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

<CommentsModal
      visible={commentsVisible}
      onClose={handleCloseComments}
      loading={loadingComments}
      comments={comments}
      API_URL={API_URL}
      navigation={navigation} 
      handleCloseComments={handleCloseComments}
    />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  feedWrapper: { flex: 1, padding: 16, backgroundColor: "#f7f8fa" },
  title: { fontSize: 18, fontWeight: "bold", color: "#000339", alignSelf: "right" },
  feedHeader: { 
  marginBottom: 12, 
  alignSelf: 'center',
  width: '110%', 
  alignItems: 'stretch', 
  paddingHorizontal: 0,  
  marginHorizontal: 0,  
},
  feedSearchGroup: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  feedSearchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    padding: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#222",
    marginRight: 8,
  },
  feedSearchButton: {
    padding: 8,
    backgroundColor: "#e6f0ff",
    borderRadius: 8,
    marginRight: 4,
  },
  feedClearButton: {
    padding: 8,
    backgroundColor: "#ffe6e6",
    borderRadius: 8,
  },
  empty: { textAlign: "center", color: "#888", marginTop: 40 },
  feedPagination: {
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