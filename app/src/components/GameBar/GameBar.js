import React from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';
import Filler from './Filler';

const GameBar = ({ progress, text }) => (
  <View style={styles.bar}>
    <Filler progress={progress} />
    <Text style={styles.barText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  bar: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    width: '90%',
    margin: 10,
    height: '6%',
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderWidth: 3,
    borderColor: 'rgba(245, 223, 76, .88)',
    borderRadius: 6,
    zIndex: 10
  },
  barText: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    zIndex: 30
  }
});

export default GameBar;
