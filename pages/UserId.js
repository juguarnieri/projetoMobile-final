import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import ProfileHeader from "../components/ProfileHeader";
import PostCard from "../components/PostCard";
import CommentsModal from "../components/CommentsModal";

const API_URL = "http://localhost:4000";
const HEADERS = { "x-api-key": "nUN1NOc7BuiiO7iSYR7gek0bxG821Z" };

export default function UserProfile() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likeLoading, setLikeLoading] = useState({});
  const [userLikes, setUserLikes] = useState({});
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const userRes = await fetch(`${API_URL}/api/users/${id}`, { headers: HEADERS });
        const userData = await userRes.json();

        const postsRes = await fetch(`${API_URL}/api/posts/user/${id}`, { headers: HEADERS });
        const postsData = await postsRes.json();

        const postsWithExtras = await Promise.all(
          postsData.map(async (post) => {
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

        setUser(userData);
        setPosts(postsWithExtras);
        setPostCount(postsData.length); 
      } catch {
        setUser(null);
        setPosts([]);
        setPostCount(0);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const handleLike = async (postId) => {
    if (userLikes[postId] === "like") return;
    setLikeLoading((prev) => ({ ...prev, [postId]: true }));
    try {
      await fetch(`${API_URL}/api/posts/${postId}/like/${id}`, {
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
      await fetch(`${API_URL}/api/posts/${postId}/unlike/${id}`, {
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
    setSelectedPostId(postId);
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
    setSelectedPostId(null);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000339" />
      </View>
    );
  }
  if (!user) {
    return (
      <View style={styles.centered}>
        <Text>Usuário não encontrado.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f7f8fa" }}>
      <ScrollView style={styles.pageBg} contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>⬅ </Text>
        </TouchableOpacity>

        <ProfileHeader user={user} postCount={postCount} styles={styles} API_URL={API_URL} />

        <Text style={styles.sectionTitle}>POSTS</Text>
        <View style={styles.divider} />
        <View style={styles.contentContainer}>
          {posts.length === 0 ? (
            <Text style={styles.empty}>Nenhuma publicação encontrada.</Text>
          ) : (
            posts.map((post, idx) => (
              <React.Fragment key={post.id}>
                <PostCard
                  post={post}
                  styles={styles}
                  API_URL={API_URL}
                  handleLike={handleLike}
                  handleUnlike={handleUnlike}
                  handleOpenComments={handleOpenComments}
                  likeLoading={likeLoading}
                />
                {idx < posts.length - 1 && <View style={styles.divider} />}
              </React.Fragment>
            ))
          )}
        </View>
        <CommentsModal
          visible={commentsVisible}
          onClose={handleCloseComments}
          loading={loadingComments}
          comments={comments}
          styles={styles}
          API_URL={API_URL}
          navigation={navigation}
          handleCloseComments={handleCloseComments}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageBg: { flex: 1, backgroundColor: "#f7f8fa" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  backButton: {
    backgroundColor: "#000339",
    top: 30,
    padding: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
    margin: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000339",
    marginLeft: 24,
    marginBottom: 8,
  },
  empty: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#d9d9d9",
    marginVertical: 16,
    marginHorizontal: 20,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});