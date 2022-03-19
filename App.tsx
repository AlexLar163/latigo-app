import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Animated,
} from "react-native";
import { Audio } from "expo-av";
import * as Font from "expo-font";

const LATIGO_IMAGE = Image.resolveAssetSource(
  require("./assets/latigo.png")
).uri;

export default function App() {
  useEffect(() => {
    const data = async () => {
      await Font.loadAsync({
        IndieFlower: require("./assets/fonts/IndieFlower-Regular.ttf"),
      });
      setIsLoading(false);
    };
    data();
  });
  const phrases = ["huit", "guiting", "sheteg", "clap"];
  const [textLatigo, setTextLatigo] = useState(phrases[0]);
  const [isLoading, setIsLoading] = useState(true);
  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    setTextLatigo(phrases[randomIndex]);
    soundPlay();
    fadeIn();
  };
  const soundPlay = () => {
    Audio.Sound.createAsync(require("./assets/latigo.mp3")).then((data) => {
      data.sound.playAsync();
    });
  };
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 120,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 120,
        useNativeDriver: false,
      }).start();
    });
  };
  return (
    !isLoading && (
      <View style={styles.container}>
        <TouchableHighlight onPress={handleClick} underlayColor="none">
          <View style={styles.viewCont}>
            <Text style={[styles.title, { fontFamily: "IndieFlower" }]}>
              ¡¡{textLatigo.toUpperCase()}!!
            </Text>
            <Animated.View style={[{ opacity: fadeAnim }]}>
              <Image style={[styles.image]} source={{ uri: LATIGO_IMAGE }} />
            </Animated.View>
          </View>
        </TouchableHighlight>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  viewCont: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    // fontFamily: "IndieFlower",
    fontSize: 60,
  },
  image: {
    backgroundColor: "#E9190F",
    borderRadius: 500,
    width: 250,
    height: 250,
  },
});
