import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './pages/Home'
import NewPost from './pages/NewPost'

const AppStack = createStackNavigator()

export default function Routes() {
    return (
        <NavigationContainer screenOptions={{ headerShown: false }}>
            <AppStack.Navigator>
                <AppStack.Screen name="Página Inicial" component={Home}></AppStack.Screen>
                <AppStack.Screen name="Nova Postagem" component={NewPost}></AppStack.Screen>
            </AppStack.Navigator>
        </NavigationContainer>
    )
}