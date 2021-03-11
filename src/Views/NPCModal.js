import React, {useRef, useEffect} from 'react';
import {View} from 'react-native';
import {Modalize} from 'react-native-modalize';

export default function BeaconModal(props) {
  const modalizeRef = useRef(null);

  const handleOpen = () => {
    // if (modalizeRef.current) {
    //   modalizeRef.current.open();
    // }
    props.setModalizeRef(modalizeRef);
  };

  useEffect(() => {
    handleOpen();
  });

  return (
    <Modalize
      ref={modalizeRef}
      scrollViewProps={{
        showsVerticalScrollIndicator: false,
        stickyHeaderIndices: [0],
      }}>
      <View />
    </Modalize>
  );
}
