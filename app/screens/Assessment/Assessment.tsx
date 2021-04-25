import React, { useState, useEffect } from 'react'
import { View, FlatList, TouchableOpacity, Alert } from 'react-native'
import { Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/core'
import storage from '@react-native-firebase/storage'
import ImagePicker from 'react-native-image-crop-picker'
import SimpleToast from 'react-native-simple-toast'

import { EmptyList, StackHeader } from '../../components'
import styles from './styles'
import { useTheme } from './../../contexts/ThemeProvider'
import { useAuth } from '../../contexts/AuthProvider'
import { ExamForm } from '../../constants/data'
import { QuestionCard } from './components'
import MenuActions from '../../components/MenuActions'
import { FirebaseService } from '../../services/firebase.services'
import { AssessmentProps } from '../../routes/types'
import data from './../../constants/data'

const AddButton: React.FC<{ addQuestion: () => void; title?: string }> = ({
  addQuestion,
  title,
}) => {
  const { theme } = useTheme()

  return (
    <TouchableOpacity onPress={addQuestion}>
      <Text
        style={{
          marginTop: 10,
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: 5,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

AddButton.defaultProps = {
  title: 'Add Question',
}

interface TempExamForm extends ExamForm {
  tempAnswer?: string[]
}

const Assessment: React.FC<AssessmentProps> = ({
  route: {
    params: { classId, lessonId, assessmentId },
  },
}) => {
  const { goBack } = useNavigation()
  const { user } = useAuth()
  const { theme } = useTheme()

  const checked = 'check-box-outline'
  const unchecked = 'checkbox-blank-outline'

  const [examForm, setExamForm] = useState<TempExamForm[]>([])

  const [questionType, setQuestionType] = useState('t/f')

  const [actions, setActions] = useState([
    {
      onPress: () => setQuestionType('t/f'),
      title: 'True or False',
      icon: checked,
    },
    {
      onPress: () => setQuestionType('mc'),
      title: 'Multiple Choice',
      icon: unchecked,
    },
  ])

  useEffect(() => {
    if (assessmentId) {
      FirebaseService.db
        .collection('class')
        .doc(classId)
        .collection('assessment')
        .doc(assessmentId)
        .get()
        .then((doc) => {
          setExamForm(doc.data().data)
        })
    }
  }, [assessmentId])

  const addQuestion = () => {
    let choices = []
    if (questionType === 'mc') {
      choices = ['']
    } else if (questionType === 't/f') {
      choices = ['True', 'False']
    }

    setExamForm((prevState) => [
      ...prevState,
      {
        question: '',
        type: questionType,
        choices: choices,
        answer: [],
        image: [],
      },
    ])
  }

  useEffect(() => {
    if (questionType === 't/f') {
      setActions((prevState) => {
        prevState[0].icon = checked
        prevState[1].icon = unchecked
        return prevState
      })
    } else if (questionType === 'mc') {
      setActions((prevState) => {
        prevState[0].icon = unchecked
        prevState[1].icon = checked
        return prevState
      })
    }
  }, [questionType])

  const headerProps =
    user.role === data.role.teacher
      ? {
          headerTitle: 'Create Exam',
          rightAction: [
            {
              onPress: () =>
                Alert.alert(
                  'Usage',
                  // eslint-disable-next-line quotes
                  `\n1. You can add new question tapping the 'plus' icon on the header.\n\n2. You can change the question type of the question you will be adding by tapping the 'question' icon then choose your desired question type. Question type is set to true or false by default.\n\n3. By tapping the radio button beside an item in a question, it will be set as the answer to that question.\n\n4. For multiple choices type of question, you cannot set an item as an answer if it doesn't have any value.`,
                  [{ text: 'Ok' }],
                ),
              icon: 'information-variant',
              type: 'material-community',
            },
            () => (
              <MenuActions
                actions={actions}
                isHeaderAction={true}
                icon="lock-question"
              />
            ),
            {
              onPress: addQuestion,
              icon: 'plus',
              type: 'material-community',
            },
          ],
          backHandler: () => {
            if (examForm.length !== 0) {
              return Alert.alert('Discard changes?', 'Are you sure?', [
                {
                  text: 'Discard',
                  style: 'destructive',
                  onPress: () => goBack(),
                },
                {
                  text: 'Cancel',
                },
              ])
            }

            goBack()
          },
        }
      : {
          headerTitle: 'Assessment',
          rightAction: () => {
            return (
              <TouchableOpacity style={{ marginRight: 10 }}>
                <Text>SUBMIT</Text>
              </TouchableOpacity>
            )
          },
        }

  const addImage = () => {
    ImagePicker.openPicker({
      multiple: true,
      includeBase64: true,
      mediaType: 'photo',
      compressImageQuality: 0.5,
    }).then((data) => {
      data.map(({ mime, path }) => {
        SimpleToast.show('Upload is in progress...')
        const upload = storage()
          .ref(
            `users/${user.id}/uploads/lesson/image/${Date.now()}-${
              path.split('/')[path.split('/').length - 1]
            }`,
          )
          .putFile(path, {
            contentType: mime,
          })

        upload.on(
          'state_changed',
          (snapshot) => {
            switch (snapshot.state) {
              case storage.TaskState.SUCCESS:
                break
            }
          },
          () => {
            SimpleToast.show('An error occured. please try again later.')
          },
          () => {
            upload.snapshot.ref.getDownloadURL().then((downloadURL) => {
              // editorRef.current?.insertVideo(downloadURL)
            })
          },
        )
      })
    })
  }

  const setItem = (item, index) => {
    setExamForm((prevState) => {
      if (item.remove?.type === 'question') {
        prevState.splice(index, 1)
      }

      if (item.remove?.type === 'item') {
        prevState[index].choices.splice(item.remove.itemIndex, 1)
      }

      if (item.question) prevState[index].question = item.question

      if (item.answer) prevState[index].answer = item.answer
      if (item.tempAnswer) prevState[index].tempAnswer = item.tempAnswer

      if (item.addItemChoices)
        prevState[index].choices = [...prevState[index].choices, '']

      if (item.choicesItem)
        prevState[index].choices[item.choicesItem.index] =
          item.choicesItem.value

      return [...prevState]
    })
  }

  const onSave = async () => {
    let questionError = false
    let choicesEmpty = false
    let choicesError = false
    let answerError = false
    examForm.map(({ question, choices, answer }) => {
      if (!question) questionError = true

      if (choices.length === 0) choicesEmpty = true

      if (answer.length === 0) answerError = true

      choices.map((item) => {
        if (item === '') choicesError = true
      })
    })

    if (questionError)
      return SimpleToast.show('All questions must not be empty!')

    if (choicesEmpty)
      return SimpleToast.show('Question choices must not be empty!')

    if (choicesError)
      return SimpleToast.show('Question choices must have a value!')

    if (answerError)
      return SimpleToast.show('All questions must have an answer!')

    let data
    if (!!assessmentId) {
      await FirebaseService.updateFBChildData({
        collection: 'class',
        values: { data: examForm },
        doc: classId,
        childCollection: 'assessment',
        childDoc: assessmentId,
      })
    } else {
      data = await FirebaseService.addFBDocToChildDoc({
        collection: 'class',
        docData: { data: examForm },
        parentDoc: classId,
        endCollection: 'assessment',
      })
    }

    await FirebaseService.updateFBChildData({
      collection: 'class',
      values: { assessmentId: assessmentId || data.id },
      doc: classId,
      childCollection: 'lesson',
      childDoc: lessonId,
    })

    if (!!assessmentId) {
      SimpleToast.show('Successfully edited!')
    } else {
      SimpleToast.show('Successfully created!')
    }
    goBack()
  }

  const onSubmit = () => {}

  const Footer = () => {
    return (
      <TouchableOpacity
        style={[styles.footer, { backgroundColor: theme.colors.facebook }]}
        onPress={onSave}>
        <Text style={[styles.button, { color: theme.colors.white }]}>Save</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.root}>
      <StackHeader {...headerProps} />
      <FlatList
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        data={examForm}
        keyExtractor={(item, index) => `question-${index}`}
        ListEmptyComponent={() => <EmptyList title="Create your exam now!" />}
        renderItem={({ item, index }) => (
          <QuestionCard {...item} index={index} setItem={setItem} />
        )}
        ListFooterComponent={
          examForm.length !== 0 && user.role === data.role.teacher && <Footer />
        }
      />
    </View>
  )
}

export default Assessment
