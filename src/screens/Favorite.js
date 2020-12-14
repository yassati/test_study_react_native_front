import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";
import { Card } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as RootNavigation from "../RootNavigation";

export default class Favorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: []
    };
  }

  getFavorites = async () => {
    const res = await AsyncStorage.getItem("favorites");
    if (res) {
      const favorites = JSON.parse(res);
      this.setState({
        pokemon: favorites
      });
    }
    return [];
  };

  render() {
    this.getFavorites();

    return (
      <ScrollView keyboardShouldPersistTaps="handled">
        <SafeAreaView>
          <View>
            {this.state.pokemon.map((pokemon, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    RootNavigation.navigate("DetailsModal", {
                      pokemon: pokemon
                    });
                  }}
                >
                  <Card key={index} style={styles.card}>
                    <View style={styles.flex}>
                      <Image
                        style={[{ width: 200, height: 200 }, styles.avatar]}
                        resizeMode="contain"
                        source={{
                          uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${pokemon}.png`
                        }}
                      />
                      <View
                        style={{
                          flex: 1,
                          alignItems: "center"
                        }}
                      >
                        <View style={{ marginLeft: 20 }}>
                          <Text style={styles.title}>{pokemon}</Text>
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
