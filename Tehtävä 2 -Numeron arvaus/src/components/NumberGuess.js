import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import { useState } from 'react';

function NumberGuess() {
    const [guess, setGuess] = useState("");
    const [answer, setAnswer] = useState(Math.floor(Math.random() * 100) + 1);
    const [clickcounter, setClickCounter] = useState("");
    const [displaytext, setDisplayText] = useState("Guess a number between 1-100")

    const MakeGuessButton = () => {
        return (
            <Pressable
                style={({ pressed }) => [
                    styles.buttons,
                    {backgroundColor: pressed ? 'darkblue' : 'blue' },
                ]}
                onPress={() => {
                    setClickCounter(Number(clickcounter) + 1);
                    setGuess(guess);
                    if (Number(guess) == Number(answer)) {
                        Alert.alert("You guessed the number in " + clickcounter + " guesses");
                    } else {
                        setDisplayText(Compare(guess, answer))
                    } 
                }}
            >
                <Text style={styles.buttonText}>Make a guess</Text>
            </Pressable>
        );
    };
    return (
        <View style={styles.container}>
        <Text>{displaytext}</Text>
        <TextInput
            placeholder='Enter number'
            keyboardType="number-pad"
            style={styles.textinput}
            onChangeText={guess => setGuess(guess)}
            value={guess}
        />
        <MakeGuessButton />
    </View>
    )
    
    
}

function Compare(guess, answer) {
    if (Number(guess) > Number(answer)) {
        return "Your guess " + guess + " is too high"
    } else {
        return "Your guess " + guess + " is too low"
    }
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
        height: 75,
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

export default NumberGuess;