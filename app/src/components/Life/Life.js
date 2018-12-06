import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import _ from 'lodash';

const Life = props => {
  return (
    <View style={styles.bar}>
      <Text style={styles.text}>Life: </Text>
      {_.times(props.life, (index) => {
        return <Icon key={index} iconStyle={styles.icon} name='heartbeat' type='font-awesome' color='red' />
      })}

    </View>
  );
};

const mapStateToProps = ({ game, settings }) => ({
  life: game.playerLife.life,
  debug: settings.debug
});

export default connect(mapStateToProps)(Life);

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    flexDirection: 'row',
    top: 35,
    left: 10,
    zIndex: 10
  },
  text: {
    fontSize: 20,
    color: 'black',
    zIndex: 30
  },
  icon: {
    margin: 2
  }
});