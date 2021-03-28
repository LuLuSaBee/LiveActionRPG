import {StyleSheet, Dimensions} from 'react-native';

const centerVH = {justifyContent: 'center', alignItems: 'center'};

export default StyleSheet.create({
  page: {
    flex: 1,
    // backgroundColor: '#4F6D7A',
    justifyContent: 'center',
  },
  backgroundImage: {
    resizeMode: 'repeat',
  },
  inputContainer: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  image: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
  },
  inputView: {
    width: '70%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    flexDirection: 'row',
    ...centerVH,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  inputBox: {
    width: '75%',
    height: 50,
    fontSize: 25,
    paddingTop: 0,
    paddingBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#4F6D7A',
    ...centerVH,
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
});
