# react-native-sweet-toast

## Installation
```
npm install react-native-sweet-toast --save
```

## Example
```Javascript
import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import SweetToast from 'react-native-sweet-toast';

export default class MyComponent extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.sweetToast.callToast()} >
          <Text>Open Alert</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.sweetToast.closeToast()} >
          <Text>Close Alert</Text>
        </TouchableOpacity>
        <SweetToast
          onRef={ref => (this.sweetToast = ref)} 
          position="bottom"
          positionValue={20}
          flash
        /> 
      </View>
    );
  }
}
```
