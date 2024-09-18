import React, { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from "react-native-maps";
import { StyleSheet, Platform, View } from "react-native";
import * as Location from "expo-location";

export default function App() {
  const googleMapFix =
    Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT;
  const [location, setLocation] = useState({});

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions")
        return
      }
      let currentLocation = await Location.getCurrentPositionAsync({})
      setLocation(currentLocation)
    };
    getPermissions()

  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} provider={googleMapFix} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
