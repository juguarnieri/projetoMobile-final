import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function QuizQuestion({ question, idx, selected, onSelect, submitting, styles }) {
  return (
    <View style={styles.questionBlock}>
      <Text style={styles.questionTitle}>Questão {idx + 1}</Text>
      <Text style={styles.question}>{question.question_text}</Text>
      {question.alternatives.map((alt, i) => (
        <TouchableOpacity
          key={alt.id}
          style={[
            styles.alternative,
            selected === alt.id && styles.selectedAlternative
          ]}
          onPress={() => onSelect(question.id, alt.id)}
          disabled={submitting}
        >
          <Text style={styles.altText}>
            {String.fromCharCode(65 + i)}) {alt.alternative_text}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}