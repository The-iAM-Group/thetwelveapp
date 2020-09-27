/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';

function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(theUser) {
    setUser(theUser);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  let content;
  if (!user) {
    content = (
      <View>
        <Text>Login</Text>
      </View>
    );
  } else {
    content = (
      <View>
        <Text>Welcome {user.email}</Text>
      </View>
    );
  }

  return <NavigationContainer>{content}</NavigationContainer>;
}

const styles = StyleSheet.create({});

export default App;
