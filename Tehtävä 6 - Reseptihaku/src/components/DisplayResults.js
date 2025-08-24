import { Text, View, FlatList, Image } from 'react-native';

export default function DisplayResults({ recipes }) {
    return(
        <FlatList
            ItemSeparatorComponent={
                <View style={{height: 8, width: 250, backgroundColor: "black"}}></View>
            }
            data={recipes}
            keyExtractor={(item) => item.idMeal}
            renderItem={({item}) =>
            <View>
                <Text style={{fontSize: 18, fontWeight: "bold"}}>
                    {item.strMeal}
                </Text>
                <Image
                    style={{ width:250, height: 100 }}
                    source={{ uri: item.strMealThumb }}
                />
            </View>}
        >
        </FlatList>
    );
}