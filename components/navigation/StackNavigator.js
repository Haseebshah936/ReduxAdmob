import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Loading from "../screens/Loading";
import { TabNavigator } from "./TabNavigator";

const Stack = createStackNavigator();

export default function StackNavigator(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name={"Loading"} component={Loading} />
      <Stack.Screen name={"Main"} component={TabNavigator} />
    </Stack.Navigator>
  );
}
