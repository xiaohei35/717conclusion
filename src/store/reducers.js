import {combineReducers} from 'redux'
//添加购物车
export const ADD_CART='ADD_CART';
//改变商品数量
export const UPDATE_COUNT='UPDATE_COUNT';
//改变商品选中与否
export const UPDATE_SELECTED='UPDATE_SELECTED'
//更新整个商品列表
export const UPDATE_LIST='UPDATE_LIST'
//设置全选
export const SELECTED_ALL='SELECTED_ALL'
//存储用户信息
export const USER_INFO='USER_INFO';
//存储邮寄地址列表
export const DELIVERY_LIST='DELIVERY_LIST'
//error
export const TEST_SAGA_ERROR='TEST_SAGA_ERROR'

export const GET_DELIVERY_LIST='GET_DELIVERY_LIST'
let initState={
    cart_list:[],
    user_info:null,
    goods_list:[],
    delivery_list:[]
}

function cart_list(state=initState.cart_list,action){
    switch (action.type){
        case ADD_CART:
            let flag = false;//新加的商品 购物车里还没有
            state.forEach((item,index) => {
                if(item.goods_id==action.data.goods_id){
                    ++item.count;
                    flag=true;
                }
            })
            return flag?[...state]:[...state,action.data];
            break;
        
        case UPDATE_COUNT:
            let arr=[...state];
            arr.forEach(item=>{
                if(item.goods_id==action.id){
                    item.count=action.data
                }
            });
            return arr
            break;

        case UPDATE_SELECTED:
            let brr=[...state];
            brr.forEach(item=>{
                if(item.goods_id==action.id){
                    item.selected=action.data
                }
            });
            return brr
            break;

        case UPDATE_LIST:
            return action.data;

        case SELECTED_ALL:
            let crr=[...state];
            let str=action.data;//action.data  'all'/'none'
            crr.forEach(item=>{
                item.selected= str == 'all'? 1:0
            });
            return crr
        default:return state;
    }
    return state;


}

function user_info(state=initState.user_info,action){
    switch(action.type){
        case USER_INFO:
            return action.data;
            break;
        default:
        return {

        }
    }
}

function goods_list(state=initState.goods_list,action){
    if(action.type=='GET_GOODS_LIST'){
        return action.data
    }
    return state
}

function delivery_list(state=initState.delivery_list,action){
    switch(action.type){
        case DELIVERY_LIST:
            return action.data;
            break;
        case TEST_SAGA_ERROR:
            return state;
            break;
        // case GET_DELIVERY_LIST:
        //     return state;
        //     break;
        default:
            return state;
    }
    return state
}

export default combineReducers({
    cart_list,
    user_info,
    goods_list,
    delivery_list
})