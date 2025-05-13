import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>
                <Text style={styles.titleWhite}>CRIME </Text>
                <Text style={styles.titleRed}>WHISPERS</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: '#020038',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        textAlign: 'center',
        justifyContent: 'center'
},
    menuButton: {
        marginRight: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleWhite: {
        color: '#FFFFFF',
    },
    titleRed: {
        color: '#FF0000',
    },
});