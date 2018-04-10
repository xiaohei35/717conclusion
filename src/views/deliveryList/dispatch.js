// //import { getCookie } from "../../utils/utils";
// import {DELIVERY_LIST} from '../../store/reducers'
// //import $http from '../../utils/http'
export default function mapDispatchToProps(dispatch){
     return {
        fetdata(){
             dispatch({
                type:"GET_DELIVERY_LIST"
             })
        }
        // toEditDelivery(index){
        //     dispatch({
        //         type:'EDIT_DELIVERY',
        //         data:index
        //     })
        // }
    }  
}