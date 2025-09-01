import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';

export default function MapApp() {

    
    const [search, setSearch] = useState("");
    const [mapRegion, setMapRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [marker, setMarker] = useState(null);

    const apikey = "68b45963132b0830967478ifc1a8a6e";

    function handleAddressFetch() {
        if (!search) return;
        fetch(`https://geocode.maps.co/search?q=${search}&api_key=${apikey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in fetch:" + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data && data.length > 0) {
                setMapRegion({
                    latitude: parseFloat(data[0].lat),
                    longitude: parseFloat(data[0].lon),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                })
                
                setMarker({
                    coordinate: {
                        latitude: parseFloat(data[0].lat),
                        longitude: parseFloat(data[0].lon),
                    },
                    title: "Location found",
                    description: data[0].display_name || search
                });
            } else {
                console.log("No address found");
            }
        })
    }

    return(
        <View style={styles.container}>
            <MapView
                key={`${mapRegion.latitude}-${mapRegion.longitude}`}
                style={styles.map}
                region={mapRegion}
            >
                {marker && (
                    <Marker
                        coordinate={marker.coordinate}
                        title={marker.title}
                        description={marker.description}
                    />
                )}
            </MapView>
            <View style={styles.containercolumn}>
                <TouchableOpacity style={styles.buttons} onPress={handleAddressFetch}>
                    <Text style={styles.buttonText}>Find</Text>
                </TouchableOpacity>
                <TextInput 
                style={styles.textinput}
                placeholder='Type address'
                value={search}
                onChangeText={text => setSearch(text)}
                >
                </TextInput>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffffff',
        width: '100%'
    },
    map: {
        width: '100%',
        height: '75%',
        backgroundColor: "red"
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
        backgroundColor: '#1e00ffff',
        borderWidth: 1,
        width: 150,
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