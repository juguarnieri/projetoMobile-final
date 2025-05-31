import React from "react";
import { View, Text } from "react-native";

export default function QuizCorrectionCard({ item, idx, styles }) {
  return (
    <View
      style={[
        styles.correctionCard,
        item.is_correct ? styles.correct : styles.incorrect
      ]}
    >
      <Text style={styles.questionTitle}>Questão {idx + 1}</Text>
      <Text style={styles.question}>{item.question_text}</Text>
      <Text>
        Sua resposta:{" "}
        <Text style={{
          fontWeight: "bold",
          color: item.is_correct ? "#22c55e" : "#ef4444"
        }}>
          {item.your_answer_letter
            ? `${item.your_answer_letter}) ${item.your_answer_text}`
            : "Não respondida"}
        </Text>
      </Text>
      {!item.is_correct && (
        <Text>
          Correta:{" "}
          <Text style={{ fontWeight: "bold", color: "#22c55e" }}>
            {item.correct_alternative_letter}) {item.correct_alternative_text}
          </Text>
        </Text>
      )}
    </View>
  );
}