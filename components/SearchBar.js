import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Feather from "react-native-vector-icons/Feather";

export default function SearchBar({ value, onChangeText, onSearch, placeholder }) {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder || "Pesquisar..."}
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSearch}
      />
      <TouchableOpacity onPress={onSearch}>
        <Feather
          name="search"
          size={20}
          color="#888"
          style={styles.searchIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 10,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginLeft: 8,
    marginRight: 4,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
});