import React, { useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { Avatar, Text } from 'react-native-paper'
import ImagePicker from 'react-native-image-crop-picker'

import { Button, StackHeader, TextInput } from '../../../../components'
import { useAuth } from '../../../../contexts/AuthProvider'
import { useTheme } from '../../../../contexts/ThemeProvider'
import styles from './styles'

interface Props {}

const EditProfile: React.FC<Props> = () => {
  const [formInput, setFormInput] = useState({
    avatar: {
      mime: '',
      path: '',
    },
  })

  const { user } = useAuth()
  const { theme } = useTheme()
  const openPicker = () => {
    ImagePicker.openPicker({
      includeBase64: true,
      mediaType: 'photo',
      compressImageQuality: 0.5,
    }).then((image) => {
      setFormInput((prevState) => ({ ...prevState, avatar: image }))
    })
  }

  const formList: { key: string; value; placeholder?: string }[] = [
    {
      key: 'name',
      value: user.fullName,
    },
    {
      key: 'username',
      value: user.username,
    },
    {
      key: 'address',
      value: user.address,
    },
    {
      key: 'country',
      value: user.country,
    },
  ]

  return (
    <ScrollView style={styles.root}>
      <StackHeader
        headerTitle="Edit Profile"
        rightAction={() => (
          <TouchableOpacity onPress={() => {}} style={{ marginRight: 10 }}>
            <Text style={{ color: theme.colors.primary }}>SAVE</Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.profileContainer}>
        {user.avatar ? (
          <Avatar.Image
            size={100}
            source={{ uri: formInput.avatar.path || user.avatar }}
          />
        ) : (
          <Avatar.Icon
            size={100}
            icon="bookshelf"
            style={{
              backgroundColor: '#2f426f',
            }}
          />
        )}

        <Button
          onPress={openPicker}
          style={{
            marginTop: -30,
            marginRight: -60,
          }}>
          <Avatar.Icon
            size={30}
            icon="camera"
            color={theme.colors.primary}
            style={{
              backgroundColor: theme.colors.border,
            }}
          />
        </Button>
        <Text style={styles.profileText}>{user.email}</Text>

        {formList.map(({ key, placeholder, value }) => (
          <View style={{ width: '100%' }}>
            <Text style={styles.placeholder}>{key}</Text>
            <TextInput
              key={key}
              placeholder={placeholder}
              containerStyle={{
                backgroundColor: 'transparent',
                borderBottomWidth: 1,
              }}
              value={formInput[key] || value}
              onChangeText={(text) =>
                setFormInput((prevState) => ({
                  ...prevState,
                  [key]: text,
                }))
              }
            />
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

export default EditProfile
