import React from 'react';
import {View, TextInput, Button} from 'react-native';

export default function ForgotPassword(props) {
  const [email, setEmail] = React.useState('');

  const {emailRecovery} = React.useContext(props.authContext);
  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <Button title="Submit" onPress={() => emailRecovery({email})} />
    </View>
  );
}
