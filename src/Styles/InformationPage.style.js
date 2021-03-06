import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  page: {
    height: '100%',
    backgroundColor: '#efefef',
  },
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    marginTop: 20,
  },
  box: {
    width: 'auto',
    minHeight: '10%',
    marginBottom: 20,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
