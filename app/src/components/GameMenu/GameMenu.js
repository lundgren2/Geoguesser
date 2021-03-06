import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Overlay, Button } from 'react-native-elements';
import { toggleDebug } from '../../actions/settings';
import { stopGame, toggleGameMenu, toggleMainMenu } from '../../actions/layers';
import styles from './styles';

export class GameMenu extends Component {
  menuButton = ({ title, onPress }) => (
    <Button
      key={title}
      title={title}
      buttonStyle={styles.button}
      onPress={() => onPress()}
      containerStyle={styles.buttonContainer}
      titleStyle={styles.buttonText}
    />
  );

  render() {
    const {
      toggleGameMenu,
      toggleMainMenu,
      stopGame,
      toggleDebug,
      showGameMenu,
    } = this.props;

    const buttons = [
      {
        title: 'Resume Game',
        onPress: toggleGameMenu,
      },
      {
        title: 'Main Menu',
        onPress: () => {
          stopGame();
          toggleGameMenu();
          toggleMainMenu();
        },
      },
      {
        title: 'Options',
        onPress: toggleDebug,
      },
    ];

    return (
      <Overlay
        overlayStyle={styles.overlay}
        isVisible={showGameMenu}
        onBackdropPress={() => undefined}
        width="90%"
        height="auto"
      >
        {buttons.map(button => this.menuButton(button))}
      </Overlay>
    );
  }
}

const mapStateToProps = ({ layers }) => ({
  showGameMenu: layers.gameMenu,
});

const mapDispatchToProps = {
  toggleDebug,
  stopGame,
  toggleGameMenu,
  toggleMainMenu,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameMenu);
