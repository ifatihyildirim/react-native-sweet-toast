/**
 * React Native Sweet Toast
 * https://github.com/ifatihyildirim/react-native-sweet-toast
 *
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Animated } from 'react-native';

class Alert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            containerHeight: 60,
        }
        this.animatedValue = new Animated.Value(0)
    }

    componentDidMount() {
        this.props.onRef(this)
      }

      componentWillUnmount() {
        this.props.onRef(undefined)
      }

      callToast() {
        Animated.timing(
          this.animatedValue,
          { 
            toValue: 100,
            duration: 350
          }).start(this.flash())
      }
      
      closeToast() {
          Animated.timing(
          this.animatedValue,
          { 
            toValue: -100,
            duration: 350
          }).start()
      }

      flash(){
        setTimeout(() => {
          if (this.props.flash) {
              return this.closeToast();
          }
        }, 2000);
    }

      initialRange = (position, positionValue) => {
          const value =  positionValue + this.state.containerHeight;
          if (position === 'top') {
              return -Math.abs(value);
          }

          return Math.abs(value);
      }
    
  render() {
    const {position, positionValue, style} = this.props;
    const outputRange =  [ this.initialRange(position, positionValue), 0 ]
    
    let animation = this.animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: outputRange
      });

    return (
        <Animated.View 
        onLayout={(event) => {
            const {height} = event.nativeEvent.layout;
            this.setState({containerHeight: height});
        }}
        style={[
            { transform: [{ translateY: animation}] },
            {[position]: positionValue},
            styles.container,
            style,
        ]}>
            {this.props.children}
        </Animated.View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
      position: 'absolute',
      minHeight: 60,
      padding: 10,
      backgroundColor: '#eaeaeb',
      borderRadius: 20,
      left: 10,
      right: 10,
    },
});

export default Alert
