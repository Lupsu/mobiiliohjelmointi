import { StyleSheet, Button, View, TextInput, Text } from 'react-native';
import { useState, useEffect } from 'react';
import DisplaySymbols from './DisplaySymbols';

export default function CurrencyConverter() {

    const [money, setMoney] = useState('');
    const [convertedValue, setConvertedValue] = useState('');
    const [symbols, setSymbols] = useState({});
    const [selectedSymbol, setSelectedSymbol] = useState();

    function handleConvert() {
        if (!selectedSymbol || !money) return;
        fetch(`https://api.apilayer.com/exchangerates_data/convert?to=EUR&from=${selectedSymbol}&amount=${money}`, {
            headers: {
                "apikey": "3wMyIeCHWzqfHhx7KHTQ4Ca2T5VSNtcl"
            },
            method: "GET"
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in fetch:" + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data && data.result !== undefined) {
                setConvertedValue(data.result);
            } else {
                setConvertedValue('Conversion error');
            }
        })
        .catch(err => {
            setConvertedValue('Conversion error');
            console.error(err);
        });
        }
        
    useEffect(() => {
        fetch('https://api.apilayer.com/exchangerates_data/symbols', {
            headers: {
                "apikey": "3wMyIeCHWzqfHhx7KHTQ4Ca2T5VSNtcl"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in fetch:" + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            setSymbols(data.symbols);
            const keys = Object.keys(data.symbols);
            if (keys.length > 0) {
                setSelectedSymbol(keys[0]);
            }
        })
        .catch(err => console.error(err));
    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.containercolumn}>
                <TextInput 
                style={styles.textinput}
                keyboardType='number-pad'
                placeholder='money amount'
                value={money}
                onChangeText={text => setMoney(text)}
                />
                <Button title="Convert" style={styles.buttons} onPress={() => {
                    handleConvert()
                }} />
                <Text>Converted value: {Number(convertedValue).toFixed(2)} €</Text>
                <DisplaySymbols
                    symbols={symbols}
                    selectedSymbol={selectedSymbol}
                    setSelectedSymbol={setSelectedSymbol}
                />
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#c30606ff',
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
        flex: 1,
        backgroundColor: '#ffffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});