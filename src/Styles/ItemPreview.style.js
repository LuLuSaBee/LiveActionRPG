import {StyleSheet} from 'react-native';

const borderRadius = 10;
export default StyleSheet.create({
  box: {
    minHeight: '38%',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 0.5,
    flexDirection: 'row',
    paddingTop: 10,
  },
  imageView: {
    width: '50%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  nameView: {
    width: '50%',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 25,
    fontWeight: '900',
  },
  descriptionView: {
    flex: 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  descriptionText: {
    fontSize: 18,
  },
  btnView: {
    flex: 0.15,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: borderRadius,
    backgroundColor: '#2B5F75',
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
});
