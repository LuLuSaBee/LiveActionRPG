import React from 'react';
import {Text, View, DeviceEventEmitter} from 'react-native';
import Beacons from 'react-native-beacons-manager';

export default class BeaconTest extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    //send requset
    Beacons.requestAlwaysAuthorization();
    const region = {
      identifier: 'Estimotes',
      uuid: 'EC 09 2F 7C C3 A3 7B 2E B6 47 E5 BE 44 D7 5D D8',
    };

    try {
      Beacons.startMonitoringForRegion(region)
        .then(() => console.log('Beacons monitoring started succesfully'))
        .catch((error) =>
          console.log(`Beacons monitoring not started, error: ${error}`),
        );

      Beacons.startUpdatingLocation();

      // Monitoring: Listen for device entering the defined region
      this.regionDidEnterEvent = Beacons.BeaconsEventEmitter.addListener(
        'regionDidEnter',
        (data) => {
          console.log('monitoring - regionDidEnter data: ', data);
        },
      );

      // Monitoring: Listen for device leaving the defined region
      this.regionDidExitEvent = Beacons.BeaconsEventEmitter.addListener(
        'regionDidExit',
        ({identifier, uuid, minor, major}) => {
          console.log('monitoring - regionDidExit data: ', {
            identifier,
            uuid,
            minor,
            major,
          });
        },
      );
    } catch (error) {
      console.log('--------------');
      console.log(error);
      console.log('--------------');
    }
  }

  render() {
    return (
      <View>
        <Text>132456</Text>
      </View>
    );
  }
}
