import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-native-modal'

import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import { Icon, Divider, colors } from 'react-native-elements'

import styles from './styles'
import { useTheme } from './../../contexts/ThemeProvider'

const ActionsModalAction = ({ onPress, description, icon, label }) => {
  const { theme } = useTheme()
  const Wrapper: any = onPress ? TouchableOpacity : View

  return (
    <Wrapper
      style={styles.actionContainer}
      onPress={onPress ? onPress : Function.prototype}>
      <Icon
        {...icon}
        containerStyle={styles.actionIcon}
        color={theme.colors.primary}
      />
      <View style={styles.actionContent}>
        <Text style={styles.actionText}>{label}</Text>
        {description && (
          <Text style={styles.actionDescription}>{description}</Text>
        )}
      </View>
    </Wrapper>
  )
}

const ActionsModal = ({
  isVisible,
  onClose,
  actions,
  isLoading,
  onModalHide,
}) => {
  const insets = useSafeAreaInsets()

  return (
    <Modal
      propagateSwipe
      swipeDirection="down"
      backdropColor="rgba(0, 0, 0, 0.4)"
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      onModalHide={onModalHide || Function.prototype}
      style={styles.container}>
      <View style={styles.bar} />
      <View
        style={[
          styles.content,
          {
            paddingBottom: insets.bottom + 12,
          },
        ]}>
        <FlatList
          scrollEnabled={false}
          contentContainerStyle={styles.listContent}
          keyExtractor={(_, index) => `action-${index}`}
          data={actions}
          renderItem={({ item }) => (
            <>
              {item.component ? (
                item.component
              ) : (
                <ActionsModalAction
                  onPress={item.onPress}
                  icon={item.icon}
                  label={item.label}
                  description={item.description}
                />
              )}
            </>
          )}
          ItemSeparatorComponent={() => (
            <Divider style={{ backgroundColor: colors.grey5 }} />
          )}
        />
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" animating />
          </View>
        )}
      </View>
    </Modal>
  )
}

ActionsModal.propTypes = {
  isVisible: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  actions: PropTypes.instanceOf(Array).isRequired,
  onModalHide: PropTypes.func,
}

ActionsModal.defaultProps = {
  isLoading: false,
  isVisible: false,
  onModalHide: Function.prototype,
}

export { ActionsModalAction }
export default ActionsModal
