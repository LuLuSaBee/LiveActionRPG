import Beacons from 'react-native-beacons-manager';
import SystemSetting from 'react-native-system-setting';

const UUID = 'EC092F7C-C3A3-7B2E-B647-E5BE44D75DD8';
const IDENTIFIER = '666666';

export default class BeaconScaner {
  constructor() {}

  isBluetoothEnable() {
    return SystemSetting.isBluetoothEnabled().then((enable) => {
      return enable;
    });
  }

  switchBluetooth() {
    return SystemSetting.switchBluetooth(() => {
      return true;
    });
  }

  initBeacon() {
    Beacons.requestAlwaysAuthorization();
    const region = {IDENTIFIER, UUID};

    // Range for beacons inside the region
    Beacons.startRangingBeaconsInRegion(region) // or like  < v1.0.7: .startRangingBeaconsInRegion(identifier, uuid)
      .then(() => console.log('Beacons ranging started succesfully'))
      .catch((error) =>
        console.log(`Beacons ranging not started, error: ${error}`),
      );

    // update location to ba able to monitor:
    Beacons.startUpdatingLocation();
  }

  startScan(reFunc) {}

  stopScan() {}
}
