import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function HistoryScreen({ route }) {
    const { list } = route.params;
    return (
        <View style={styles.container}>
            <FlatList 
                data={list} 
                renderItem={({item}) => <Text>{item.value}</Text>} 
                keyExtractor={(_, index) => index.toString()} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textinput: {
        backgroundColor: '#e8e4e4c5',
        borderColor: '#000',
        borderWidth: 1,
        width: 200,
        height: 40,
        margin: 10,
        padding: 10,
        borderRadius: 5,
    },
    buttons: {
        borderColor: '#000',
        borderWidth: 1,
        width: 200,
        height: 50,
        margin: 10,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    containerrow: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containercolumn: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});