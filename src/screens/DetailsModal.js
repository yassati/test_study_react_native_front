import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Image,
  ActivityIndicator
} from "react-native";
import * as RootNavigation from "../RootNavigation";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Button, ProgressBar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class TestModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isFavorite: false,
      dataSource: []
    };
  }
  componentDidMount() {
    const pokemon =
      this.props &&
      this.props.route &&
      this.props.route.params &&
      this.props.route.params.pokemon;

    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson
          },
          () => {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
  getFavorites = async () => {
    const res = await AsyncStorage.getItem("favorites");
    if (res) {
      const favorites = JSON.parse(res);
      return favorites;
    }

    return [];
  };
  createFavorite = async favorite => {
    const favorites = await this.getFavorites();
    favorites.push(favorite);
    await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
    this.setState({ isFavorite: true });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    const details = this.state.dataSource;
    return (
      <ScrollView keyboardShouldPersistTaps="handled">
        <SafeAreaView>
          <View>
            <View style={styles.header}>
              <Button
                onPress={() => {
                  RootNavigation.pop();
                }}
              >
                <Icon name="times" size={30} color="white" />
              </Button>

              <Text
                style={{
                  textTransform: "uppercase",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 30
                }}
              >
                {details.name}
              </Text>
              {this.state.isFavorite ? (
                <Button style={{ marginLeft: 100 }}>
                  <Icon name="check-circle" size={30} color="white" />
                </Button>
              ) : (
                <Button
                  style={{ marginLeft: 100 }}
                  onPress={() => this.createFavorite(details.name)}
                >
                  <Icon name="heart" size={30} color="white" />
                </Button>
              )}
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Image
                style={styles.image}
                source={{
                  uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${details.name}.png`
                }}
              />
              <View
                style={{
                  flexDirection: "row"
                }}
              >
                <Text style={styles.text}>Height: {details.height / 10} M</Text>
                <Text style={[styles.text, { marginLeft: 20 }]}>
                  Weight: {details.weight / 10} KG
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.text}>
                  Ability: {details.abilities[0].ability.name}
                </Text>
                <Text style={[styles.text, { marginLeft: 20 }]}>
                  Type: {details.types[0].type.name}
                </Text>
              </View>

              <Text
                style={{
                  fontSize: 22
                }}
              >
                Stats:
              </Text>
              <View>
                {details.stats.map((item, index) => {
                  return (
                    <View key={index}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between"
                        }}
                      >
                        <Text style={{ marginTop: 15, fontSize: 22 }}>
                          {item.stat.name}
                        </Text>
                        <Text
                          style={{
                            marginTop: 15,
                            fontSize: 22
                          }}
                        >
                          {item.base_stat}%
                        </Text>
                      </View>
                      <ProgressBar
                        styleAttr="Horizontal"
                        indeterminate={false}
                        progress={parseInt(item.base_stat) / 100}
                      />
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#58D757",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "rgba(0,0,0, .4)",
    shadowOffset: { height: 3, width: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 4
  },
  image: {
    width: 200,
    height: 200
  },
  text: {
    fontSize: 22,
    marginBottom: 15
  },
  indicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
