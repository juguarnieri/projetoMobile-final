import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function FavoriteBtn({ isFavorite, onPress }) {
    return (
        <TouchableOpacity
            style={[
                style.actionBtn,
                style.actionBtnSmall,
                isFavorite && style.favoriteActive
            ]}
            onPress={onPress}
            activeOpacity={0.85}
        >
            <Icon
                name={isFavorite ? "heart" : "heart-outline"}
                size={18}
                color={isFavorite ? "#ff3333" : "#fff"}
            />
            <Text style={style.actionTextSmall}>
                {isFavorite ? "Remover" : "Favoritar"}
            </Text>
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 13,
        borderWidth: 1,
        borderColor: '#ddd',
        elevation: 1,
        minWidth: 70,
        marginBottom: 0,
        marginTop: 0,
    },
    actionBtnSmall: {
        paddingVertical: 5,
        paddingHorizontal: 9,
        minWidth: 70,
    },
    favoriteActive: {
        backgroundColor: "#ffeaea",
        borderColor: "#ff3333",
    },
    actionTextSmall: {
        color: "#444",
        marginLeft: 6,
        fontSize: 13,
        fontWeight: "bold",
        letterSpacing: 0.3,
    },
});