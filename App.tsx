import React, { useState, useEffect } from "react";
import MapView, {
  Region,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from "react-native-maps";
import { StyleSheet, Platform, View, ActivityIndicator } from "react-native";
import * as Location from "expo-location";

export default function App() {
  const googleMapFix =
    Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT;
  const [initialRegion, setInitialRegion] = useState<Region>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setInitialRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.888,
        longitudeDelta: 0.888,
      });
    };
    getPermissions();
    setIsLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <MapView
          style={styles.map}
          provider={googleMapFix}
          initialRegion={initialRegion}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    width: "90%",
    height: "60%",
   
    borderStyle: "solid",
    borderColor: "red",
    borderWidth: 6,
    borderRadius: 20,
  },
});
