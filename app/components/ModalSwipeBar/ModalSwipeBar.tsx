import React from 'react';

import { View } from 'react-native';

import styles from './styles';

const ModalSwipeBar = ({ containerStyle }) => (
  <View style={[styles.container, containerStyle]}>
    <View style={styles.bar} />
  </View>
);

export default ModalSwipeBar;
