import {StyleSheet} from 'react-native';
import {defaultTheme} from '../data.source';

const borderRadius = 10;
export default StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: defaultTheme.backgroundColor,
    height: '100%',
    paddingTop: 10,
  },
  container: {
    flex: 0.9,
    width: '100%',
    marginTop: defaultTheme.marginTop,
  },
  box: {
    minHeight: 100,
    marginBottom: 10,
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: borderRadius,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      height: 5,
      width: 0,
    },
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  imageContainer: {
    flex: 0.4,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  infoContainer: {
    flex: 0.6,
    justifyContent: 'center',
  },
  text: {
    flex: 0.4,
    fontSize: 25,
    fontWeight: '700',
  },
  description: {
    flex: 0.6,
    fontSize: 15,
  },
  backButton: {
    borderColor: 'black',
    borderWidth: 1,
    flex: 0.06,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  backText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
