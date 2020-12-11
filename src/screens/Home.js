import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Image,
  TouchableOpacity
} from "react-native";
import { Card } from "react-native-paper";
import * as RootNavigation from "../RootNavigation";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: []
    };
  }
  componentDidMount() {
    return fetch("https://pokeapi.co/api/v2/pokemon?limit=50")
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson.results
          },
          () => {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <ScrollView keyboardShouldPersistTaps="handled">
        <SafeAreaView>
          <View>
            {this.state.dataSource
              .filter(pokemon => pokemon.name.toLowerCase())
              .map((pokemon, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      RootNavigation.navigate("DetailsModal", {
                        pokemon: pokemon.name
                      });
                    }}
                  >
                    <Card key={index} style={styles.card}>
                      <View style={styles.flex}>
                        <Image
                          style={[{ width: 200, height: 200 }, styles.avatar]}
                          resizeMode="contain"
                          source={{
                            uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${pokemon.name}.png`
                          }}
                        />
                        <View style={{ flex: 1 }}>
                          <View style={{ marginLeft: 20 }}>
                            <Text style={styles.title}>{pokemon.name}</Text>
                          </View>
                        </View>
                      </View>
                    </Card>
                  </TouchableOpacity>
                );
              })}
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    margin: 20,
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 10,
    paddingRight: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.3)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    backgroundColor: "white"
  },
  flex: {
    flexDirection: "row",
    alignItems: "center"
  },
  avatar: { width: 80, height: 120, borderRadius: 10 },
  title: {
    textTransform: "uppercase",
    color: "black",
    fontWeight: "bold",
    fontSize: 20
  }
});
