import React, { Component, Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,

  Animated

} from 'react-native';

export default class App extends Component {
  state = {
    ballY: new Animated.Value(0),
  }

  componentDidMount() {

    Animated.timing(this.state.ballY, {
      toValue: 500,
      duration: 1000,
    }).start();
  }

  render() {
    return (
      <Fragment>
        <SafeAreaView style={styles.container}>
          {/* passar o "estilo para a animação" colocar dentro de um array */}
          <Animated.View style={[
            styles.ball,
            {
              top: this.state.ballY,
              // interpolate relaciona o primeiro parametro ao segundo pode por quantas faixas quiser
              opacity: this.state.ballY.interpolate({
                // pega o trajeto da animação de onde pra onde
                inputRange: [0, 300],
                // e aqui o nivel de opacidade em relação aos parametros acima
                outputRange: [1, 0.3],
                // extrapolate essa propriedade faz com que os parametros acima sejam 100% respeitados
                // pq caso o range de entrada ainda continue, sem esse parametro ele ci=ontinuaria acontecendo
                extrapolate: 'clamp'
              })
            }
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


