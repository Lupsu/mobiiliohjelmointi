import { StyleSheet, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function DisplaySymbols({ symbols, selectedSymbol, setSelectedSymbol }) {
    return (
        <View style={styles.container}>
            <Text>Select currency:</Text>
            <Picker
                selectedValue={selectedSymbol}
                onValueChange={itemValue => setSelectedSymbol(itemValue)}
                style={{ height: 300, width: 250 }}
            >
                {symbols && Object.entries(symbols).map(([key, label]) => (
                    <Picker.Item key={key} label={label} value={key} />
                ))}
            </Picker>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffffff',
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
        width: 50,
        height: 50,
        margin: 10,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    historybutton: {
        borderColor: '#000',
        borderWidth: 1,
        width: 100,
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
        flex: 4,
        backgroundColor: '#ffffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
