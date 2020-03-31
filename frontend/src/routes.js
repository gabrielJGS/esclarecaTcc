import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Logon from './pages/Logon'
import Register from './pages/Register'
import Feed from './pages/Feed'
import NewPost from './pages/NewPost'

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon}></Route>
                <Route path="/register" component={Register}></Route>
                <Route path="/feed" component={Feed}></Route>
                <Route path="/newpost" component={NewPost}></Route>
            </Switch>
        </BrowserRouter>
    )
}