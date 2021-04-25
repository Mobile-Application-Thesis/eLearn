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
import { useAuth } from '../../../../contexts/AuthProvider'
import data from './../../../../constants/data'

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
  tempAnswer?: string[]
}

interface Props extends ExamForm {
  index: number
  tempAnswer?: string[]
  setItem?: (item: Item, index: number) => void
}

const QuestionCard: React.FC<Props> = ({
  type,
  question,
  choices,
  answer,
  index,
  tempAnswer,
  setItem,
}) => {
  const { theme } = useTheme()
  const { user } = useAuth()
  return (
    <View style={styles.root}>
      <View style={[styles.row, { paddingTop: 10 }]}>
        <Text style={[{ marginRight: 10 }]}>{index + 1}.</Text>
        <View style={[styles.row]}>
          {user.role === data.role.student ? (
            <Text style={styles.text}>{question}</Text>
          ) : (
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
          )}
        </View>
      </View>
      {choices.map((item, itemIndex) => {
        if (user.role === data.role.student) {
          return (
            <View key={itemIndex + ''} style={[styles.row, { paddingTop: 10 }]}>
              <TouchableOpacity
                onPress={() => setItem({ tempAnswer: [item] }, index)}
                disabled={item === ''}>
                <Image
                  source={
                    tempAnswer && tempAnswer.includes(item)
                      ? radioButtonChecked
                      : radioButtonUnchecked
                  }
                  style={[styles.radio, { tintColor: theme.colors.primary }]}
                />
              </TouchableOpacity>
              <Text>{item}</Text>
            </View>
          )
        }
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
      <View style={styles.row}>
        {user.role === data.role.teacher && type === 'mc' && (
          <TouchableOpacity
            onPress={() => setItem({ addItemChoices: true }, index)}
            style={[styles.row, { paddingVertical: 10, marginRight: 10 }]}>
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
    </View>
  )
}

export default QuestionCard
