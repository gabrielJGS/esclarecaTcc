import React from 'react';
import Routes from './src/routes'
import {__DEV__} from 'react-devtools'

export default function App() {
  if (__DEV__) {
    require('react-devtools');
  }
  
  return (
    <Routes></Routes>
  );
}
