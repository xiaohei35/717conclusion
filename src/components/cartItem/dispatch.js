import {UPDATE_COUNT,UPDATE_SELECTED} from '../../store/reducers'
export default function mapDispatchToProps(dispatch){
    return {
        updateCount(count,id){
            if(count<0) return;
            dispatch({
                type:UPDATE_COUNT,
                data:count,
                id
            })
        },
        actived(selected,id){
            dispatch({
                type:UPDATE_SELECTED,
                data:selected,
                id
            })
        }
    }
}