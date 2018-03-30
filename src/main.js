import ReactDOM from 'react-dom'
import React,{Component} from 'react'
import {Provider} from 'react-redux'
import store from './store/store'

import routes from './router/index'
import {BrowserRouter,Switch,Redirect,Route} from 'react-router-dom'
//config router
import Routes from './components/routes'
//font set & common style set
import './utils/fontset'
import './static/fonts/iconfont.css'
import './static/css/reset.css'
import './static/css/common.css'
import './static/css/goodsItem.less'
import Notmatch from './views/notmatch/notmatch'

ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
    <Switch>
        <Redirect exact from='/' to='/index/home'></Redirect>
        <Routes routes={routes.routes}></Routes>
        <Route component={Notmatch}></Route>
    </Switch>
</BrowserRouter>
</Provider>,
document.querySelector('#root'))