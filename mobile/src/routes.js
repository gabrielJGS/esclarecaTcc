import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Alert, Image, View, AsyncStorage, KeyboardAvoidingView, Text, Platform, TextInput, TouchableOpacity, StatusBar } from "react-native";
import { Feather, FontAwesome5 } from '@expo/vector-icons'
import { Avatar } from 'react-native-elements';
import { DotsLoader } from 'react-native-indicator';
import { AuthContext } from './context'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator, DrawerItem, DrawerItemList, DrawerContentScrollView } from "@react-navigation/drawer"

import Init from './pages/Init'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NewPost from './pages/NewPost'
import HomeContent from './pages/HomeContent'
import NewContent from './pages/NewContent'
import Profile from './pages/Profile'
import PostPage from './pages/PostPage'
import ContentPage from './pages/ContentPage'
import Preferences from './pages/Preferences'

const AppStack = createStackNavigator()
const App2Stack = createStackNavigator()
const HomeStack = createStackNavigator()
const MainStack = createStackNavigator()
const Main2Stack = createStackNavigator()
const drawer = createDrawerNavigator()

const AuthStack = () => (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name="Init" component={Init}></HomeStack.Screen>
        <HomeStack.Screen name="Login" component={Login}></HomeStack.Screen>
        <HomeStack.Screen name="Register" component={Register}></HomeStack.Screen>
    </HomeStack.Navigator>
)

const PostStack = () => (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
        <MainStack.Screen name="Home" component={Home}></MainStack.Screen>
        <MainStack.Screen name="NewPost" component={NewPost}></MainStack.Screen>
        <MainStack.Screen name="PostPage" component={PostPage}></MainStack.Screen>
    </MainStack.Navigator>
)

const ContentStack = () => (
    <Main2Stack.Navigator screenOptions={{ headerShown: false }}>
        <Main2Stack.Screen name="HomeContent" component={HomeContent}></Main2Stack.Screen>
        <Main2Stack.Screen name="NewContent" component={NewContent}></Main2Stack.Screen>
        <MainStack.Screen name="ContentPage" component={ContentPage}></MainStack.Screen>
    </Main2Stack.Navigator>
)

const drawerNavigator = () => (
    <drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
        <drawer.Screen name="Home" component={PostStack}></drawer.Screen>
        <drawer.Screen name="HomeContent" component={ContentStack}></drawer.Screen>
        <drawer.Screen name="Profile" component={Profile}></drawer.Screen>
        <drawer.Screen name="Preferences" component={Preferences}></drawer.Screen>
    </drawer.Navigator>
)

