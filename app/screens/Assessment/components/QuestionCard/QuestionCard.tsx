import React from 'react'
import { View, Image, TouchableOpacity, Alert } from 'react-native'
import { Text } from 'react-native-paper'

const radioButtonChecked = require('../../../../assets/radio-button-checked.png')
const radioButtonUnchecked = require('../../../../assets/radio-button-unchecked.png')

import { ExamForm } from '../../../../constants/data'
import styles from './style'
import { useTheme } from './../../../../contexts/ThemeProvider'
import style from './style'
import { Icon } from 'react-native-elements'
import { TextInput } from '../../../../components'

interface Item extends ExamForm {
  choicesItem?: {
    value: string
    index: number
  }
  addItemChoices?: boolean
  remove?: {
    type: 'item' | 'question'
    itemIndex?: number
  }
}

interface Props extends ExamForm {
  index: number
  setItem?: (item: Item, index: number) => void
}

const QuestionCard: React.FC<Props> = ({
  type,
  question,
  choices,
  answer,
  image,
  index,
  setItem,
}) => {
  const { theme } = useTheme()
  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <Text style={[{ marginRight: 10 }]}>{index + 1}.</Text>
        <View style={[styles.row]}>
          <TextInput
            autoFocus={true}
            placeholder="Add your question here"
            value={question}
            multiline={true}
            onChangeText={(text) => setItem({ question: text }, index)}
            containerStyle={styles.textInput}
            rightIcon={{
              type: 'material-community',
              name: 'close',
              color: theme.colors.primary,
              onPress: () => {
                if (question === '') {
                  return setItem(
                    {
                      remove: {
                        type: 'question',
                      },
                    },
                    index,
                  )
                }

                Alert.alert(
                  'Discard changes?',
                  'You have changes on this question, are you sure you want to discard it?',
                  [
                    {
                      text: 'Discard',
                      onPress: () =>
                        setItem(
                          {
                            remove: {
                              type: 'question',
                            },
                          },
                          index,
                        ),
                    },
                    {
                      text: 'Cancel',
                    },
                  ],
                )
              },
              size: 18,
            }}
          />
        </View>
      </View>
      {choices.map((item, itemIndex) => {
        return (
          <View key={itemIndex + ''} style={[styles.row, { paddingTop: 10 }]}>
            <TouchableOpacity
              onPress={() => setItem({ answer: [item] }, index)}
              disabled={item === ''}>
              <Image
                source={
                  answer.includes(item)
                    ? radioButtonChecked
                    : radioButtonUnchecked
                }
                style={[styles.radio, { tintColor: theme.colors.primary }]}
              />
            </TouchableOpacity>
            {type === 'mc' && (
              <View style={[styles.row, { paddingRight: 8 }]}>
                <TextInput
                  placeholder={'item ' + (itemIndex + 1)}
                  value={item}
                  multiline={true}
                  onChangeText={(text) =>
                    setItem(
                      { choicesItem: { value: text, index: itemIndex } },
                      index,
                    )
                  }
                  containerStyle={styles.textInput}
                  rightIcon={{
                    type: 'material-community',
                    name: 'close',
                    color: theme.colors.primary,
                    onPress: () => {
                      if (item === '') {
                        return setItem(
                          {
                            remove: {
                              type: 'item',
                              itemIndex: itemIndex,
                            },
                          },
                          index,
                        )
                      }

                      Alert.alert(
                        'Discard changes?',
                        'You have changes on this item, are you sure you want to discard it?',
                        [
                          {
                            text: 'Discard',
                            onPress: () =>
                              setItem(
                                {
                                  remove: {
                                    type: 'item',
                                    itemIndex: itemIndex,
                                  },
                                },
                                index,
                              ),
                          },
                          {
                            text: 'Cancel',
                          },
                        ],
                      )
                    },
                    size: 18,
                  }}
                />
              </View>
            )}

            {type === 't/f' && <Text>{item}</Text>}
          </View>
        )
      })}
      {type === 'mc' && (
        <TouchableOpacity
          onPress={() => setItem({ addItemChoices: true }, index)}
          style={[styles.row, { paddingVertical: 10 }]}>
          <Icon
            type="material-community"
            name="plus"
            color={theme.colors.accent}
            size={20}
          />
          <Text style={[style.addItem, { color: theme.colors.accent }]}>
            Add Item
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default QuestionCard
