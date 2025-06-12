import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, Alert, StyleSheet, Image } from "react-native";
import axios from "axios";
import QuizQuestion from "../components/QuizQuestion";
import QuizCorrectionCard from "../components/QuizCorrectionCard";

const bannerImage = require("../assets/img/quiz.png");

const API_URL = "http://192.168.15.6:4000";
const HEADERS = { "x-api-key": "nUN1NOc7BuiiO7iSYR7gek0bxG821Z" };

export default function QuizScreen() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function fetchQuiz() {
      setLoading(true);
      try {
        const { data } = await axios.get(`${API_URL}/api/quiz`, { headers: HEADERS });
        setQuestions(data);
      } catch {
        Alert.alert("Erro", "Erro ao carregar quiz.");
      }
      setLoading(false);
    }
    fetchQuiz();
  }, []);

  const handleSelect = (questionId, alternativeId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: alternativeId }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length !== questions.length) {
      Alert.alert(
        "⚠️ Responda tudo!",
        "Você precisa responder todas as perguntas antes de enviar o quiz."
      );
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        answers: Object.entries(answers).map(([question_id, alternative_id]) => ({
          question_id: Number(question_id),
          alternative_id,
        })),
      };
      const { data } = await axios.post(`${API_URL}/api/quiz/submit`, payload, {
        headers: {
          ...HEADERS,
          "Content-Type": "application/json"
        }
      });
      setResult(data);
    } catch {
      Alert.alert(
        "Erro ao enviar 😢",
        "Ocorreu um problema ao enviar suas respostas. Tente novamente em instantes."
      );
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#e53935" />
          <Text>Carregando quiz...</Text>
        </View>
      </>
    );
  }

  if (result) {
    return (
      <ScrollView contentContainerStyle={styles.resultContainer}>
        <Text style={styles.resultTitle}>Você acertou {result.correct} de {result.total}!</Text>
        <Text style={styles.resultText}>Veja o gabarito abaixo:</Text>
        {result.correction.map((item, idx) => (
          <QuizCorrectionCard key={item.question_id} item={item} idx={idx} styles={styles} />
        ))}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setResult(null);
            setAnswers({});
          }}
        >
          <Text style={styles.buttonText}>Tentar novamente</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.bannerContainer}>
          <Image source={bannerImage} style={styles.banner} resizeMode="cover" />
          <View style={styles.overlay}>
            <Text style={styles.bannerTitle}>QUIZ CRIMINAL</Text>
          </View>
        </View>
        {questions.map((q, idx) => (
          <QuizQuestion
            key={q.id}
            question={q}
            idx={idx}
            selected={answers[q.id]}
            onSelect={handleSelect}
            submitting={submitting}
            styles={styles}
          />
        ))}
        <TouchableOpacity
          style={[styles.button, submitting && { opacity: 0.7 }]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          <Text style={styles.buttonText}>{submitting ? "Enviando..." : "Enviar Respostas"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: "#f8fafc",
    flexGrow: 1,
    alignItems: "stretch",
    justifyContent: "flex-start"
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f8fafc"
  },
title: {
  fontSize: 32,
  fontWeight: "bold",
  color: "#d90429", 
  marginBottom: 28,
  textAlign: "center",
  letterSpacing: 1.5,
  textShadowColor: "#ffe3e3",
  textShadowOffset: { width: 0, height: 2 },
  textShadowRadius: 6,
  textTransform: "uppercase",
  backgroundColor: "#fff0f0",
  paddingVertical: 12,
  paddingHorizontal: 10,
  borderRadius: 12,
  overflow: "hidden",
  elevation: 2,
},
  questionBlock: {
    marginBottom: 26,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d90429",
    marginBottom: 6
  },
  question: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#222"
  },
  alternative: {
    padding: 13,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#e0e0e0",
    marginBottom: 8,
    backgroundColor: "#f1f1f1"
  },
  selectedAlternative: {
    backgroundColor: "#f77e7e",
    borderColor: "#d90429"
  },
  altText: {
    color: "#222",
    fontSize: 15
  },
  button: {
    backgroundColor: "#d90429",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 22,
    marginBottom: 30,
    shadowColor: "#d90429",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    letterSpacing: 0.5
  },
  resultContainer: {
    padding: 18,
    backgroundColor: "#f8fafc",
    flexGrow: 1,
    alignItems: "stretch",
    justifyContent: "flex-start"
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#d90429",
    marginBottom: 14
  },
  resultText: {
    fontSize: 16,
    color: "#222",
    marginBottom: 20
  },
  correctionCard: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 14,
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  correct: {
    borderLeftWidth: 6,
    borderLeftColor: "#22c55e",
    backgroundColor: "#e7fbe9"
  },
  incorrect: {
    borderLeftWidth: 6,
    borderLeftColor: "#ef4444",
    backgroundColor: "#fbeaea"
  },
  bannerContainer: {
    width: '100%',
    height: 150,
    position: 'relative',
    marginBottom: 18,
    borderRadius: 18,
    overflow: 'hidden', // importante para arredondar a imagem
    backgroundColor: '#fff',
  },
  banner: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
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