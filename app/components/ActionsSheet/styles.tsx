import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  content: {
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    backgroundColor: '#F7F7F7',
  },
  headerContainer: {
    padding: 16,
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e1e8ee',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    flex: 1,
    fontSize: 16,
    color: '#5e6977',
    fontWeight: '600',
    textAlign: 'center',
  },
  swipeBar: {
    marginBottom: 8,
  },
  chevronContainer: {
    flex: 0.5,
    paddingTop: 4,
    flexDirection: 'row',
  },
  rightActionContainer: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  rightActionTitle: {
    fontSize: 16,
    color: '#2089dc',
    fontWeight: '600',
  },
  actionContainer: {
    paddingVertical: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    width: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  actionContent: {
    flex: 1,
  },
  actionDescription: {
    fontSize: 14,
    marginTop: 8,
    lineHeight: 18,
    color: '#86939e',
  },
  actionActivity: {
    marginRight: 30,
  },
})
