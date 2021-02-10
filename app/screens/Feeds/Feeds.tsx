import React from 'react'
import { View } from 'react-native'
import { Header, FloatingButton } from '../../components'
import styles from './styles'

interface Props {}

const Feeds: React.FC<Props> = () => {
  const floatingButtonProps = {
    onPress: () => {},
    name: 'New Post',
  }
  return (
    <View style={styles.root}>
      <FloatingButton {...floatingButtonProps} />
      <Header />
    </View>
  )
}

export default Feeds
