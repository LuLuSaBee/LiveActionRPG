import {StyleSheet} from 'react-native';

const borderRadius = 10;
export default StyleSheet.create({
  itemContainer: {
    width: '23.5%',
    height: '23.5%',
    margin: '0.75%',
    backgroundColor: 'white',
    borderRadius: borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  isChosed: {
    borderColor: '#4F6D7A',
    borderWidth: 2,
  },
});
