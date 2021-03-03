import React from 'react';
import {View} from 'react-native';
import BeaconScanner from '../utils/BeaconScanner';

const beaconScanner = new BeaconScanner();

export default class PlayerHome extends React.Component {
  constructor() {
    super();
    this.state = {
      beacons: [],
    };

    beaconScanner.initBeacon();
  }

  openBeacon() {
    beaconScanner.startScan(this.getBeacon);
  }

  closeBeacon() {
    beaconScanner.stopScan();
  }

  getBeacon(beacon) {
    this.setState({
      beacons: beacon,
    });
  }

  render() {
    return <View></View>;
  }
}
