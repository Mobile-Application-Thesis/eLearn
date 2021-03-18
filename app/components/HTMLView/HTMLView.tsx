import React from 'react'
import { View, useWindowDimensions, ViewStyle } from 'react-native'
import { Text } from 'react-native-paper'
import HTML from 'react-native-render-html'
import WebView from 'react-native-webview'
import { IGNORED_TAGS } from 'react-native-render-html/src/HTMLUtils'

import { useTheme } from './../../contexts/ThemeProvider'
import tagsStyles from './htmlStyles'
import styles from './styles'

interface Props {
  htmlText: string
  containerStyle?: ViewStyle
  preview?: boolean
}

const HTMLView: React.FC<Props> = ({
  htmlText,
  containerStyle,
  preview = false,
}) => {
  const { theme } = useTheme()
  const contentWidth = useWindowDimensions().width

  return (
    <View style={[styles.root, containerStyle]}>
      <HTML
        source={{ html: htmlText }}
        tagsStyles={tagsStyles(theme, preview)}
        contentWidth={contentWidth}
        renderers={{
          video: (htmlAttribs, children, convertedCSSStyles, passProps) => (
            <View
              key={passProps.key}
              style={{
                width: '100%',
                aspectRatio: 16.0 / 9.0,
                marginTop: 16,
                marginBottom: 16,
              }}>
              <WebView
                scrollEnabled={false}
                source={{ uri: htmlAttribs.src }}
                style={{ flex: 1, width: '100%', aspectRatio: 16.0 / 9.0 }}
              />
            </View>
          ),
          pre: (htmlAttribs, children, convertedCSSStyles, passProps) => (
            <View
              style={[
                styles.pre,
                {
                  backgroundColor: theme.colors.code,
                },
              ]}>
              <Text style={styles.text}>
                {passProps.domNode.children[0].data}
              </Text>
            </View>
          ),
          blockquote: (
            htmlAttribs,
            children,
            convertedCSSStyles,
            passProps,
          ) => (
            <View
              style={[
                styles.blockquote,
                {
                  borderColor: theme.colors.blockquote,
                },
              ]}>
              <Text style={styles.text}>
                {passProps.domNode.children[0].data}
              </Text>
            </View>
          ),
        }}
        ignoredTags={IGNORED_TAGS.filter(
          (tag) => tag !== 'video' || tag !== 'pre' || tag !== 'blockquote',
        )}
      />
    </View>
  )
}

export default HTMLView
