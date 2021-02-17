import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modal'
import PropTypes from 'prop-types'

import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  Dimensions,
} from 'react-native'
import { Text } from 'react-native-paper'
import { Icon, Button } from 'react-native-elements'

import ModalSwipeBar from '../ModalSwipeBar'
import styles from './styles'
import { useTheme } from './../../contexts/ThemeProvider'

const ActionsSheetAction = ({
  onPress,
  description,
  icon,
  label,
  containerStyle,
  labelStyle,
  showLoading,
}) => {
  const { theme } = useTheme()
  const Wrapper: any = onPress ? TouchableOpacity : View

  return (
    <Wrapper
      style={[styles.actionContainer, containerStyle]}
      onPress={onPress && !showLoading ? onPress : Function.prototype}>
      {!showLoading ? (
        <Icon
          {...icon}
          containerStyle={styles.actionIcon}
          color={theme.colors.primary}
        />
      ) : (
        <ActivityIndicator animating style={styles.actionActivity} />
      )}
      <View style={styles.actionContent}>
        <Text style={[styles.actionText, labelStyle]}>{label}</Text>
        {description && (
          <Text style={styles.actionDescription}>{description}</Text>
        )}
      </View>
    </Wrapper>
  )
}

const ActionsSheet = ({
  isVisible,
  onClose,
  title,
  renderItem,
  renderBottomAction,
  rightAction,
  data,
  onModalHide,
  contentStyle,
  keyExtractor,
  swipeDirection,
  Separator,
  ListEmptyComponent,
  ...props
}) => {
  const insets = useSafeAreaInsets()
  const { theme } = useTheme()
  const [maxContentHeight, setMaxContentHeight] = useState(
    Dimensions.get('window').height * 0.75,
  )

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', (event) => {
      setMaxContentHeight(
        Dimensions.get('window').height -
          insets.top -
          24 -
          event.endCoordinates.height,
      )
    })

    Keyboard.addListener('keyboardWillHide', () => {
      setMaxContentHeight(Dimensions.get('window').height - insets.top - 24)
    })
  }, [insets.top])

  return (
    <Modal
      avoidKeyboard
      propagateSwipe
      swipeDirection={swipeDirection}
      backdropOpacity={0.4}
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      onModalHide={onModalHide || Function.prototype}
      style={styles.modal}>
      <ModalSwipeBar containerStyle={styles.swipeBar} />
      <View
        style={[
          styles.content,
          { backgroundColor: theme.colors.background },
          contentStyle,
          { maxHeight: maxContentHeight },
        ]}>
        <View
          style={[
            styles.headerContainer,
            { backgroundColor: theme.colors.background },
          ]}>
          <View style={styles.chevronContainer}>
            <TouchableOpacity onPress={onClose}>
              <Icon
                size={24}
                color={theme.colors.primary}
                name="chevron-down"
                type="material-community"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.header}>
            <Text>{title}</Text>
          </Text>
          <View style={styles.rightActionContainer}>
            {rightAction && (
              <Button
                type="clear"
                {...rightAction}
                titleStyle={[styles.rightActionTitle, rightAction.titleStyle]}
              />
            )}
          </View>
        </View>
        <KeyboardAwareFlatList
          enableAutomaticScroll={false}
          contentContainerStyle={[
            {
              paddingBottom: !renderBottomAction ? insets.bottom + 16 : 16,
            },
          ]}
          keyExtractor={keyExtractor}
          data={data}
          renderItem={renderItem}
          ItemSeparatorComponent={Separator}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="always"
          ListEmptyComponent={ListEmptyComponent}
          {...props}
        />
        {renderBottomAction && <View>{renderBottomAction()}</View>}
      </View>
    </Modal>
  )
}

ActionsSheet.propTypes = {
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  renderItem: PropTypes.func.isRequired,
  renderBottomAction: PropTypes.func,
  rightAction: PropTypes.instanceOf(Object),
  rightActionRef: PropTypes.instanceOf(Object),
  data: PropTypes.instanceOf(Array),
  onModalHide: PropTypes.func,
  contentStyle: PropTypes.instanceOf(Object),
  contentBackground: PropTypes.string,
  keyExtractor: PropTypes.func,
  swipeDirection: PropTypes.string,
  Separator: PropTypes.element,
  ListEmptyComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
}

ActionsSheet.defaultProps = {
  isVisible: false,
  onClose: () => {},
  title: 'Choose Action',
  renderBottomAction: null,
  rightAction: null,
  data: [],
  onModalHide: null,
  contentStyle: {},
  contentBackground: '',
  keyExtractor: (item, index) => `data-${item}-${index}`,
  swipeDirection: 'down',
  Separator: null,
  ListEmptyComponent: null,
}

export { ActionsSheetAction }
export default ActionsSheet
