
import React, { Component, Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Animated,
  PanResponder
} from 'react-native';

export default class App extends Component {
  state = {
    // para receber os dois parametros XY podemos passar só bll e o ValueXY que é uma api que recebe os dois parametros e resolve eles
    ball: new Animated.ValueXY({ x: 0, y: 0 }),
  }

  UNSAFE_componentWillMount() {
    // é o componente que lida com a parte de gestos
    this._panResponder = PanResponder.create({
      // esse metode ouve a movimentação gestual rece um evento e um estado como parametro
      onMoveShouldSetPanResponder: (e, gestureState) => true,

      // essa função serve para pegarmos o valor final do objeto e reiniciar por la, senao sempre vai retornar ao seu estado inicial
      onPanResponderGrant: (e, gestureState) => {
        this.state.ball.setOffset({
          x: this.state.ball.x._value,
          y: this.state.ball.y._value,
        });

        this.state.ball.setValue({ x: 0, y: 0 });
      },

      // pra alterar a posição da bola em relaçãoaos gestos usamos esse metodo
      onPanResponderMove: Animated.event([null, {
        // recebe os parametros X e Y
        dx: this.state.ball.x,
        dy: this.state.ball.y,

        //####IMPORTANTE essa função permite pegar a posição do objeto 
      }], {
        listener: (e, gestureState) => {
          // fica armazenada no gestureState
          console.log(gestureState);
        }
      }),

      // essa função serve para zerar o offset e corrigir bug de confusão devido a varios offset em pilha
      onPanResponderRelease: () => {
        this.state.ball.flattenOffset();
      }
    });
  }


  render() {
    return (
      <Fragment>
        <SafeAreaView style={styles.container}>
          {/* passar o "estilo para a animação" colocar dentro de um array */}
          <Animated.View
            {... this._panResponder.panHandlers}
            style={[
              styles.ball,
              {
                //aqui não usammos top ou left passamos o transform que possui varios parametros
                transform: [
                  { translateX: this.state.ball.x },
                  { translateY: this.state.ball.y },
                ]
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


