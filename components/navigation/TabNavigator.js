import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Account from "../screens/Account";
import ScreenA from "../screens/ScreenA";
import ScreenB from "../screens/ScreenB";

const Tab = createBottomTabNavigator();

export function TabNavigator(props) {
  return (
    <Tab.Navigator>
      <Tab.Screen name={"TodoList"} component={ScreenA} />
      <Tab.Screen name={"AddTodo"} component={ScreenB} />
      <Tab.Screen name={"Account"} component={Account} />
    </Tab.Navigator>
  );
}
