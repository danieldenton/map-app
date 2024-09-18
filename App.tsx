import React from "react";
import MapView, { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from "react-native-maps";
import { StyleSheet, Platform, View } from "react-native";

export default function App() {
  const googleMapFix = Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
  console.log(Platform.OS)
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
