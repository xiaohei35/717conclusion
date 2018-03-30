import {takeEvery} from 'redux-saga';
import {call,put} from 'redux-saga/effects';
import $http from '../utils/http';
//generator 函数  每一个saga就是一个generator函数

//worker saga
 function* fetchData(){
     //用call请求数据 call(function,param接收参数) 为后期测试提供方便
     //res 返回来的数据 如果没有数据 停止操作 异步=>同步
     try{
        //yield 可执行多次
        let res = yield call($http.post,'/mall/index/getGoodsChannel',{channel_id:3})
        //saga中代替dispatch来触发action的函数
        yield put({
            type:'TEST_SAGA',
            data:res
        })
     }
     catch(err){
        yield put({
            type:'TEST_SAGA_ERROR',
            data:err
        })
     }
 }

 //watcher sga
 export default function* watchFetch(){
     //takeEvery 监听每个type为GET_GOODS_LIST的action
     //可监听多个 写成数组的形式
     yield takeEvery(['GET_GOODS_LIST'],fetchData)
 }