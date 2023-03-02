import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { Application } from './source/Application'
import { DbContextProvider } from './source/Context/DBContext'

const App = () => {
  return (
    <DbContextProvider>
      <Application />
    </DbContextProvider>
  )
}

export default App;
