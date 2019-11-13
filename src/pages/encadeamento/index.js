import React, { Component, Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,

  Animated

} from 'react-native';

export default class App extends Component {
  state = {
    ballY: new Animated.Value(0),
    ballX: new Animated.Value(0),
  }

  componentDidMount() {
    // "sequence" faz com uma animação aconteca apos a outra pois senao irao acontecer todas as animações ao mesmo tempo
    // "parallel" tambem executa as animações em paralelo
    // "stagger" executa uma animação e começa a seguinte apos o delay que passamos como parametro independente de ter ou não terminado a primeira
    // "loop" executa infinitamente ou a quantidade definifa no "iterations"

    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.ballY, {
          toValue: 200,
          duration: 500,
        }),

        Animated.delay(300), // delay entre as animações

        Animated.timing(this.state.ballX, {
          toValue: 300,
          duration: 500,
        }),

        Animated.delay(300),

        Animated.timing(this.state.ballY, {
          toValue: 0,
          duration: 500,
        }),

        Animated.delay(300),

        Animated.timing(this.state.ballX, {
          toValue: 0,
          duration: 500,
        }),

        Animated.delay(300),

      ]), {
      iterations: 2 //diz a quantidade de vezes que o loop executa
    }
    ).start();
  }

  render() {
    return (
      <Fragment>
        <SafeAreaView style={styles.container}>
          {/* passar o "estilo para a animação" colocar dentro de um array */}
          <Animated.View style={[
            styles.ball,
            { top: this.state.ballY, left: this.state.ballX }
          ]} />
        </SafeAreaView>
      </Fragment >
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  ball: {
    backgroundColor: '#7159c1',
    width: 70,
    height: 70,
    borderRadius: 35,

  }
});


