import { StyleSheet, Button, View, TextInput } from 'react-native';
import { useState } from 'react';
import DisplayResults from './DisplayResults';

export default function Search() {
    const [keyword, setKeyword] = useState('');
    const [recipes, setRecipes] = useState([]);

    const handleFetch = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`)
        .then(response => {
            if (!response.ok)
            throw new Error("Error in fetch:" + response.statusText);
      
            return response.json()
    })
    .then(data => setRecipes(data.meals))
    .catch(err => console.error(err));    
    }

    return (
        <View style={styles.container}>
            <View style={styles.container}></View>
            <View style={styles.containercolumn}>
                <TextInput 
                style={styles.textinput}
                placeholder='keyword'
                value={keyword}
                onChangeText={text => setKeyword(text)}
                />
                <Button title="Find" onPress={handleFetch} />
                <DisplayResults recipes={recipes} />
                </View>
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