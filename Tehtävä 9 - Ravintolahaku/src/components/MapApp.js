import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export default function MapApp() {

    
    const [search, setSearch] = useState("");
    const [mapRegion, setMapRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [marker, setMarker] = useState(null);
    const [nearbyRestaurants, setNearbyRestaurants] = useState([])

    const apikey = "68b45963132b0830967478ifc1a8a6e";
    const gmapsapikey = "AIzaSyBzt3_8nqXpGWHS-JdoWPII6T3fMzOflSM"

    function handleRestaurantFetch(mapRegion) {
        fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=restaurant&location=${mapRegion.latitude},${mapRegion.longitude}&radius=3000&key=${gmapsapikey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error in fetch:" + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                if (data && data.results) {
                    const restaurants = data.results.map(result => ({
                        coordinate: {
                            latitude: result.geometry.location.lat,
                            longitude: result.geometry.location.lng,
                        },
                        title: result.name,
                        description: result.vicinity,
                    }));
                    setNearbyRestaurants(restaurants);
                } else {
                    setNearbyRestaurants([]);
                }
            })
            .catch(error => {
                console.error("Failed to fetch restaurants:", error);
                setNearbyRestaurants([]);
            });
    }

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
                const lat = parseFloat(data[0].lat);
                const lon = parseFloat(data[0].lon);
                setMapRegion({
                    latitude: lat,
                    longitude: lon,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
                
                const newMarker = {
                    coordinate: {
                        latitude: lat,
                        longitude: lon,
                    },
                    title: "Location found",
                    description: data[0].display_name || search
                };
                setMarker(newMarker);
                
                // Fetch restaurants after setting marker
                handleRestaurantFetch({
                    latitude: lat,
                    longitude: lon,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
            } else {
                console.log("No address found");
            }
        })
        .catch(error => {
            console.error("Address fetch error:", error);
        });
    }
    return(
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={mapRegion}
            >
                {nearbyRestaurants.map((restaurant, index) => (
                    <Marker
                        key={`restaurant-${index}-${restaurant.coordinate.latitude}-${restaurant.coordinate.longitude}`}
                        coordinate={restaurant.coordinate}
                        title={restaurant.title}
                        description={restaurant.description}
                        pinColor="blue"
                        zIndex={1}
                    />
                    
                ))}
                {marker && (
                    <Marker
                        key="address-marker"
                        coordinate={marker.coordinate}
                        title={marker.title}
                        description={marker.description}
                        pinColor="red"
                        zIndex={1000}
                        opacity={1}
                        anchor={{x: 0.5, y: 1}}
                        centerOffset={{x: 0, y: -30}}
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