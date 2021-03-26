import Beacons from 'react-native-beacons-manager';

const uuid = 'EC092F7C-C3A3-7B2E-B647-E5BE44D75DD8';
const identifier = '666666';
const REGION = {identifier, uuid};

export default class BeaconScanner {
  beaconsDidRangeEvent = null;
  regionDidExitEvent = null;

  constructor() {
    Beacons.requestAlwaysAuthorization();
    // update location to ba able to monitor:
    Beacons.startUpdatingLocation();
  }

  initBeacon() {
    // Range for beacons inside the region
    Beacons.startRangingBeaconsInRegion(REGION)
      .then(() => console.log('Beacons ranging started succesfully'))
      .catch((error) =>
        console.log(`Beacons ranging not started, error: ${error}`),
      );
    Beacons.startMonitoringForRegion(REGION)
      .then(() => console.log('Beacons monitoring started succesfully'))
      .catch((error) =>
        console.log(`Beacons monitoring not started, error: ${error}`),
      );
  }

  startScan(reFunc) {
    // Ranging: Listen for beacon changes
    this.beaconsDidRangeEvent = Beacons.BeaconsEventEmitter.addListener(
      'beaconsDidRange',
      (data) => {
        // console.log('beaconsDidRange data: ', data);
        reFunc(data.beacons[0]);
      },
    );
    this.regionDidExitEvent = Beacons.BeaconsEventEmitter.addListener(
      'regionDidExit',
      ({identifier, uuid, minor, major}) => {
        console.log('monitoring - regionDidExit data: ', {
          identifier,
          uuid,
          minor,
          major,
        });
        if (major === 3 && minor === 1) {
          console.log('--------------');
          console.log('離開館長室');
          console.log('--------------');
        }
      },
    );
  }

  stopScan() {
    // stop ranging beacons:
    Beacons.stopRangingBeaconsInRegion(REGION)
      .then(() => console.log('Beacons ranging stopped succesfully'))
      .catch((error) =>
        console.log(`Beacons ranging not stopped, error: ${error}`),
      );

    // remove ranging event we registered at componentDidMount
    this.beaconsDidRangeEvent.remove();
    this.regionDidExitEvent.remove();
  }
}