//continuar aqui
function CustomDrawerContent(props) {
    const [userName, setUserName] = useState('')
    const [userTags, setUserTags] = useState('')
    //const navigation = useNavigation()

    const { singOut } = React.useContext(AuthContext);

    function logoutUser() {
        AsyncStorage.clear()
        singOut()
    }

    useEffect(() => {
        //setUserName(AsyncStorage.getItem('userName'))//Fazer esse puto entrar no estado
        //setUserTags(AsyncStorage.getItem('userTags'))//Fazer esse puto entrar no estado
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.User}>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('Profile') }}>
                            <View style={{ flexDirection: 'row', marginTop: 15, alignItems:'center' }}>
                                <Avatar
                                    rounded
                                    source={{
                                        uri:
                                            //'https://scontent.fstu3-1.fna.fbcdn.net/v/t1.0-9/p960x960/87283876_1614904885331971_5523389541076959232_o.jpg?_nc_cat=102&_nc_sid=85a577&_nc_ohc=FY3G_XQYr4YAX_jln8U&_nc_ht=scontent.fstu3-1.fna&_nc_tp=6&oh=6892c35abdfc7a8e7f4786b477890cfc&oe=5EDAE0E2',
                                            'https://anebrasil.org.br/wp-content/uploads/2016/06/img-user-geral.png',
                                    }}
                                    size={50}
                                />
                                <View style={{ marginLeft: 15, flexDirection: 'column', marginTop: 10 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{userName?userName:'Meu perfil'}</Text>
                                    <Text style={{ fontSize: 13, color: '#365478' }}>{userTags?userTags:''}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.Section}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Feather name="edit-3" size={20} color="#365478"></Feather>
                            )}
                            label="Feed de Dúvidas"
                            onPress={() => { props.navigation.navigate('Home') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Feather name="book-open" size={20} color="#365478"></Feather>
                            )}
                            label="Feed de Conteúdos"
                            onPress={() => { props.navigation.navigate('HomeContent') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Feather name="slack" size={20} color="#365478"></Feather>
                            )}
                            label="Slack"
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <FontAwesome5 name="medal" size={20} color="#365478"></FontAwesome5>
                            )}
                            label="Ranking"
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Feather name="sliders" size={20} color="#365478"></Feather>
                            )}
                            label="Preferências"
                            onPress={() => { props.navigation.navigate('Preferences') }}
                        />
                    </View>

                </View>
            </DrawerContentScrollView>
            <View style={styles.Logout}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Feather name="log-out" size={20} color="#365478"></Feather>
                    )}
                    label="Sair"
                    onPress={() =>
                        Alert.alert(
                            'Sair',
                            'Deseja Sair?',
                            [
                                { text: 'Cancelar', onPress: () => { return null } },
                                {
                                    text: 'Sair', onPress: () => {
                                        logoutUser();
                                    }
                                },
                            ],
                            { cancelable: false }
                        )}
                />
            </View>
        </View>
    );
}

export default function Routes() {
    const [isloading, setisLoading] = React.useState(true);
    const [userToken, setUserToken] = React.useState(null);

    const authContext = React.useMemo(() => {
        return {
            singIn: () => {
                setisLoading(false);
                setUserToken(AsyncStorage.getItem('user'))
            },
            singOut: () => {
                setisLoading(false);
                setUserToken(null);
            }
        }
    }, []);

    React.useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                setUserToken(AsyncStorage.getItem('user'))
            }
            else {
                setUserToken(null)
            }
        })
    }, [])

    React.useEffect(() => {
        setTimeout(() => {
            setisLoading(false);
        }, 1000);
    }, []);

    if (isloading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <DotsLoader style={{ color: '#365478' }} />
            </View>
        )
    }

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {userToken ? (
                    <AppStack.Navigator screenOptions={{ headerShown: false }}>
                        <AppStack.Screen name="Home" component={drawerNavigator}></AppStack.Screen>
                    </AppStack.Navigator>
                ) : (
                        <App2Stack.Navigator screenOptions={{ headerShown: false }}>
                            <App2Stack.Screen name="Init" component={AuthStack}></App2Stack.Screen>
                        </App2Stack.Navigator>
                    )}
                {/*<AppStack.Navigator screenOptions={{ headerShown: false }}>
                    <AppStack.Screen name="Init" component={Init}></AppStack.Screen>
                    <AppStack.Screen name="Login" component={Login}></AppStack.Screen>
                    <AppStack.Screen name="Register" component={Register}></AppStack.Screen>
                    <AppStack.Screen name="Home" component={Home}></AppStack.Screen>
                    <AppStack.Screen name="NewPost" component={NewPost}></AppStack.Screen>
                    <AppStack.Screen name="HomeContent" component={HomeContent}></AppStack.Screen>
                    <AppStack.Screen name="NewContent" component={NewContent}></AppStack.Screen>
                </AppStack.Navigator>*/}
            </NavigationContainer>
        </AuthContext.Provider>
    )
}



const styles = StyleSheet.create({
    Logout: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    drawerContent: {
        flex: 1
    },
    User: {
        paddingLeft: 20
    },
    Section: {
        marginTop: 14,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 3
    }
})