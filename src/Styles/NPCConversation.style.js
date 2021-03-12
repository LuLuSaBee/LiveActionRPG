import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 0.42,
    padding: 10,
    paddingTop: 20,
  },
  dialogueView: {
    flex: 0.25,
    alignItems: 'center',
  },
  dialogueText: {
    fontSize: 20,
    fontWeight: '600',
  },
  optionView: {
    flex: 0.75,
    alignItems: 'center',
  },
  optionButton: {
    borderRadius: 50,
    borderWidth: 1,
    width: '90%',
    margin: 5,
    marginTop: 10,
  },
  optionText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
  },
});
