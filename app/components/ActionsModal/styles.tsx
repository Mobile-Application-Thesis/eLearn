import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    margin: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bar: {
    height: 4,
    width: 30,
    borderRadius: 2,
    marginBottom: 8,
    backgroundColor: '#e1e8ee',
  },
  content: {
    paddingVertical: 12,
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    backgroundColor: '#fff',
    width: '100%',
  },
  listContent: {
    paddingHorizontal: 24,
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
  loadingContainer: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    backgroundColor: 'rgba(0, 0, 0 ,0.1)',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
})
