import React, { Component, Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,

  Animated

} from 'react-native';

//ponto de partida da animação eixo Y
const ballY = new Animated.Value(0);

//ponto de partida da animação eixo X
const ballX = Animated.divide(ballY, 2); // o divide divide o valor do 1 parametro pelo segundo

export default class App extends Component {
  state = {

    ballY: ballY,
    ballX: ballX
  }

  componentDidMount() {
    // animação ao renderizar (didMount) ## timing controlar o tempo da animação animação linear

    // Animated.timing(this.state.ballY, {
    //   // ponto pra onde vai a animação
    //   toValue: 300,
    //   // duração da animação não é necessário no spring
    //   duration: 1000,

    // spring causa o efeito de elastico
    // Animated.spring(this.state.ballY, {
    //   // ponto pra onde vai a animação
    //   toValue: 300,
    //   // tamanho  do elastico
    //   bounciness: 30,

    // decay a animação segue a inercia não tem toValue 
    Animated.decay(this.state.ballY, {
      // velocidade de partida da animação
      velocity: 1, //trabalhar com valores pequenos

    }).start()
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
