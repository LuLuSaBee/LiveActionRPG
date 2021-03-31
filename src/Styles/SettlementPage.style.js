import {StyleSheet, Dimensions} from 'react-native';
import {defaultTheme} from '../data.source';

const borderRadius = 10;
export default StyleSheet.create({
  page: {
    height: '100%',
    backgroundColor: defaultTheme.backgroundColor,
    paddingTop: 20,
    paddingBottom: 20,
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
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      height: 5,
      width: 0,
    },
  },
  progressBox: {
    flex: 0.1,
  },
  progressInfoTitle: {
    marginBottom: 10,
  },
  progressInfoText: {
    fontSize: 20,
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
  checkBox: {
    width: 'auto',
    minHeight: '45%',
    marginBottom: 10,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius,
  },
  achievementBox: {
    width: 'auto',
    minHeight: '45%',
    marginBottom: 10,
    marginHorizontal: 10,
    padding: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      height: 5,
      width: 0,
    },
  },
  achievementTitle: {
    flex: 0.1,
    justifyContent: 'center',
  },
  achievementTitleText: {
    fontSize: 20,
  },
  achievementContainer: {
    flex: 0.9,
    paddingVertical: 10,
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
  },
  achievementView: {
    minHeight: 100,
    marginBottom: 10,
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: borderRadius,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderWidth: 3,
    borderColor: defaultTheme.backgroundColor,
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
