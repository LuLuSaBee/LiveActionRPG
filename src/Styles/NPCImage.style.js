import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 0.45,
    height: '100%',
    width: '75%',
    backgroundColor: 'white',
    alignSelf: 'center',
    marginBottom: 20,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {
      height: 20,
      width: 0,
    },
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  view: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
});
