import {createStore,applyMiddleware} from 'redux'
import reducers from './reducers'
import logger from 'redux-logger'
import sagas from './sagas'

//{createSageMiddleware} 创建中间件
//中间件：在node action reducer之间添加自己的逻辑
import createSageMiddleware from 'redux-saga'
let store =createStore(reducers,applyMiddleware(logger))

//ui=>action=>(middleware)=>reducer=>store

// let sagaMiddleware=createSageMiddleware();
// let store =createStore(reducers,applyMiddleware(logger),applyMiddleware(sagaMiddleware))

//sagaMiddleware.run(sagas)  //run 开始监听
export default store