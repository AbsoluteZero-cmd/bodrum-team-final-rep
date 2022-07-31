import React, { useState } from "react";
import {StyleSheet, Switch, Text, View} from "react-native";

export default function AppBar(){
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={styles.appBar}>
      <Text style={styles.heading}>Tasks</Text>
      <Switch
          style={styles.switch}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: "#ffffff",
    color: "black",
    width: "100%",
    height: 50
  },
  heading: {
    color: "black",
    fontSize: 24,
    fontWeight: "400"
  },
  switch: {
    top:-40
  }
});
