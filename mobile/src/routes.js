import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Init from './pages/Init'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NewPost from './pages/NewPost'
import HomeContent from './pages/HomeContent'

const AppStack = createStackNavigator()

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Init" component={Init}></AppStack.Screen>
                <AppStack.Screen name="Login" component={Login}></AppStack.Screen>
                <AppStack.Screen name="Register" component={Register}></AppStack.Screen>
                <AppStack.Screen name="Home" component={Home}></AppStack.Screen>
                <AppStack.Screen name="NewPost" component={NewPost}></AppStack.Screen>
                <AppStack.Screen name="HomeContent" component={HomeContent}></AppStack.Screen>
            </AppStack.Navigator>
        </NavigationContainer>
    )
}