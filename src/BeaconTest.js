/* eslint-disable */

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text, FlatList} from 'react-native';
import Beacons from 'react-native-beacons-manager';

/**
 * uuid of YOUR BEACON (change to yours)
 * @type {String} uuid
 */
const UUID = 'EC092F7C-C3A3-7B2E-B647-E5BE44D75DD8';
const IDENTIFIER = '666666';

export default class BeaconsDemo extends Component {
  // will be set as a reference to "beaconsDidRange" event:
  beaconsDidRangeEvent = null;

  state = {
    // region information
    uuid: UUID,
    identifier: IDENTIFIER,

    // list of desired UUID to range (Note: these will be section headers in the listview rendered):
    rangedBeaconsUUIDMap: {
      [UUID.toUpperCase()]: [],
      //   [OTHER_UUID.toUpperCase()]: [],
    },
    // React Native ListViews datasources initialization
    rangingDataSource: [
      {
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      },
    ],
  };

  componentDidMount() {
    const {identifier, uuid} = this.state;

    Beacons.requestAlwaysAuthorization();

    const region = {identifier, uuid};

    // Range for beacons inside the region
    Beacons.startRangingBeaconsInRegion(region) // or like  < v1.0.7: .startRangingBeaconsInRegion(identifier, uuid)
      .then(() => console.log('Beacons ranging started succesfully'))
      .catch((error) =>
        console.log(`Beacons ranging not started, error: ${error}`),
      );

    // update location to ba able to monitor:
    Beacons.startUpdatingLocation();
    //
    // component state aware here - attach events
    //

    // Ranging: Listen for beacon changes
    this.beaconsDidRangeEvent = Beacons.BeaconsEventEmitter.addListener(
      'beaconsDidRange',
      (data) => {
        // console.log('beaconsDidRange data: ', data);
        const {beacons} = data;
        const {rangingDataSource} = this.state;
        this.setState({
          rangingDataSource: this.convertRangingArrayToMap(beacons),
        });
      },
    );
  }

  componentWillUnMount() {
    const {identifier, uuid} = this.state;

    const region = {identifier, uuid};

    // stop ranging beacons:
    Beacons.stopRangingBeaconsInRegion(region)
      .then(() => console.log('Beacons ranging stopped succesfully'))
      .catch((error) =>
        console.log(`Beacons ranging not stopped, error: ${error}`),
      );

    // remove ranging event we registered at componentDidMount
    this.beaconsDidRangeEvent.remove();
  }

  render() {
    const {rangingDataSource} = this.state;
    return (
      <View>
        <Text style={styles.btleConnectionStatus}>Bluetooth</Text>
        <Text style={styles.headline}>ranging beacons:</Text>
        <FlatList
          data={rangingDataSource[UUID]}
          renderItem={this.renderRangingRow}
        />
      </View>
    );
  }

  renderRangingSectionHeader = (sectionData, uuid) => (
    <Text style={styles.rowSection}>{uuid}</Text>
  );

  renderRangingRow = (rowData) => {
    const {item, index} = rowData;
    console.log('--------------');
    console.log(item);
    console.log('--------------');
    return (
      <View style={styles.row} keys={index}>
        <Text>UUID: {item.uuid ? item.uuid : 'NA'}</Text>
        <Text style={styles.smallText}>
          Major: {item.major ? item.major : 'NA'}
        </Text>
        <Text style={styles.smallText}>
          Minor: {item.minor ? item.minor : 'NA'}
        </Text>
        <Text>RSSI: {item.rssi ? item.rssi : 'NA'}</Text>
        <Text>Proximity: {item.proximity ? item.proximity : 'NA'}</Text>
        <Text>
          Distance: {item.accuracy ? item.accuracy.toFixed(2) : 'NA'}m
        </Text>
      </View>
    );
  };

  convertRangingArrayToMap = (rangedBeacon) => {
    const {rangedBeaconsUUIDMap} = this.state;

    rangedBeacon.forEach((beacon) => {
      if (beacon.uuid.length > 0) {
        const uuid = beacon.uuid.toUpperCase();
        const rangedBeacons = rangedBeaconsUUIDMap[uuid].filter(
          (rangedBeac) => rangedBeac === uuid,
        );

        rangedBeaconsUUIDMap[uuid] = [...rangedBeacons, beacon];
      }
    });
    this.setState({rangedBeaconsUUIDMap});
    return rangedBeaconsUUIDMap;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150,
    margin: 5,
    backgroundColor: '#F5FCFF',
    color: 'white',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btleConnectionStatus: {
    fontSize: 20,
    paddingTop: 20,
  },
  headline: {
    fontSize: 20,
    paddingTop: 20,
    marginBottom: 20,
  },
  row: {
    padding: 8,
    paddingBottom: 16,
  },
  smallText: {
    fontSize: 11,
  },
  rowSection: {
    fontWeight: '700',
  },
});
