import {StyleSheet, Dimensions} from 'react-native';

const centerVH = {justifyContent: 'center', alignItems: 'center'};

export default StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#4F6D7A',
    ...centerVH,
  },
  inputContainer: {
    width: Dimensions.get('window').width,
    ...centerVH,
  },
  inputView: {
    width: '80%',
    borderColor: 'gray',
    marginTop: 10,
    flexDirection: 'row',
    ...centerVH,
    borderRadius: 5,
    backgroundColor: '#F0F0F0',
  },
  inputBox: {
    width: '90%',
    height: 60,
    fontSize: 30,
    paddingTop: 0,
    paddingBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
});
