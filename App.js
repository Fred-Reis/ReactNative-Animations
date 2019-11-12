
import React, { Component, Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,

  Animated

} from 'react-native';



export default class App extends Component {
  state = {
    //ponto de partida da animação
    ballY: new Animated.Value(0),
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
            { top: this.state.ballY }
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


