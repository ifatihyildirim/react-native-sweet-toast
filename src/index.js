/**
 * React Native Sweet Toast
 * https://github.com/ifatihyildirim/react-native-sweet-toast
 *
 */

import React, { Component } from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';

import Styles from './styles';

class SweetToast extends Component {
  constructor(props) {
    super(props);

    this.state = {
      containerHeight: 60,
    };
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  callToast() {
    Animated.timing(
      this.animatedValue, {
        toValue: 100,
        duration: 350,
      },
    ).start(this.flash());
  }

  closeToast() {
    Animated.timing(
      this.animatedValue, {
        toValue: -100,
        duration: 350,
      },
    ).start();
  }

  flash() {
    const {
      flash,
      flashTime,
    } = this.props;

    setTimeout(() => {
      if (flash) {
        return this.closeToast();
      }
      return null;
    }, flashTime);
  }

  initialRange(position, positionValue) {
    const {
      containerHeight,
    } = this.state;
    const value = positionValue + containerHeight;

    if (position === 'top') {
      return -Math.abs(value);
    }
    return Math.abs(value);
  }

  render() {
    const {
      position,
      positionValue,
      style,
      children,
    } = this.props;
    const outputRange = [this.initialRange(position, positionValue), 0];
    const animation = this.animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange,
    });

    return (
      <Animated.View
        onLayout={
        (event) => {
          const {
            height,
          } = event.nativeEvent.layout;
          this.setState({
            containerHeight: height,
          });
        }
      }
        style={
        [{
          transform: [{
            translateY: animation,
          }],
        },
        {
          [position]: positionValue,
        },
        Styles.container,
        style,
        ]
      }
      >
        {children}
      </Animated.View>
    );
  }
}

SweetToast.propTypes = {
  flash: PropTypes.bool,
  flashTime: PropTypes.number,
  position: PropTypes.string,
  positionValue: PropTypes.number,
  style: PropTypes.shape(),
  children: PropTypes.element.isRequired,
  onRef: PropTypes.func.isRequired,
};

SweetToast.defaultProps = {
  flash: false,
  flashTime: 1000,
  position: 'bottom',
  positionValue: 20,
  style: {},
};
export default SweetToast;
