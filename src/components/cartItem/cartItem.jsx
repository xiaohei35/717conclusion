import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapDispatchToProps from '../../components/cartItem/dispatch'
import {UPDATE_SELECTED} from '../../store/reducers'

class CartItem extends Component {
    constructor(){
        super()
    }
    render() {
        let { actived,updateCount , item} = this.props
        return (
            <li>
                <span className={'actived iconfont '+(item.selected==0?'':'icon-duihao')} onClick={()=>{actived((1-item.selected),item.goods_id)}}></span>
                <span>
                    <img src={"http://www.lb717.com" + item.obj_data} alt="" />
                </span>
                <div className="right">
                    <h3>{item.goods_name}</h3>
                    <div>
                        <div className='price-box'>
                            <p className='count'>&nbsp;X&nbsp;{item.count}</p>
                            <p className='price'>￥{item.discount_price}</p>
                        </div>
                        <div className='count-box'>
                            <span onClick={() => { updateCount(--item.count, item.goods_id) }}>-</span>
                            <span>{item.count}</span>
                            <span onClick={() => { updateCount(++item.count, item.goods_id) }}>+</span>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}
export default connect(null,mapDispatchToProps,null,{pure:false})(CartItem)