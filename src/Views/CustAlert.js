import React, {useState} from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function CustAlert(props) {
  const [alertData, setAlertData] = useState({show: false});

  props.custAlertRef.current.open = (data) => {
    setAlertData(data);
  };
  props.custAlertRef.current.close = () => {
    setAlertData({show: false});
  };

  return (
    <AwesomeAlert
      {...alertData}
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      onCancelPressed={() => props.custAlertRef.current.close()}
    />
  );
}
