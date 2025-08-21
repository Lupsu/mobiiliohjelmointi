import { StyleSheet, Text, View, TextInput, Pressable, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import { useState } from 'react';

function ShoppingList() {
    const [ShoppingListItem, setShoppingListItem] = useState("");
    const [ShoppingList, setShoppingList] = useState([]);

    const AddButton = () => {
        return (
            <Pressable
                style={({ pressed }) => [
                    styles.buttons,
                    {backgroundColor: pressed ? 'darkblue' : 'blue' },
                ]}
                onPress={() => {
                    setShoppingList([...ShoppingList, { value: ShoppingListItem}])
                }}
            >
                <Text style={styles.buttonText}>Add</Text>
            </Pressable>
        );
    };

    const ClearButton = () => {
        return (
            <Pressable
                style={({ pressed }) => [
                    styles.buttons,
                    {backgroundColor: pressed ? 'darkblue' : 'blue' },
                ]}
                onPress={() => {
                    setShoppingList("")
                }}
            >
                <Text style={styles.buttonText}>Clear</Text>
            </Pressable>
        );
    };

    return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
            <View style={styles.container}></View>
            <View style={styles.containercolumn}>
                <TextInput
                    placeholder='Add shopping list item'
                    style={styles.textinput}
                    onChangeText={ShoppingListItem => setShoppingListItem(ShoppingListItem)}
                    value={ShoppingListItem}
                />
                <View style={styles.containerrow}>
                    <AddButton />
                    <ClearButton />
                </View>
            <Text style={styles.text}>Shopping list</Text>
            <FlatList
                    data={ShoppingList}
                    renderItem={({item}) => <Text>{item.value}</Text>}
                    keyExtractor={(_, index) => index.toString()}
            />
            </View>
        </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textinput: {
        backgroundColor: '#e8e4e4c5',
        borderColor: '#000',
        borderWidth: 1,
        width: 300,
        height: 50,
        margin: 10,
        padding: 10,
        borderRadius: 5,
    },
    buttons: {
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
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containercolumn: {
        flex: 2,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#000',
        fontSize: 24
    }
});

export default ShoppingList;