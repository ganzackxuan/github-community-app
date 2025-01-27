import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'react-redux';
import React, { useEffect } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './(tabs)';
import DetailsScreen from './(tabs)/details';
import store from '../hooks/store.js';

const RootStack = createNativeStackNavigator();

function Navigation() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Home" component={HomeScreen}
      options={{ headerShown: false }}/>
      <RootStack.Screen name="Details" component={DetailsScreen} />
    </RootStack.Navigator>
  );
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
