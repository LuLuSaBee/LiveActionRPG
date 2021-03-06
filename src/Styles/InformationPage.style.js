import {StyleSheet, Dimensions} from 'react-native';

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
  progressBox: {
    flex: 0.1,
  },
  progressInfoTitle: {
    marginBottom: 10,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  progressBar: {
    width: '100%',
    flex: 0.85,
  },
  progressNumber: {
    width: '100%',
    flex: 0.15,
    marginLeft: 10,
    fontSize: Dimensions.get('window').width * 0.04,
    fontFamily: 'Euphemia UCAS',
  },
  timeLeftBox: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerNumber: {
    fontSize: Dimensions.get('window').width * 0.14,
    fontFamily: 'Euphemia UCAS',
  },
  supportRoom: {
    flex: 0.7,
  },
});
