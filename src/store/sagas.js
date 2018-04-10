//中间件 在action和reducer中间添加一些逻辑 监听action触发新的action
import {takeEvery} from 'redux-saga';
import {call,put} from 'redux-saga/effects';
import $http from '../utils/http';
import {getCookie} from '../utils/utils';
import {DELIVERY_LIST,TEST_SAGA_ERROR} from './reducers'

//generator 函数  每一个saga就是一个generator函数

//worker saga 为后期测试提供方便

 function* fetchDelivey(){
     //用call请求数据 call(function,param接收参数) param传给function 
     try{
        //yield 可执行多次
        //res 返回来的数据 如果没有数据 停止操作 异步=>同步
        let res = yield call($http.post,'/user/Mail/list',{token:getCookie('token')})
        //saga中代替dispatch来触发action的函数
        yield put({
            type:DELIVERY_LIST,
            data:res
        })
        
     }
     catch(err){
        yield put({
            type:TEST_SAGA_ERROR,
            data:err
        })
     }
 }
 
//  function* editDelivey(action){
//     try{
//        let res = yield call($http.post,'/user/Mail/deletelist',{token:getCookie('token')})
//        yield put({
//            type:EDIT_DELIVERY_INFO,
//            data:res
//        })
       
//     }
//     catch(err){
//        yield put({
//            type:TEST_SAGA_ERROR,
//            data:err
//        })
//     }
// }
//watcher sga
function* watchDelivery(){
    //takeEvery 监听每个type为GET_GOODS_LIST的action
    //可监听多个 写成数组的形式
    yield takeEvery(['GET_DELIVERY_LIST'],fetchDelivey)
}
// function* watchEditDelivery(){
//     yield takeEvery(['EDIT_DELIVERY'],editDelivey)
// }

export default function* rootSaga(){
    yield [watchDelivery()]
}