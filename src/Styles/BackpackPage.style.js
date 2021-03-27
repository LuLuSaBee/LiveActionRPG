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
  },
  previewContainer: {
    flex: 0.4,
    justifyContent: 'center',
    marginTop: defaultTheme.marginTop,
  },
  bagContainer: {
    flex: 0.6,
    backgroundColor: 'white',
    borderRadius: borderRadius,
    margin: 10,
    padding: 5,
  },
  bagView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: defaultTheme.backgroundColor,
    borderRadius: borderRadius,
    padding: '0.75%',
  },
});
