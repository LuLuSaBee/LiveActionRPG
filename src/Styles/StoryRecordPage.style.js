import {StyleSheet} from 'react-native';
import {defaultTheme} from '../data.source';

const borderRadius = 10;
export default StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: defaultTheme.backgroundColor,
    height: '100%',
  },
  container: {
    flex: 0.9,
    width: '100%',
    marginTop: defaultTheme.marginTop,
  },
  box: {
    width: 'auto',
    minHeight: '20%',
    marginBottom: 10,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius,
    flex: 1,
    flexDirection: 'row',
  },
  imageContainer: {
    backgroundColor: 'red',
    flex: 0.3,
    height: '100%',
    borderRadius: 10,
  },
  image: {
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  infoContainer: {
    flex: 0.7,
    flexDirection: 'column',
    marginLeft: 10,
  },
  nameContainer: {
    flex: 0.2,
    backgroundColor: 'red',
  },
  linesContainer: {
    flex: 0.7,
    backgroundColor: 'gray',
  },
  timeContainer: {
    flex: 0.1,
    backgroundColor: 'red',
  },
  backButton: {
    borderColor: 'black',
    borderWidth: 1,
    flex: 0.08,
    margin: 10,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontSize: 20,
    fontWeight: '600',
  },
});