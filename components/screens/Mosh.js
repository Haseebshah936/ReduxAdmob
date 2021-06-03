import React from "react";
import { Text, View, StyleSheet } from "react-native";

function Mosh(props) {
  return (
    <View style={styles.container}>
      <Text>Mosh</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
});

export default Mosh;
