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
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class TestModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
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

  save = async value => {
    try {
      await AsyncStorage.setItem("@pokemon", value);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    console.log(this.state.dataSource);

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
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Image
                style={styles.image}
                source={{
                  uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${details.name}.png`
                }}
              />
              <Text style={styles.text}>Height: {details.height / 10} M</Text>
              <Text style={styles.text}>Weight: {details.weight / 10} KG</Text>
              <Text style={styles.text}>
                Ability: {details.abilities[0].ability.name}
              </Text>
              <Text style={styles.text}>
                Type: {details.types[0].type.name}
              </Text>
              <Text style={styles.text}>
                Number of battle: {details.game_indices.length}
              </Text>
              <Button onPress={() => this.save(details.name)}>
                <Icon name="heart" size={30} color="red" />
              </Button>
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
