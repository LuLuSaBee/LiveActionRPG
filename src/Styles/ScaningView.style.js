import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#efefef',
  },
  card: {
    height: 'auto',
    marginHorizontal: '10%',
    marginVertical: '10%',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  content: {
    height: '100%',
  },
  gifContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '50%',
    width: '50%',
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
