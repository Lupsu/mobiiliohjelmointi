import { StyleSheet, Text, View, TextInput, Pressable, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import { useState } from 'react';

function Calculator( {navigation} ) {
    const [numberOne, setNumberOne] = useState("");
    const [numberTwo, setNumberTwo] = useState("");
    const [numbersTotal, setNumbersTotal] = useState("");
    const [history, setHistory] = useState([]);
    
    const PlusButton = () => {
        return (
            <Pressable
                style={({ pressed }) => [
                    styles.buttons,
                    {backgroundColor: pressed ? 'darkgreen' : 'green' },
                ]}
                onPress={() => {
                    const result = Number(numberOne) + Number(numberTwo);
                    setNumbersTotal(result);
                    const entry = numberOne + " + " + numberTwo + " = " + result;
                    setHistory([...history, { value: entry }]);
                }}
            >
                <Text style={styles.buttonText}>+</Text>
            </Pressable>
        );
    };

    const MinusButton = () => {
        return (
            <Pressable
                style={({ pressed }) => [
                    styles.buttons,
                    {backgroundColor: pressed ? 'darkred' : 'red' },
                ]}
                onPress={() => {
                    const result = Number(numberOne) - Number(numberTwo);
                    setNumbersTotal(result);
                    const entry = numberOne + " - " + numberTwo + " = " + result;
                    setHistory([...history, { value: entry }]);
                }}
            >
                <Text style={styles.buttonText}>-</Text>
            </Pressable>
        );
    };

    const NavigationHistoryButton = () => {
        return(
            <Pressable
                style={({ pressed }) => [
                    styles.historybutton,
                    {backgroundColor: pressed ? 'darkgreen' : 'green' },
                ]}
                onPress={() => navigation.navigate('History', {list: history})
            }
            >
                <Text style={styles.buttonText}>History</Text>
            </Pressable>
        )
    }


    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
            <View style={styles.container}></View>
            <View style={styles.containercolumn}>
                <TextInput
                    placeholder='Enter number one'
                    keyboardType="number-pad"
                    style={styles.textinput}
                    onChangeText={numberOne => setNumberOne(numberOne)}
                    value={numberOne}
                />
                <TextInput
                    placeholder='Enter number two'
                    keyboardType="number-pad"
                    style={styles.textinput}
                    onChangeText={numberTwo => setNumberTwo(numberTwo)}
                    value={numberTwo}
                />
    
                <Text>Result: {numbersTotal}</Text>
            </View>
            <View style={styles.containerrow}>
                <PlusButton />
                <MinusButton />
                <NavigationHistoryButton />
            </View>
            <View style={styles.container}></View>
            <View style={styles.container}></View>
        </View>
        </TouchableWithoutFeedback>
    );
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Calculator;