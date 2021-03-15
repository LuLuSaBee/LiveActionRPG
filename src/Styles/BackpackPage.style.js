import {StyleSheet} from 'react-native';
import {defaultTheme} from '../data.source';

const borderRadius = 10;
export default StyleSheet.create({
  page: {
    backgroundColor: defaultTheme.backgroundColor,
    height: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
    marginTop: defaultTheme.marginTop,
  },
  box: {
    width: 'auto',
    minHeight: '10%',
    marginBottom: 10,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius,
  },
  record: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: '12%',
  },
  bookView: {
    flex: 0.2,
    padding: 5,
  },
  bookIcon: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  textView: {
    flex: 0.6,
    margin: 10,
  },
  text: {
    fontWeight: '700',
    fontSize: 20,
  },
  arrowView: {
    flex: 0.2,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  arrowIcon: {
    height: '30%',
    width: '30%',
    resizeMode: 'contain',
  },
});
