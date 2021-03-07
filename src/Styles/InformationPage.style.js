import {StyleSheet, Dimensions} from 'react-native';

const borderRadius = 10;
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
    flex: 0.7,
  },
  roomFooter: {
    flex: 0.15,
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    backgroundColor: '#193441',
    maxHeight: 40,
  },
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  roomFunc: {
    flex: 0.15,
  },
  roomInput: {
    flex: 0.65,
    height: 40,
    borderWidth: 1,
    borderColor: 'white',
  },
  roomSubmit: {
    flex: 0.2,
  },
});
