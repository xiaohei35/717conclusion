import $http from '../../utils/http';
import {getCookie} from '../../utils/utils';
import {UPDATE_LIST,SELECTED_ALL} from '../../store/reducers'
export default function mapDispatchToProps(dispatch){
    return {
        fetchGoodsList(history){
            $http.post('/user/Cart/goodsList',{
                token:getCookie('token')
            })
            .then(res=>{
                if(res.error==1){
                     history.push('/login',{
                         from:'/index/cart'
                     })
                }else{
                    for (let key in res){
                        dispatch({
                            type:UPDATE_LIST,
                            data:res[key]
                        })
                    }
                }
             })
        },
        toggleSelectAll(str){
            dispatch({
                type:SELECTED_ALL,
                data:str
            })
        },
        delCartGoods(selectedId){
            $http.post('/user/Cart/delGoods',{
                selectedId,
                token:getCookie('token')
            })
            .then(res=>{
                if(res.success==1){
                    for (let key in res.delGoods){
                        dispatch({
                            type:UPDATE_LIST,
                            data:res.delGoods[key]
                        })
                    }
                }
            })
        }
    }
}