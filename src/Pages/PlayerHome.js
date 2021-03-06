import React from 'react';
import {View} from 'react-native';
import ScaningView from '../Views/ScaningView';

import BeaconScanner from '../utils/BeaconScanner';
const beaconScanner = new BeaconScanner();

export default class PlayerHome extends React.Component {
  constructor() {
    super();
    this.state = {
      beaconData: null,
    };

    // beaconScanner.initBeacon();
  }

  openBeacon() {
    beaconScanner.startScan(this.getBeacon);
  }

  closeBeacon() {
    beaconScanner.stopScan();
  }

  getBeacon(beacon) {
    // this.setState({
    //   beaconData: beacon,
    // });
    console.log('--------------');
    console.log(beacon);
    console.log('--------------');
  }

  render() {
    const {beaconData} = this.state;

    return (
      <View>
        <ScaningView
          beaconData={beaconData}
          openBeacon={this.openBeacon}
          closeBeacon={this.closeBeacon}
        />
      </View>
    );
  }
}
