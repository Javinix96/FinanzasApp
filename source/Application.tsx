import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './navigator/Navigator';

export const Application = () => {
  return (
    <NavigationContainer>
      <Navigator/>
    </NavigationContainer>
  )
}
