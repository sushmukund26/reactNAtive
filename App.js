import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Component1 from './src/components/Component1'

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
        <Component1 message="Welcome" />
    );
  }
}

