import {StyleSheet, Dimensions} from 'react-native';
import {defaultTheme} from '../data.source';

const borderRadius = 10;
export default StyleSheet.create({
  page: {
    height: '100%',
    backgroundColor: defaultTheme.backgroundColor,
  },
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
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
    padding: 5,
  },
  room: {
    flex: 1,
    backgroundColor: '#91AA9D',
    height: '100%',
    width: '100%',
    borderRadius: borderRadius,
  },
  roomHeader: {
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    backgroundColor: '#193441',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 40,
    flex: 0.15,
  },
  roomTitle: {
    color: 'white',
    fontSize: 15,
  },
  roomBody: {
    flex: 0.65,
  },
  contentContainerStyle: {
    alignItems: 'baseline',
    paddingHorizontal: 5,
    paddingTop: 10,
  },
  message: {
    borderRadius: 40,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 5,
  },
  ownMessage: {
    backgroundColor: 'red',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: 'white',
  },
  roomFooter: {
    flex: 0.2,
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    backgroundColor: '#193441',
    maxHeight: 40,
  },
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  roomInput: {
    flex: 0.8,
    backgroundColor: 'white',
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  inputBox: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  roomSubmit: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  supportSuggsetion: {
    maxHeight: 33,
  },
  supportItem: {
    borderRadius: 50,
    backgroundColor: 'white',
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    height: 25,
  },
  supportText: {
    fontSize: 15,
  },
  text: {
    fontSize: 20,
  },
});
