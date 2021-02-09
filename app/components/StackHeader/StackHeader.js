import React from 'react'
import { Appbar } from 'react-native-paper'
import { useNavigation } from '@react-navigation/core'
import { TextInput } from 'react-native'
import PropTypes from 'prop-types'

import { useTheme } from 'eLearn/app/contexts/ThemeProvider'

import styles from './styles'

const StackHeader = ({ headerTitle, headerTextInput, textInputProps }) => {
  const { goBack } = useNavigation()
  const { theme } = useTheme()

  return (
    <Appbar.Header style={[{ backgroundColor: theme.colors.background }]}>
      <Appbar.Action
        icon="arrow-left"
        onPress={goBack}
        color={theme.colors.primary}
      />

      {!headerTextInput ? (
        <Appbar.Content
          title={headerTitle}
          style={styles.title}
          color={theme.colors.primary}
        />
      ) : (
        <TextInput
          placeholder="Search"
          placeholderTextColor={theme.colors.primary}
          autoFocus
          style={[
            styles.textInput,
            { color: theme.colors.primary },
            textInputProps.style,
          ]}
          {...textInputProps}
        />
      )}
    </Appbar.Header>
  )
}

StackHeader.propTypes = {
  headerTitle: PropTypes.string,
  headerTextInput: PropTypes.bool,
  textInputProps: PropTypes.instanceOf(Object),
}

StackHeader.defaultProps = {
  headerTitle: 'Title',
  headerTextInput: false,
  textInputProps: {},
}

export default StackHeader
