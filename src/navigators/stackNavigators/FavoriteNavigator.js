import React from "react";
import FavoriteScreen from "../../screens/Favorite";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default class Favorite extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Favorite" component={FavoriteScreen} />
      </Stack.Navigator>
    );
  }
}
