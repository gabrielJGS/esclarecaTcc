import React from 'react';
import Routes from './src/routes'

export default function App() {
  if (__DEV__) {
    require('react-devtools');
  }
  
  return (
    <Routes></Routes>
  );
}
