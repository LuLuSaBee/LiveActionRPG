import {StyleSheet} from 'react-native';
import {defaultTheme} from '../data.source';

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
});
