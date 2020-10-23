/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import LoadingScreen from './flows/auth/loading';
import Login from './flows/auth/login';
import ForgotPassword from './flows/auth/forgot-password';
import Register from './flows/auth/register';
import Home from './home';

function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  const onAuthStateChanged = (theUser) => {
    setUser(theUser);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect((onAuthStateChanged) => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const Stack = createStackNavigator();

  if (initializing) {
    //return <LoadingScreen />;
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Forgot Password" component={ForgotPassword} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  let content;
  if (!user) {
    content = (
      <Stack.Navigator>
        <Stack.screen name="Login" component={Login} />
        <Stack.screen name="Forgot Password" component={ForgotPassword} />
        <Stack.screen name="Register" component={Register} />
      </Stack.Navigator>
    );
  } else {
    content = (
      <Stack.Navigator>
        <Stack.screen name="Home" component={Home} />
      </Stack.Navigator>
    );
  }

  return <NavigationContainer>{content}</NavigationContainer>;
}

//const styles = StyleSheet.create({});

export default App;
