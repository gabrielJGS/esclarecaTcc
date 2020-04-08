import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Feed from './pages/Feed'
import NewPost from './pages/NewPost'

const AppStack = createStackNavigator()

export default function Routes() {
    <NavigationContainer>
        <AppStack.Navigator>
            <AppStack.Screen name="Página Inicial" component={Feed}></AppStack.Screen>
            <AppStack.Screen name="Nova Postagem" component={NewPost}></AppStack.Screen>
        </AppStack.Navigator>
    </NavigationContainer>
}